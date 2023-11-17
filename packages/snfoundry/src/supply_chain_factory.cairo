// •	Allow Whitelist of staff name and address
// •	Allow creation of child contracts (Each child should declare its location e.g., town, state)
// •	Allow tracking of an order to show its most current location and previous locations and time.
// •	Allow updating of a shipment location and status by child contracts.



use starknet::{ContractAddress, ClassHash};
use array::ArrayTrait;

#[derive(Copy, Drop, starknet::Store, Serde)]
enum OrderStatus{
    Processing,
    Shipped,
    Arrived,
    Enroute,
    Delivered,
    Canceled,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct FactoryAdmin {
    adminNumber: u8,
    address: ContractAddress,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct Location {
    country: felt252,
    state: felt252,
    city: felt252,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchHq {
    companyName: felt252,
    companyID: u16,
    hqAdmin: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchAdmin {
    companyID: u16,
    branchAdminID: u128,
    branchAdminAddress: ContractAddress,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchBranch {
    companyID: u16,
    branchID: u128,
    branchAdmin: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderLocation {
    oderID: u128,
    dispatcher: DispatchBranch,
    status: OrderStatus,
    previousLocation: felt252,
    currentLocation: felt252,
    NextStop: felt252,
}


#[starknet::interface]
trait IDispatchFactory<TContractState>{

    fn setFactoryAdmin(ref self: TContractState, factoryAdminAddress: ContractAddress) -> u8; // set factory admin id
    fn getFactoryAdmin(self: @TContractState, adminID: u8) -> FactoryAdmin;

    // can only be called by factory Admin
    fn setDispatchHqAdmin(ref self: TContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) -> u16; // set dispatchCompanyHqID
    fn getDispatchHqAdmin(self: @TContractState, CompanyID: u16) -> DispatchHq;

    // this can only be call by the dispatchHq admin
    fn setDispatchAdmin(ref self: TContractState, HqID: u16, adminAddress: ContractAddress) -> u128; // set AdminID
    fn getDispatchAdmin(self: @TContractState, HqID: u16, adminID: u128) -> DispatchAdmin;

    // this can only be called by dispatch admins
    fn createBranch(ref self: TContractState, HqID: u16, adminID: u128, city: felt252, state: felt252, country: felt252) -> (u128, ContractAddress);
    fn getBranch(self: @TContractState, hqID: u16, adminID: u128, branchID: u128) -> DispatchBranch;


    // this can be called by either dispatchHq or dispatchBranch Admins
    fn createTracker(ref self: TContractState, orderID: u128, hqID: u16, adminID: u16, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus);
    fn updateTracker(ref self: TContractState, orderId: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus);

    // to be called by market place contract or Dispatch
    fn trackeItem(ref self: @TContractState, orderID: u128) -> OrderLocation;

}

#[starknet::contract]
mod DispatchCompanyFactory {
    use super::{ArrayTrait, ContractAddress, IDispatchFactory, FactoryAdmin, DispatchAdmin, Location, DispatchHq, DispatchBranch, OrderLocation, OrderStatus};
    use starknet::{get_caller_address};
    #[storage]
    struct Storage {
        // factory owners and owners confirmations storage
        ownerID: u8,
        isOwner: LegacyMap<(u8, ContractAddress), bool>,
        isFactoryAdmin: LegacyMap<ContractAddress, bool>,
        owners: LegacyMap<u8, FactoryAdmin>,

        // dispatchHq admins and admins confirmation storage
        dispatchCompanyHqID: u16, // auto assigned at setDispatchHqAdmin
        isDispatchHqAdmin: LegacyMap<(u16, ContractAddress), bool>,
        dispatchHqs: LegacyMap<u16, DispatchHq>,

        // dispatchAdmin details and their admin confirmation storage
        // takes hq ID and hqAdmin address to create adminID
        dispatchAdminID: LegacyMap<(u16, ContractAddress), u128>, // auto assigned at setDispatchBranchAdmin
        // takes hq Id, adminID and new admin Address to confirm admin
        isDispatchAdmin: LegacyMap<(u16, u128, ContractAddress), bool>,
        // dispatchHq ID and dispatchAdmin ID to store admin details
        dispatchAdmins: LegacyMap<(u16, u128), DispatchAdmin>,

        // takes hqID, admin ID and admin contract address to generated a branch id at child deployment
        branchID: LegacyMap<(u16, u128, ContractAddress), u128>,
        // take hqID, branch ID and branch contract address to confirm that branch exists
        branchExist: LegacyMap<(u16, u128, ContractAddress), bool>, // also use this to check update tracker is from thesame company
        // takes hq ID, admin ID, and branch ID to store branch details
        dispatchBranch: LegacyMap<(u16, u128, u128), DispatchBranch>,

        // takes orderID and hq ID to set dispatch company responsible for Item
        isItemTracker: LegacyMap<(u128, u16), bool>, // set and confirms the company dispatching Item

        // takes Order ID to return shipping details
        trackOrder: LegacyMap<u128, OrderLocation>,

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.ownerID.write(1);
        let owner_id = self.ownerID.read();
        let owner_address = get_caller_address();
        self.isOwner.write((owner_id, owner_address), true);
        self.isFactoryAdmin.write(owner_address, true);
        let owner_details = FactoryAdmin {adminNumber: owner_id, address: owner_address};
        self.owners.write(owner_id, owner_details);   
    }

    #[external(v0)]
    impl DispatchFactoryImpl of IDispatchFactory<ContractState>{
        fn setFactoryAdmin(ref self: ContractState, factoryAdminAddress: ContractAddress) -> u8{
            let mut owner_id = self.ownerID.read();
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            
            owner_id = owner_id + 1;
            self._setFactoryAdmin(factoryAdminAddress, owner_id);
            owner_id
        }

        fn getFactoryAdmin(self: @ContractState, adminID: u8) -> FactoryAdmin{
            let admin_details = self.owners.read(adminID);
            admin_details
        } 

        fn setDispatchHqAdmin(ref self: ContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) -> u16 {
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            let mut hq_id = self.dispatchCompanyHqID.read();
            assert(hq_id != 0 && self.isDispatchHqAdmin.read((hq_id, companyRepAddress)) == false, 'Admin Exists!!');

            hq_id = hq_id + 1;
            self._setDispatchHqAdmin(hq_id, companyRepAddress, companyName, country, state, city);
            hq_id

        }

        fn getDispatchHqAdmin(self: @ContractState, CompanyID: u16) -> DispatchHq {
            let company_details = self.dispatchHqs.read(CompanyID);
            company_details
        }

        fn setDispatchAdmin(ref self: ContractState, HqID: u16, adminAddress: ContractAddress) -> u128{
            assert(self.isDispatchHqAdmin.read((HqID, get_caller_address())) == true, 'Unauthorized Personnel');
            let mut admin_id = self.dispatchAdminID.read((HqID, get_caller_address()));
            assert(admin_id != 0 && self.isDispatchAdmin.read((HqID, admin_id, adminAddress)) == false, 'Admin Exists');
            admin_id = admin_id + 1;
            self._setDispatchAdmin(HqID, admin_id, adminAddress);
            admin_id
        }

        fn getDispatchAdmin(self: @ContractState, HqID: u16, adminID: u128) -> DispatchAdmin {
            let admin_details = self.dispatchAdmins.read((HqID, adminID));
            admin_details
        }

        
    }


    #[generate_trait]
    impl Private of PrivateTrait {
        fn _setFactoryAdmin(ref self: ContractState, factoryAdminAddress: ContractAddress, adminId: u8 ) {
            self.isOwner.write((adminId, factoryAdminAddress), true);
            self.isFactoryAdmin.write(factoryAdminAddress, true);

            let owner_details = FactoryAdmin {adminNumber: adminId, address: factoryAdminAddress};
            self.owners.write(adminId, owner_details);
        }

        fn _setDispatchHqAdmin(ref self: ContractState, companyID: u16, hqAdmin: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) {
            self.isDispatchHqAdmin.write((companyID, hqAdmin), true);
            let location = Location {country, state, city};

            let hq_details = DispatchHq {companyName, companyID, hqAdmin, location};
            self.dispatchHqs.write(companyID, hq_details);
   
        }

        fn _setDispatchAdmin(ref self: ContractState, companyID: u16, branchAdminID: u128, branchAdminAddress: ContractAddress) {
            self.isDispatchAdmin.write((companyID, branchAdminID, branchAdminAddress), true);
            let admin_details = DispatchAdmin {companyID, branchAdminID, branchAdminAddress};

            self.dispatchAdmins.write((companyID, branchAdminID), admin_details);
        }
    }



}
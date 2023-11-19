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
    adminID: u128,
    branchID: u128,
    branchAddress: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderOrigin {
    companyID: u16,
    branchAddress: ContractAddress,
    branchID: u128,
    orderID: u128,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderLocation {
    orderID: u128,
    companyID: u16,
    branchID: u128,
    deliveryStatus: OrderStatus,
    previousLocation: felt252,
    currentLocation: felt252,
    nextStop: felt252,
}


#[starknet::interface]
trait IDispatchFactory<TContractState>{

    fn setFactoryAdmin(ref self: TContractState, factoryAdminAddress: ContractAddress) -> u8; // set factory admin id
    fn getFactoryAdmin(self: @TContractState, adminID: u8) -> FactoryAdmin;

    // can only be called by factory Admin
    fn setDispatchHqAdmin(ref self: TContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) -> u16; // set dispatchCompanyHqID
    fn getDispatchHqAdmin(self: @TContractState, companyID: u16) -> DispatchHq;

    // this can only be call by the dispatchHq admin
    fn setDispatchAdmin(ref self: TContractState, companyID: u16, adminAddress: ContractAddress) -> u128; // set AdminID
    fn getDispatchAdmin(self: @TContractState, companyID: u16, adminID: u128) -> DispatchAdmin;

    // this can only be called by dispatch admins
    fn createBranch(ref self: TContractState, companyID: u16, adminID: u128, city: felt252, state: felt252, country: felt252) -> (u128, ContractAddress);
    fn getBranch(self: @TContractState, companyID: u16, adminID: u128, branchID: u128) -> DispatchBranch;


    // this can be called by either dispatchHq or dispatchBranch Admins
    fn createTracker(ref self: TContractState, orderID: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) ;
    fn updateTracker(ref self: TContractState, orderId: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus);

    // to be called by market place contract or Dispatch
    fn trackeItem(self: @TContractState, orderID: u128) -> OrderLocation;

}

#[starknet::contract]
mod DispatchCompanyFactory {
    use core::result::ResultTrait;
use core::serde::Serde;
    use super::{ArrayTrait, ContractAddress, ClassHash, IDispatchFactory, FactoryAdmin, DispatchAdmin, Location, DispatchHq, DispatchBranch, OrderLocation, OrderStatus, OrderOrigin};
    use starknet::{get_caller_address, syscalls::deploy_syscall};
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

        branchHash: ClassHash,
        // takes hqID, admin ID and branch contract address to generated a branch id at child deployment
        branchID: LegacyMap<(u16, u128, ContractAddress), u128>,
        // take hqID, branch ID and branch contract address to confirm that branch exists
        branchExist: LegacyMap<(u16, u128, ContractAddress), bool>, // also use this to check update tracker is from thesame company
        // takes hq ID, admin ID, and branch ID to store branch details
        dispatchBranch: LegacyMap<(u16, u128, u128), DispatchBranch>,

        orderOriginator: LegacyMap<u128, OrderOrigin>,
        // takes orderID and hqID, branchID and branch address to set dispatch company responsible for Item
        isItemTracker: LegacyMap<(u128, u16, u128, ContractAddress), bool>, // set and confirms the company dispatching Item
        
        // takes orderID and conpanyID to confirm shipping company updating tracker is the creator.
        isDispatchCompnay: LegacyMap<(u128, u16), bool>,

        // takes Order ID to return shipping details
        trackOrderID: LegacyMap<u128, OrderLocation>,
        

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

    #[constructor]
    fn constructor(ref self: ContractState, branchClassHash: ClassHash) {
        self.ownerID.write(1);
        let owner_id = self.ownerID.read();
        let owner_address = get_caller_address();
        self.isOwner.write((owner_id, owner_address), true);
        self.isFactoryAdmin.write(owner_address, true);
        let owner_details = FactoryAdmin {adminNumber: owner_id, address: owner_address};
        self.owners.write(owner_id, owner_details);
        self.branchHash.write(branchClassHash);
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

        fn getDispatchHqAdmin(self: @ContractState, companyID: u16) -> DispatchHq {
            let company_details = self.dispatchHqs.read(companyID);
            company_details
        }

        fn setDispatchAdmin(ref self: ContractState, companyID: u16, adminAddress: ContractAddress) -> u128{
            assert(self.isDispatchHqAdmin.read((companyID, get_caller_address())) == true, 'Unauthorized Personnel');
            let mut admin_id = self.dispatchAdminID.read((companyID, get_caller_address()));
            assert(admin_id != 0 && self.isDispatchAdmin.read((companyID, admin_id, adminAddress)) == false, 'Admin Exists');
            admin_id = admin_id + 1;
            self._setDispatchAdmin(companyID, admin_id, adminAddress);
            admin_id
        }

        fn getDispatchAdmin(self: @ContractState, companyID: u16, adminID: u128) -> DispatchAdmin {
            let admin_details = self.dispatchAdmins.read((companyID, adminID));
            admin_details
        }

        fn createBranch(ref self: ContractState, companyID: u16, adminID: u128, city: felt252, state: felt252, country: felt252) -> (u128, ContractAddress) {
            assert(self.isDispatchAdmin.read((companyID, adminID, get_caller_address())) == true, 'Unauthorized Personnel');

            // constructor arguments
            let mut constructor_args = ArrayTrait::new();
            companyID.serialize(ref constructor_args);
            get_caller_address().serialize(ref constructor_args);
            adminID.serialize(ref constructor_args);
            city.serialize(ref constructor_args);
            state.serialize(ref constructor_args);
            country.serialize(ref constructor_args);

            //deploy contract
            let (deployed_contract_address, _) = deploy_syscall(self.branchHash.read(), 0, constructor_args.span(), false). expect('failed to deploy branch');

            //get previous branch id, increase by 1 to set current branch id..
            let mut branch_id = self.branchID.read((companyID, adminID, deployed_contract_address));
            branch_id = branch_id + 1;
            assert(branch_id != 0 && self.branchExist.read((companyID, branch_id, deployed_contract_address)) == false, 'Branch Exist!!');
            self.branchID.write((companyID, adminID, deployed_contract_address), branch_id);
            self.branchExist.write((companyID, branch_id, deployed_contract_address), true);

            // set branch location and branch details
            let location = Location {country, state, city};
            let branch_details = DispatchBranch {companyID, adminID, branchID: branch_id, branchAddress: deployed_contract_address, location};
            
            self.dispatchBranch.write((companyID, adminID, branch_id), branch_details);

            (branch_id, deployed_contract_address)

        }

        fn getBranch(self: @ContractState, companyID: u16, adminID: u128, branchID: u128) -> DispatchBranch {
                let branch_details = self.dispatchBranch.read((companyID, adminID, branchID));
                branch_details
        }

        fn createTracker(ref self: ContractState, orderID: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            assert(self.branchExist.read((companyID, branchID, get_caller_address())) == true, 'Unauthorized Entity');

            self._createTracker(orderID, companyID, branchID, previousLocation, currentLocation, nextStop, deliveryStatus);
            let order_originator = OrderOrigin {companyID, branchAddress: get_caller_address(), branchID, orderID};
            
            self.orderOriginator.write(orderID, order_originator);

            // self.isItemTracker.write((orderID, companyID, branchID, get_caller_address()), true);
        }

        fn updateTracker(ref self: ContractState, orderId: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            
            assert(self.isDispatchCompnay.read((orderId, companyID)) == true, 'Unauthorized Entity');
            assert(self.branchExist.read((companyID, branchID, get_caller_address())) == true, 'Unauthorized Entity');


            self._updateTracker(orderId, companyID, branchID, previousLocation, currentLocation, nextStop, deliveryStatus);
        }

        fn trackeItem(self: @ContractState, orderID: u128) -> OrderLocation {
            let order_location = self.trackOrderID.read(orderID);
            order_location
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

        fn _createTracker(ref self: ContractState, orderID: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            let item_location = OrderLocation {orderID, companyID, branchID, deliveryStatus, previousLocation, currentLocation, nextStop};
            self.trackOrderID.write(orderID, item_location);
            self.isDispatchCompnay.write((orderID, companyID), true);
            
        }

        fn _updateTracker(ref self: ContractState, orderID: u128, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            let new_item_location = OrderLocation {orderID, companyID, branchID, deliveryStatus, previousLocation, currentLocation, nextStop};
            self.trackOrderID.write(orderID, new_item_location);
        }
    }



}
// •	Allow Whitelist of staff name and address
// •	Allow creation of child contracts (Each child should declare its location e.g., town, state)
// •	Allow tracking of an order to show its most current location and previous locations and time.
// •	Allow updating of a shipment location and status by child contracts.



use starknet::{ContractAddress, ClassHash};
use array::ArrayTrait;
use super::order_status::OrderStatus;

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
    orderID: u256,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderLocation {
    orderID: u256,
    companyID: u16,
    branchID: u128,
    deliveryStatus: OrderStatus,
    previousLocation: felt252,
    currentLocation: felt252,
    nextStop: felt252,
}

// analysis structs
#[derive(Copy, Drop, starknet::Store, Serde)]
struct AdminStats {
    companyID: u16,
    totalCompanyAdmins: u128,
    OverallTotalAdmin: u128,

}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct BranchStats {
    companyID: u16,
    companyBranchTotal: u128,
    allCompanyBranches: u128,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrdersStats {
    companyID: u16,
    companyTotalShipment: u128,
    overallShipmentTotal: u128,
}

#[starknet::interface]
trait IMarketPlace<TContractState> {
    fn registerSupplyChainChild(ref self: TContractState, supplyChainChild: ContractAddress);
}



#[starknet::interface]
trait IDispatchFactory<TContractState>{

    fn setMarketPlace(ref self: TContractState, marketPlaceAddr: ContractAddress);

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
    fn createTracker(ref self: TContractState, orderID: u256, companyID: u16, branchID: u128, nextStop: felt252, deliveryStatus: OrderStatus) ;
    fn updateTracker(ref self: TContractState, orderID: u256, companyID: u16, branchID: u128, nextStop: felt252, deliveryStatus: OrderStatus);

    // to be called by market place contract or Dispatch
    fn trackeItem(self: @TContractState, orderID: u256) -> OrderLocation;

    // get total factory admins
    fn getTotalFactoryAdmin(self: @TContractState, adminID: u8) -> u8;
    // get total number of unique shipping company on platform
    fn getNumberOfRegisteredCompany(self: @TContractState) -> u16;
    // get total company admins on platform and total by company
    fn getAdminStats(self: @TContractState) -> Array::<AdminStats>;
    // get branch statistics.. can only be called by factory admin...
    fn getBranchStats(self: @TContractState, adminID: u8) -> Array::<BranchStats>;
    fn getOrderStats(self: @TContractState, adminID: u8) -> Array::<OrdersStats>;

}


#[starknet::contract]
mod DispatchCompanyFactory {
    use snfoundry::supply_chain_factory::IMarketPlaceDispatcherTrait;
use core::result::ResultTrait;
use core::serde::Serde;
    use super::{ArrayTrait, ContractAddress, ClassHash, IDispatchFactory, FactoryAdmin, DispatchAdmin, Location, DispatchHq, DispatchBranch, OrderLocation, OrderStatus, OrderOrigin, AdminStats, BranchStats, OrdersStats, IMarketPlaceDispatcher};
    use starknet::{get_caller_address, syscalls::deploy_syscall};
    #[storage]
    struct Storage {
        marketPlaceAddress: ContractAddress,
        // factory owners and owners confirmations storage
        ownerID: u8,
        isOwner: LegacyMap<(u8, ContractAddress), bool>,
        isFactoryAdmin: LegacyMap<ContractAddress, bool>,
        owners: LegacyMap<u8, FactoryAdmin>,

        // dispat company admins and admins confirmation storage
        dispatchCompanyID: u16, // auto assigned at setDispatchHqAdmin
        isDispatchHqAdmin: LegacyMap<(u16, ContractAddress), bool>,
        dispatchHqs: LegacyMap<u16, DispatchHq>,

        // dispatchAdmin details and their admin confirmation storage
        // takes CompanyID and hqAdmin address to create adminID
        dispatchAdminID: LegacyMap<(u16, ContractAddress), u128>, // auto assigned at setDispatchBranchAdmin
        // takes CompanyID, adminID and new admin Address to confirm admin
        isDispatchAdmin: LegacyMap<(u16, u128, ContractAddress), bool>,
        // CompanyID and dispatchAdmin ID to store admin details
        dispatchAdmins: LegacyMap<(u16, u128), DispatchAdmin>,
        // takes companyID as an args
        adminStatistics: LegacyMap<u16, AdminStats>,
        overAllAdminsNumber: u128,

        branchHash: ClassHash,

        addressToBranch: LegacyMap<ContractAddress, DispatchBranch>,
        // takes CompanyID, admin ID and branch contract address to generated a branch id at child deployment
        branchID: LegacyMap<(u16, u128, ContractAddress), u128>,
        // take CompanyID, branch ID and branch contract address to confirm that branch exists
        branchExist: LegacyMap<(u16, u128, ContractAddress), bool>, // also use this to check update tracker is from thesame company
        // takes CompanyID, admin ID, and branch ID to store branch details
        dispatchBranch: LegacyMap<(u16, u128, u128), DispatchBranch>,
        // takes CompanyID, 
        branchStatistics: LegacyMap<u16, BranchStats>,
        overallBranchTotal: u128,

        // takes orderID to reveal shipment origin
        orderOriginator: LegacyMap<u256, OrderOrigin>,        
        // takes orderID and conpanyID to confirm shipping company updating tracker is the creator.
        isDispatchCompnay: LegacyMap<(u256, u16), bool>,

        // takes Order ID to return shipping details
        trackOrderID: LegacyMap<u256, OrderLocation>,// remove restriction.
        
        overallShipmentTotal: u128,
        companyShipmentTotal: LegacyMap<(u16, u256), u128>,
        shipmentStats: LegacyMap<u16, OrdersStats>,

        
        

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OwnersAdded: OwnersAdded,
        CompanyRegistered: CompanyRegistered,
        BranchAdminCreated: BranchAdminCreated,
        BranchCreated: BranchCreated,
        ShipmentCreated: ShipmentCreated,
        ShipmentUpdated: ShipmentUpdated,

    }

    #[derive(Drop, starknet::Event)]
    struct OwnersAdded {
        #[key]
        by: ContractAddress,
        #[key]
        for: ContractAddress,
        #[key]
        ownerID: u8,
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyRegistered {
        #[key]
        by: ContractAddress,
        #[key]
        for: felt252,
        #[key]
        companyID: u16,
        #[key]
        companyAdminAddress: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct BranchAdminCreated {
        #[key]
        companyID: u16,
        #[key]
        adminID: u128,
        #[key]
        adminAddress: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct BranchCreated {
        #[key]
        companyID: u16,
        #[key]
        creatorID: u128,
        #[key]
        branchID: u128,
        #[key]
        branchAddress: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentCreated {
        #[key]
        companyID: u16,
        #[key]
        branchID: u128,
        #[key]
        branchAddress: ContractAddress,
        #[key]
        orderID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentUpdated {
        #[key]
        companyID: u16,
        #[key]
        branchID: u128,
        #[key]
        branchAddress: ContractAddress,
        #[key]
        orderID: u256,
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
        self.emit(OwnersAdded {by: get_caller_address(), for: get_caller_address(), ownerID: owner_id});
    }

    #[external(v0)]
    impl DispatchFactoryImpl of IDispatchFactory<ContractState>{

        // setter functions ..
        fn setMarketPlace(ref self: ContractState, marketPlaceAddr: ContractAddress) {
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel');
            self.marketPlaceAddress.write(marketPlaceAddr);
        }
        
        fn setFactoryAdmin(ref self: ContractState, factoryAdminAddress: ContractAddress) -> u8{
            let mut owner_id = self.ownerID.read();
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            
            owner_id = owner_id + 1;
            self._setFactoryAdmin(factoryAdminAddress, owner_id);
            self.ownerID.write(owner_id);
            self.emit(OwnersAdded {by: get_caller_address(), for: factoryAdminAddress, ownerID: owner_id});
            owner_id
        }

        fn setDispatchHqAdmin(ref self: ContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) -> u16 {
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            let mut hq_id = self.dispatchCompanyID.read();
            assert(hq_id != 0 && self.isDispatchHqAdmin.read((hq_id, companyRepAddress)) == false, 'Admin Exists!!');

            hq_id = hq_id + 1;
            self._setDispatchHqAdmin(hq_id, companyRepAddress, companyName, country, state, city);
            self.dispatchCompanyID.write(hq_id);

            self.emit(CompanyRegistered {by: get_caller_address(), for: companyName, companyID: hq_id, companyAdminAddress: companyRepAddress});
            hq_id

        }

        fn setDispatchAdmin(ref self: ContractState, companyID: u16, adminAddress: ContractAddress) -> u128{
            assert(self.isDispatchHqAdmin.read((companyID, get_caller_address())) == true, 'Unauthorized Personnel');
            let mut admin_id = self.dispatchAdminID.read((companyID, get_caller_address()));
            assert(admin_id != 0 && self.isDispatchAdmin.read((companyID, admin_id, adminAddress)) == false, 'Admin Exists');
            admin_id = admin_id + 1;
            self._setDispatchAdmin(companyID, admin_id, adminAddress);
            self.dispatchAdminID.write((companyID, get_caller_address()), admin_id);
            self.overAllAdminsNumber.write((self.overAllAdminsNumber.read() + 1));
            let OverallTotalAdmin = self.overAllAdminsNumber.read();
            let admin_stats = AdminStats {companyID, totalCompanyAdmins: admin_id, OverallTotalAdmin};
            self.adminStatistics.write(companyID, admin_stats);

            self.emit(BranchAdminCreated{companyID, adminID: admin_id, adminAddress});
            admin_id
        }


        fn createBranch(ref self: ContractState, companyID: u16, adminID: u128, city: felt252, state: felt252, country: felt252) -> (u128, ContractAddress) {
            assert(self.isDispatchAdmin.read((companyID, adminID, get_caller_address())) == true, 'Unauthorized Personnel');

            // constructor arguments
            let mut constructor_args = ArrayTrait::new();
            companyID.serialize(ref constructor_args);
            adminID.serialize(ref constructor_args);
            city.serialize(ref constructor_args);
            state.serialize(ref constructor_args);
            country.serialize(ref constructor_args);
            get_caller_address().serialize(ref constructor_args);

            //deploy contract
            let (deployed_contract_address, _) = deploy_syscall(self.branchHash.read(), 0, constructor_args.span(), false). expect('failed to deploy branch');

            //get previous branch id, increase by 1 to set current branch id..
            let mut branch_id = self.branchID.read((companyID, adminID, deployed_contract_address));
            branch_id = branch_id + 1;
            assert(branch_id != 0 && self.branchExist.read((companyID, branch_id, deployed_contract_address)) == false, 'Branch Exist!!');
            self.branchID.write((companyID, adminID, deployed_contract_address), branch_id);
            self.branchExist.write((companyID, branch_id, deployed_contract_address), true);
            self.overallBranchTotal.write(self.overallBranchTotal.read() + 1);

            // set branch location and branch details
            let location = Location {country, state, city};
            let branch_details = DispatchBranch {companyID, adminID, branchID: branch_id, branchAddress: deployed_contract_address, location};
            let branch_total = self.overallBranchTotal.read();
            let branch_stats = BranchStats {companyID, companyBranchTotal: branch_id, allCompanyBranches: branch_total};
            
            self.dispatchBranch.write((companyID, adminID, branch_id), branch_details);
            self.branchStatistics.write(companyID, branch_stats);

            

            IMarketPlaceDispatcher{contract_address: self.marketPlaceAddress.read()}.registerSupplyChainChild(deployed_contract_address);
            self.addressToBranch.write(deployed_contract_address, branch_details);

            self.emit(BranchCreated{companyID, creatorID: adminID, branchID: branch_id, branchAddress: deployed_contract_address});

            (branch_id, deployed_contract_address)

        }

        fn createTracker(ref self: ContractState, orderID: u256, companyID: u16, branchID: u128, nextStop: felt252, deliveryStatus: OrderStatus) {
            assert(self.branchExist.read((companyID, branchID, get_caller_address())) == true, 'Unauthorized Entity');
            let branch_location = self.addressToBranch.read(get_caller_address()).location.city;

            self._createTracker(orderID, companyID, branchID, branch_location, nextStop, deliveryStatus);
            let order_originator = OrderOrigin {companyID, branchAddress: get_caller_address(), branchID, orderID};


            
            self.orderOriginator.write(orderID, order_originator);
            self.overallShipmentTotal.write(self.overallShipmentTotal.read() + 1);
            let new_total_shipment  = self.overallShipmentTotal.read();
            let company_total_shipment = self.companyShipmentTotal.read((companyID, orderID)) + 1;
            let shipment_stats = OrdersStats {companyID, companyTotalShipment: company_total_shipment, overallShipmentTotal: new_total_shipment};

            self.emit(ShipmentCreated{companyID, branchID, branchAddress: get_caller_address(), orderID});

        }

        fn updateTracker(ref self: ContractState, orderID: u256, companyID: u16, branchID: u128, nextStop: felt252, deliveryStatus: OrderStatus) {
            
            assert(self.isDispatchCompnay.read((orderID, companyID)) == true, 'Unauthorized Entity');
            assert(self.branchExist.read((companyID, branchID, get_caller_address())) == true, 'Unauthorized Entity');
            let current_location = self.addressToBranch.read(get_caller_address()).location.city;




            self._updateTracker(orderID, companyID, branchID, current_location, nextStop, deliveryStatus);

            self.emit(ShipmentUpdated{companyID, branchID, branchAddress: get_caller_address(), orderID});
        }

        // getter functions .....
        fn getFactoryAdmin(self: @ContractState, adminID: u8) -> FactoryAdmin{
            let admin_details = self.owners.read(adminID);
            admin_details
        } 


        fn getDispatchHqAdmin(self: @ContractState, companyID: u16) -> DispatchHq {
            let company_details = self.dispatchHqs.read(companyID);
            company_details
        }


        fn getDispatchAdmin(self: @ContractState, companyID: u16, adminID: u128) -> DispatchAdmin {
            let admin_details = self.dispatchAdmins.read((companyID, adminID));
            admin_details
        }

        fn getBranch(self: @ContractState, companyID: u16, adminID: u128, branchID: u128) -> DispatchBranch {
                let branch_details = self.dispatchBranch.read((companyID, adminID, branchID));
                branch_details
        }


        fn trackeItem(self: @ContractState, orderID: u256) -> OrderLocation {
            let order_location = self.trackOrderID.read(orderID);
            order_location
        }

        fn getTotalFactoryAdmin(self: @ContractState, adminID: u8) -> u8{
            self.ownerID.read()
        }

        fn getNumberOfRegisteredCompany(self: @ContractState) -> u16 {
            self.dispatchCompanyID.read()
        }

        fn getAdminStats(self: @ContractState) -> Array::<AdminStats> {
            let number_of_companies = self.dispatchCompanyID.read();
            let mut all_admin_stats = ArrayTrait::new();
            let mut i: u16 = 1;
            loop {
                if i <= number_of_companies {
                    all_admin_stats.append(self.adminStatistics.read(i))
                } else {
                    break;
                }
                i = i + 1;
                
            };
            return all_admin_stats;
        }

        fn getBranchStats(self: @ContractState, adminID: u8) -> Array::<BranchStats> {
            assert(self.isOwner.read((adminID, get_caller_address())) == true, 'Unauthorized Entity!!');
            let total_companies = self.dispatchCompanyID.read();
            let mut all_branch_status = ArrayTrait::new();
            let mut i: u16 = 1;
            loop {
                if i <= total_companies {
                    all_branch_status.append(self.branchStatistics.read(i))
                } else{
                    break;
                }
                i = i + 1;
            };
            
            return all_branch_status;

        }

        fn getOrderStats(self: @ContractState, adminID: u8) -> Array::<OrdersStats> {
            assert(self.isOwner.read((adminID, get_caller_address())) == true, 'Unauthorized Entity!!');
            let total_companies = self.dispatchCompanyID.read();
            let mut all_shipment_stats = ArrayTrait::new();
            let mut i: u16 = 1;
            loop {
                if i <= total_companies {
                    all_shipment_stats.append(self.shipmentStats.read(i))
                } else {
                    break;
                }
                i = i + 1;
            };

            return all_shipment_stats;
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

        fn _createTracker(ref self: ContractState, orderID: u256, companyID: u16, branchID: u128, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            let item_location = OrderLocation {orderID, companyID, branchID, deliveryStatus, previousLocation: 'market Place', currentLocation, nextStop};
            self.trackOrderID.write(orderID, item_location);
            self.isDispatchCompnay.write((orderID, companyID), true);

        }

        fn _updateTracker(ref self: ContractState, orderID: u256, companyID: u16, branchID: u128, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            // let new_item_location = OrderLocation {orderID, companyID, branchID, deliveryStatus, previousLocation, currentLocation, nextStop};
            let mut new_item_location = self.trackOrderID.read(orderID);
            new_item_location.previousLocation = new_item_location.currentLocation;
            new_item_location.currentLocation = currentLocation;
            new_item_location.nextStop = nextStop;
            new_item_location.deliveryStatus = deliveryStatus;
            self.trackOrderID.write(orderID, new_item_location);
        }
    }



}
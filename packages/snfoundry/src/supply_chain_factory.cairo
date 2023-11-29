// •	Allow Whitelist of staff name and address
// •	Allow creation of child contracts (Each child should declare its location e.g., town, state)
// •	Allow tracking of an order to show its most current location and previous locations and time.
// •	Allow updating of a shipment location and status by child contracts.



use starknet::{ContractAddress, ClassHash};
use array::ArrayTrait;
use super::order_status::OrderStatus;

#[derive(Copy, Drop, starknet::Store, Serde)]
struct FactoryAdmin {
    address: ContractAddress,
}


#[derive(Copy, Drop, starknet::Store, Serde)]
struct Location {
    country: felt252,
    state: felt252,
    city: felt252,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct ItemStatus {
    OrderID: u256,
    status: OrderStatus,
}


#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchHq {
    companyName: felt252,
    hqAdmin: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchAdmin {
    branchAdminID: u128,
    branchAdminAddress: ContractAddress,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct DispatchBranch {
    branchAddress: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderOrigin {
    branchAddress: ContractAddress,
    orderID: u256,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderLocation {
    orderID: u256,
    deliveryStatus: OrderStatus,
    previousLocation: felt252,
    currentLocation: felt252,
    nextStop: felt252,
}

// analysis structs
#[derive(Copy, Drop, starknet::Store, Serde)]
struct AdminStats {
    totalCompanyAdmins: u128,
    OverallTotalAdmin: u128,

}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct BranchStats {
    companyBranchTotal: u128,
    allCompanyBranches: u128,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrdersStats {
    companyTotalShipment: u256,
    overallShipmentTotal: u256,
}

#[starknet::interface]
trait IMarketPlace<TContractState> {
    fn registerSupplyChainChild(ref self: TContractState, supplyChainChild: ContractAddress);
}



#[starknet::interface]
trait IDispatchFactory<TContractState>{

    fn setMarketPlace(ref self: TContractState, marketPlaceAddr: ContractAddress);
    fn getMarketPlace(self : @TContractState) -> ContractAddress;

    fn setFactoryAdmin(ref self: TContractState, factoryAdminAddress: ContractAddress); // set factory admin id
    fn getFactoryAdmin(self: @TContractState, admin_address: ContractAddress) -> FactoryAdmin;

    // can only be called by factory Admin
    fn setDispatchHqAdmin(ref self: TContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252);
    fn getDispatchHqAdmin(self: @TContractState) -> DispatchHq;

    // this can only be call by the dispatchHq admin
    fn setDispatchAdmin(ref self: TContractState, adminAddress: ContractAddress); 
    fn confirmDispatchAdmin(self: @TContractState, address: ContractAddress) -> bool;

    // this can only be called by dispatch admins
    fn createBranch(ref self: TContractState, city: felt252, state: felt252, country: felt252) -> ContractAddress;
    fn getBranch(self: @TContractState, address: ContractAddress) -> DispatchBranch;


    // this can be called by either dispatchHq or dispatchBranch Admins
    fn createTracker(ref self: TContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus) ;
    fn updateTracker(ref self: TContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus);

    // to be called by market place contract or Dispatch
    fn trackeItem(self: @TContractState, orderID: u256) -> OrderLocation;
    fn trackAllItems(self: @TContractState) -> Array::<ItemStatus>;

    // get total factory admins
    fn getTotalFactoryAdmin(self: @TContractState, adminID: u8) -> u8;
    // get total company admins on platform and total by company
    fn getAdminStats(self: @TContractState) -> u128;
    // get branch statistics.. can only be called by factory admin...
    fn getBranchStats(self: @TContractState) -> u128;
    fn getOrderStats(self: @TContractState, adminID: u8) -> u256;


    fn setStaffBranch(ref self: TContractState, staffAddress: ContractAddress) -> bool;
    fn getStaffBranch(self: @TContractState, staffAddress: ContractAddress ) -> ContractAddress;
}


#[starknet::contract]
mod DispatchCompanyFactory {
    use snfoundry::supply_chain_factory::IMarketPlaceDispatcherTrait;
use core::result::ResultTrait;
use core::option::OptionTrait;
use core::serde::Serde;
    use super::{ArrayTrait, ContractAddress, ClassHash, IDispatchFactory, FactoryAdmin, DispatchAdmin, Location, DispatchHq, DispatchBranch, OrderLocation, OrderStatus, OrderOrigin, AdminStats, BranchStats, OrdersStats, IMarketPlaceDispatcher, ItemStatus};
    use starknet::{get_caller_address, get_contract_address, syscalls::deploy_syscall};
    use debug::PrintTrait;
    #[storage]
    struct Storage {
        // return Ids
        returnOwnerIds: LegacyMap<ContractAddress, u8>,

        supplyChainLimit: u8,

        marketPlaceAddress: ContractAddress,
        ownerID: u8,
        isOwner: LegacyMap<ContractAddress, bool>,
        isFactoryAdmin: LegacyMap<ContractAddress, bool>,
        owners: LegacyMap<ContractAddress, FactoryAdmin>,

        // dispat company admins and admins confirmation storage
        isDispatchHqAdmin: LegacyMap< ContractAddress, bool>,
        dispatchHqs: DispatchHq,

        isDispatchAdmin: LegacyMap<ContractAddress, bool>,
        confirmHqAdmin: LegacyMap<ContractAddress, bool>,
        // dispatchAdmin ID to store admin details
        dispatchAdmins: LegacyMap<u128, DispatchAdmin>,
        confirmBranchAdmin: LegacyMap<ContractAddress, bool>,
        // takes companyID as an args
        adminStatistics: LegacyMap<u16, AdminStats>,
        overAllAdminsNumber: u128,

        branchHash: ClassHash,
        overallBranchTotal: u128,
        branchExist: LegacyMap<ContractAddress, bool>, 
        isBranch: LegacyMap<ContractAddress, bool>,
        addressToBranch: LegacyMap<ContractAddress, DispatchBranch>,

        
        overallShipmentTotal: u256,
        orderOriginator: LegacyMap<u256, OrderOrigin>,        
        trackOrderID: LegacyMap<u256, OrderLocation>,// remove restriction.
        
        trackOrderIdNumber: LegacyMap<u256, u256>,
        
        stafftobranch: LegacyMap<ContractAddress, ContractAddress>,

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
    }

    #[derive(Drop, starknet::Event)]
    struct CompanyRegistered {
        #[key]
        by: ContractAddress,
        #[key]
        for: felt252,
        #[key]
        companyAdminAddress: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct BranchAdminCreated {
        #[key]
        by: ContractAddress,
        #[key]
        for: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct BranchCreated {
        #[key]
        by: ContractAddress,
        #[key]
        for: ContractAddress,
        #[key]
        city: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentCreated {
        #[key]
        orderID: u256,  
        #[key]
        by: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentUpdated {
        #[key]
        orderID: u256,  
        #[key]
        by: ContractAddress,
    }


    

    #[constructor]
    fn constructor(ref self: ContractState, branchClassHash: ClassHash, owner_address: ContractAddress) {
     
        self.isOwner.write(owner_address, true);
        self.isFactoryAdmin.write(owner_address, true);
        let owner_details = FactoryAdmin { address: owner_address};
        self.owners.write(owner_address, owner_details);
        self.branchHash.write(branchClassHash);
        self.emit(OwnersAdded {by: get_caller_address(), for: get_caller_address()});
    }

    #[external(v0)]
    impl DispatchFactoryImpl of IDispatchFactory<ContractState>{

        // setter functions ..
        fn setMarketPlace(ref self: ContractState, marketPlaceAddr: ContractAddress) {
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel');
            self.marketPlaceAddress.write(marketPlaceAddr);

        }
        fn getMarketPlace(self : @ContractState) -> ContractAddress {
            self.marketPlaceAddress.read()
        }
        fn setFactoryAdmin(ref self: ContractState, factoryAdminAddress: ContractAddress) {
        
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            
            self._setFactoryAdmin(factoryAdminAddress);
            self.emit(OwnersAdded {by: get_caller_address(), for: factoryAdminAddress});
           
        }

        fn setDispatchHqAdmin(ref self: ContractState, companyRepAddress: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) {
            assert(self.supplyChainLimit.read() == 0, 'Limit Reached');
            assert(self.isFactoryAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel!!');
            assert(self.isDispatchHqAdmin.read(companyRepAddress) == false, 'Admin Exists!!');

            self._setDispatchHqAdmin(companyRepAddress, companyName, country, state, city);

            self.confirmHqAdmin.write(companyRepAddress, true);
            self.supplyChainLimit.write(self.supplyChainLimit.read() + 1);
            self.emit(CompanyRegistered {by: get_caller_address(), for: companyName,companyAdminAddress: companyRepAddress});

        }

        fn setDispatchAdmin(ref self: ContractState, adminAddress: ContractAddress){
            assert(self.confirmHqAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel');
            assert(self.isDispatchAdmin.read(adminAddress) == false, 'Admin Exist');
            
        
            
            self.overAllAdminsNumber.write((self.overAllAdminsNumber.read() + 1));


            self.confirmBranchAdmin.write(adminAddress, true);
            self.isDispatchAdmin.write(adminAddress, true);
            self.emit(BranchAdminCreated{by: get_caller_address(), for: adminAddress});
        }


        fn createBranch(ref self: ContractState, city: felt252, state: felt252, country: felt252) -> ContractAddress {
            assert(self.isDispatchAdmin.read(get_caller_address()) == true, 'Unauthorized Personnel');

            // constructor arguments   
            let mut constructor_args = array![city.into(), state.into(), country.into(), get_caller_address().into(), get_contract_address().into()];
            let classHash = self.branchHash.read();
            let contract_address_salt : felt252 = 1234;
            let deploy_from_zero = false;          
            //deploy contract
            let (deployed_contract_address, _) = deploy_syscall(classHash, contract_address_salt, constructor_args.span(), deploy_from_zero). expect('failed to deploy branch');


            self.branchExist.write(deployed_contract_address, true);
            self.overallBranchTotal.write(self.overallBranchTotal.read() + 1);
            self.isBranch.write(deployed_contract_address, true);

            // set branch location and branch details
            let location = Location {country, state, city};
            let branch_details = DispatchBranch { branchAddress: deployed_contract_address, location};
            self.addressToBranch.write(deployed_contract_address, branch_details);

            let market_address = self.marketPlaceAddress.read();

            let market_dispatch =  IMarketPlaceDispatcher{contract_address: market_address};
            market_dispatch.registerSupplyChainChild(deployed_contract_address);
            

            self.emit(BranchCreated{by: get_caller_address(), for: deployed_contract_address, city});

            deployed_contract_address

        }

        fn createTracker(ref self: ContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus) {
            assert(self.isBranch.read(get_caller_address()) == true, 'Unauthorized Personnel');
            let branch_location = self.addressToBranch.read(get_caller_address()).location.city;

            self._createTracker(orderID, branch_location, nextStop, deliveryStatus);
            let order_originator = OrderOrigin { branchAddress: get_caller_address(), orderID};


            self.orderOriginator.write(orderID, order_originator);
            self.overallShipmentTotal.write(self.overallShipmentTotal.read() + 1);
            let number_tracker = self.overallShipmentTotal.read();
            self.trackOrderIdNumber.write(number_tracker, orderID);
    
            self.emit(ShipmentCreated{orderID, by: get_caller_address()});

        }

        fn updateTracker(ref self: ContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus) {
            assert(self.isBranch.read(get_caller_address()) == true, 'Unauthorized Personnel');
            let current_location = self.addressToBranch.read(get_caller_address()).location.city;


            self._updateTracker(orderID, current_location, nextStop, deliveryStatus);

            self.emit(ShipmentUpdated{orderID, by: get_caller_address()});
        }

        // getter functions .....
        fn getFactoryAdmin(self: @ContractState, admin_address: ContractAddress) -> FactoryAdmin{
            let admin_details = self.owners.read(admin_address);
            admin_details
        } 


        fn getDispatchHqAdmin(self: @ContractState) -> DispatchHq {
            let company_details = self.dispatchHqs.read();
            company_details
        }


        fn confirmDispatchAdmin(self: @ContractState, address: ContractAddress) -> bool {
            self.isDispatchAdmin.read(address)
        }

        fn getBranch(self: @ContractState, address: ContractAddress) -> DispatchBranch {
                let branch_details = self.addressToBranch.read(address);
                branch_details
        }


        fn trackeItem(self: @ContractState, orderID: u256) -> OrderLocation {
            let order_location = self.trackOrderID.read(orderID);
            order_location
        }

        fn trackAllItems(self: @ContractState) -> Array::<ItemStatus> {
            let all_orders = self.overallShipmentTotal.read();
            let mut i: u256 = 1;
            let mut all_status = ArrayTrait::new();
            

            loop {
                if i <= all_orders {
                    let orderId = self.trackOrderIdNumber.read(i);
                    let order_location = self.trackOrderID.read(orderId);
                    let status = order_location.deliveryStatus;
                    let item_status = ItemStatus {OrderID: orderId, status: status};
                    all_status.append(item_status);

                } else {
                    break;
                }
                i = i +1;
            };
            return all_status;
        }

        fn getTotalFactoryAdmin(self: @ContractState, adminID: u8) -> u8{
            self.ownerID.read()
        }


        fn getAdminStats(self: @ContractState) -> u128 {
            self.overAllAdminsNumber.read()
        }

        fn getBranchStats(self: @ContractState) -> u128{
            self.overallBranchTotal.read()

        }

        fn getOrderStats(self: @ContractState, adminID: u8) -> u256 {
            self.overallShipmentTotal.read()
        }

        fn setStaffBranch(ref self: ContractState, staffAddress: ContractAddress) -> bool {
            assert(self.isBranch.read(get_caller_address()) == true, 'Unauthorized Personnel');
            self.stafftobranch.write(staffAddress, get_caller_address());
            true
        }
        fn getStaffBranch(self: @ContractState, staffAddress: ContractAddress ) -> ContractAddress {
            self.stafftobranch.read(staffAddress)
        }
    }


    #[generate_trait]
    impl Private of PrivateTrait {
        fn _setFactoryAdmin(ref self: ContractState, factoryAdminAddress: ContractAddress ) {
            self.isOwner.write(factoryAdminAddress, true);
            self.isFactoryAdmin.write(factoryAdminAddress, true);

            let owner_details = FactoryAdmin { address: factoryAdminAddress};
            self.owners.write(factoryAdminAddress, owner_details);
        }

        fn _setDispatchHqAdmin(ref self: ContractState, hqAdmin: ContractAddress, companyName: felt252, country: felt252, state: felt252, city: felt252) {
            self.isDispatchHqAdmin.write(hqAdmin, true);
            let location = Location {country, state, city};

            let hq_details = DispatchHq {companyName, hqAdmin, location};
            self.dispatchHqs.write(hq_details);

   
        }

        fn _createTracker(ref self: ContractState, orderID: u256, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            let item_location = OrderLocation {orderID, deliveryStatus, previousLocation: 'market Place', currentLocation, nextStop};
            self.trackOrderID.write(orderID, item_location);

        }

        fn _updateTracker(ref self: ContractState, orderID: u256, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus) {
            let mut new_item_location = self.trackOrderID.read(orderID);
            new_item_location.previousLocation = new_item_location.currentLocation;
            new_item_location.currentLocation = currentLocation;
            new_item_location.nextStop = nextStop;
            new_item_location.deliveryStatus = deliveryStatus;
            self.trackOrderID.write(orderID, new_item_location);
        }
    }

}
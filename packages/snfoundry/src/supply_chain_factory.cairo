// •	Allow Whitelist of staff name and address
// •	Allow creation of child contracts (Each child should declare its location e.g., town, state)
// •	Allow tracking of an order to show its most current location and previous locations and time.
// •	Allow updating of a shipment location and status by child contracts.



use starknet::{ContractAddress, ClassHash};
use array::ArrayTrait;

#[derive(Copy, Drop, starknet::Store, Serde)]
enum OrderStatus{
    Processing,
    Dispatch_Center,
    Shipped,
    Arrived,
    Enroute,
    Delivered, 
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct FactoryAdmin {
    adminNumber: u16,
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
    companyName: felt252,
    companyID: u16,
    branchID: u128,
    branchAdmin: ContractAddress,
    location: Location,
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct OrderLocation {
    oderID: u128,
    status: OrderStatus,
    previousLocation: felt252,
    currentLocation: felt252,
    NextLocation: felt252,
}


#[starknet::interface]
trait IDispatchFactory<TContractState>{
    // can only be called by factory Admin
    fn setDispatchHqAdmin(ref self: TContractState, CompanyRepaddress: ContractAddress, companyNAme: felt252, country: felt252, state: felt252, city: felt252); // set dispatchCompanyHqID
    fn getDispatchHqAdmin(self: TContractState, dispatchCompanyHqID: u16, CompanyRepaddress: ContractAddress) -> DispatchHq;

    // this can only be call by the dispatchHq admin
    fn setDispatchAdmin(ref self: TContractState, dispatchCompanyHqID: u16, adminAddress: ContractAddress); // set AdminID
    fn getDispatchAdmin(ref self: TContractState, dispatchCompanyHqID: u16, AdminID: u128, address: ContractAddress) -> DispatchAdmin;

    // this can be called by either dispatchHq or dispatchBranch Admins
    fn createTracker(ref self: TContractState, orderID: u128);
    fn updateTracker(ref self: TContractState, orderId: u128);

    fn trackeItem(ref self: TContractState, orderID: u128) -> OrderLocation;

}

#[starknet::contract]
mod SupplyChainFactory {
    use super::{ArrayTrait, ContractAddress, IDispatchFactory, FactoryAdmin, DispatchAdmin, Location, DispatchHq, DispatchBranch, OrderLocation, OrderStatus};
    use starknet::{get_caller_address};
    #[storage]
    struct Storage {
        // factory owners and owners confirmations storage
        isOwner: LegacyMap<(u16, ContractAddress), bool>,
        owners: LegacyMap<u16, ContractAddress>,

        // dispatchHq admins and admins confirmation storage
        dispatchCompanyHqID: u128, // auto assigned at setDispatchHqAdmin
        isDispatchHqAdmin: LegacyMap<(u128, ContractAddress), bool>,
        dispatchHqs: LegacyMap<u16, DispatchHq>,

        // dispatchAdmin details and their admin confirmation storage
        // takes dispatchCompanyID and hqAdmin address to create adminID
        dispatchAdminID: LegacyMap<(u128, ContractAddress), u128>, // auto assigned at setDispatchBranchAdmin
        isDispatchAdmin: LegacyMap<(u128, u128, ContractAddress), bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

}
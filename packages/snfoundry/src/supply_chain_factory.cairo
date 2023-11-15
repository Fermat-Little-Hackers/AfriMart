use starknet::{ContractAddress, ClassHash};
use supply_chain::supply_chain::SupplyChain::targetOption;
use array::ArrayTrait;


#[derive(Copy, Drop, starknet::store, Serde)]
enum PurchaseStatus{
    Awaiting_Pickup,
    Dispatch_Center,
    Shipped,
    Arrived,
    Enroute,
    Delivered, 
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct SupplychainAdmin {
    name: felt252,
    address: ContractAddress,
    city: felt252,
    state: felt252
}

#[derive(Copy, Drop, starknet::Store, Serde)]
struct ProductTracker {
    product_name: felt252,
    itemID: u256,
    orderId: u256,
    status: PurchaseStatus,
    previous_location: felt252,
    current_location: felt252,
}





#[starknet::interface]
trait ISupplyChainFactory<TContractState>{
    fn create_supplychain(ref self: TContractState) -> ContractAddress;
    fn initiate_product_tracking(ref self: TContractState, orderId: u128);
    fn update_product_tracking(ref self: TContractState, orderId: u128);
}

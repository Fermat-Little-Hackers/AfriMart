// Alow whitelisting of staffs name and address
// Allow creation of a shipment and uploading of picture of goods along with its tracking code
// update shipment status to show that a particular good is now in their custody
// update shipment status to show that a buyer has received his delivery
// For each shipment creation and update make a call to the factory to help with efficient tracking.

#[starknet::interface]
trait ISupplyChain<TContractState> {
    fn isWhitelisted(self: @TContractState, name: felt252, address: felt252);
	fn createShipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);
	fn updateShipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);  
}

#[starknet::contract]
mod SupplyChain {
    #[storage]
    struct Storage {
		isWhitelisted: LegacyMap<bytes, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

}
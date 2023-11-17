// Alow whitelisting of staffs name and address
// Allow creation of a shipment and uploading of picture of goods along with its tracking code
// update shipment status to show that a particular good is now in their custody
// update shipment status to show that a buyer has received his delivery
// For each shipment creation and update make a call to the factory to help with efficient tracking.

// The deployer of the contract + Factory Contract Address
//  Product Details + Order Information
// Dispatch Contract 

#[starknet::interface]
trait ISupplyChain<TContractState> {
    fn isWhitelisted(self: @TContractState, address: felt252) -> bool;
	fn createShipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);
	fn updateShipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);  
}

#[starknet::contract]
mod SupplyChain {
	use super::ISupplyChain;
	use starknet::{ContractAddress, getCallerAddress};
	use starknet::getCallerAddress;

    #[storage]
    struct Storage {
		name: felt252,
		company_id: u256,
		city: felt252,
		state: felt252,
		country: felt252,
		factory_address: ContractAddress,
		isWhitelisted: LegacyMap<ContractAddress, bool>,
		shiplog: Vec<ShipmentDetails>
    }

	enum ShipmentStatus {
		Ordered,
		Custody,
		Delivered
	}

	struct ShipmentDetails {
		name: felt252,
		address: felt252,
		status: ShipmentStatus,
	}

	// impl ShipmentDetails {
	// 	fn new(name: felt252, address: felt252, status: ShipmentStatus) -> ShipmentDetails {
	// 		name, 
	// 		address, 
	// 		status
	// 	};
	// }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }


	#[constructor]
	fn constructor(
		ref self: ContractState,
		dispatch_name: felt252,
		dispatch_id: u256,
		city: felt252,
		state: felt252,
		country: felt252,
	){
		self.name.write(dispatch_name);
		self.company_id.write(dispatch_id);
		self.city.write(city);
		self.state.write(state);
		self.country.write(country);
		self.factory_address.write();
	}

	#[external(v0)]
	impl ISupplyChainImpl of ISupplyChain<ContractState>{
		fn isWhitelisted(ref self: ContractState, address: ContractAddress ) -> bool {
			self.isWhitelisted.read(address)
		}

		fn createShipment(ref self: ContractState, _name: felt252, picture: felt252, address: felt252, trackingMode: felt252){
			assert(isWhitelisted());
			let newShipment = ShipmentDetails {
				name: _name,
				address,
				status: ShipmentStatus::Ordered,
			};
			self.shiplog.push(newShipment);
		}

		fn updateShipment(ref self: ContractState, _id: u256, status: ShipmentDetails) {
			assert(isWhitelisted());
			
		}
	}

}
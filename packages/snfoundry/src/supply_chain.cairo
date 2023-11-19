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
	fn whitelist_account(self: @TContractState, address: ContractAddress);
    fn is_whitelisted(self: @TContractState, address: ContractAddress) -> bool;
	fn create_shipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);
	fn update_shipment(ref self: TContractState, picture: felt252, address: felt252, trackingMode: felt252);  
}

#[starknet::contract]
mod SupplyChain {
	use super::ISupplyChain;
	use starknet::{ContractAddress, get_caller_address, get_contract_address};
	use starknet::getCallerAddress;

    #[storage]
    struct Storage {
		name: felt252,
		company_id: u16,
		admin_id: u128,
		city: felt252,
		state: felt252,
		country: felt252,
		factory_address: ContractAddress,
		isWhitelisted: LegacyMap<ContractAddress, bool>,
		shiplog: Vec<ShipmentDetails>,
		order_log: LegacyMap<u128, ShipmentDetails>
    }

	enum ShipmentStatus {
		Ordered,
		Custody,
		Delivered
	}

	struct ShipmentDetails {
		order_id: u256,
		name: felt252,
		address: felt252,
		status: ShipmentStatus,
		created_by: ContractAddress,
		products: Vec<Product>
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
		AccountWhitelisted: AccountWhitelisted,
		ShipmentCreated: ShipmentCreated,
		ShipmentInCustody: ShipmentInCustody,
		ShipmentDelivered: ShipmentDelivered,
    }

	#[derive(Drop, starknet::Event)]
    struct AccountWhitelisted {
        #[key]
        account: ContractAddress,
    }

	#[derive(Drop, starknet::Event)]
	struct ShipmentCreated {
		#[key]
		shipment_details: ShipmentDetails,
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
		fn whitelist_account(ref self: ContractState, address: ContractAddress) {
			assert(self.factory_address.read() == get_caller_address());
			self.is_whitelisted.write(address, true);
			self.emit(AccountWhitelisted { account: address });
		}

		fn is_whitelisted(ref self: ContractState, address: ContractAddress ) -> bool {
			self.isWhitelisted.read(address)
		}

		fn is_admin(ref self: ContractState, address: ContractAddress) -> bool {
			self.is_admin.read() == get_caller_address()
		}

		fn create_shipment(ref self: ContractState, _name: felt252, picture: felt252, address: felt252, trackingMode: felt252){
			assert(self.factory_address.read() == get_caller_address());
			assert(isWhitelisted(get_caller_address()));
			let newShipment = ShipmentDetails {
				name: _name,
				address,
				status: ShipmentStatus::Ordered,
			};
			self.shiplog.push(newShipment);
			self.emit(ShipmentCreated { shipment_details: newShipment } );
		}

		fn update_shipment(ref self: ContractState, _id: u256, status: ShipmentStatus) {
			assert(self.factory_address.read() == get_caller_address());
			assert(is_admin, "Caller not an admin");
			let this_shipemet = self.order_id.read(_id);
			this_shipemet.status = status;
		}
	}

}
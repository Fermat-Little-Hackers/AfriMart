#[starknet::interface]
use starknet::ContractAddress; 
use SupplyChain::ShipmentStatus;
trait ISupplyChain<TContractState> {
	fn whitelist_account(ref self: TContractState, address: ContractAddress);
  fn is_whitelisted(self: @TContractState, address: ContractAddress) -> bool;
  fn create_shipment(ref self: TContractState, order_id: u256, _name: felt252, picture: felt252, address: felt252, trackingMode: felt252);
	fn update_shipment(ref self: TContractState, _id: u8, status: ShipmentStatus); 
  fn is_admin(ref self: TContractState, address: ContractAddress) -> bool;
}

#[starknet::contract]
mod SupplyChain {
	use super::ISupplyChain;
	use starknet::{ContractAddress, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
		name: felt252,
		company_id: u16,
		admin_id: u128,
		city: felt252,
		state: felt252,
		country: felt252,
		factory_address: ContractAddress,
		is_whitelisted: LegacyMap<ContractAddress, bool>,
    is_admin: LegacyMap<ContractAddress, bool>,
		shiplog: LegacyMap<u256,ShipmentDetails>,
		order_log: LegacyMap<u8, ShipmentDetails>,
    }

  #[derive(Drop, Copy, starknet::Store, SerdeDrop, starknet::Store, Serde)]
	enum ShipmentStatus {
		Ordered,
		Custody,
		Delivered
	}

  #[derive(Drop, Copy, starknet::Store, Serde)]
	struct ShipmentDetails {
		order_id: u256,
		name: felt252,
		address: felt252,
		status: ShipmentStatus,
		created_by: ContractAddress,
		// products: LegacyMap<u7,Product>
	}

  #[event]
  #[derive(Drop, starknet::Event)]
  enum Event {
  AccountWhitelisted: AccountWhitelisted,
  ShipmentCreated: ShipmentCreated,
  // ShipmentInCustody: ShipmentInCustody,
  // ShipmentDelivered: ShipmentDelivered,
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
		dispatch_id: u16,
		city: felt252,
		state: felt252,
		country: felt252,
    msg_sender: ContractAddress,
	){
		self.name.write(dispatch_name);
		self.company_id.write(dispatch_id);
		self.city.write(city);
		self.state.write(state);
		self.country.write(country);
		self.factory_address.write(msg_sender);
		self.factory_address.write(msg_sender);
	}

	#[generate_traits]
	impl ISupplyChainImpl of ISupplyChain<ContractState>{
		fn whitelist_account(ref self: ContractState, address: ContractAddress) {
      let caller = get_caller_address();
			assert(self.factory_address.read() == caller, "Only the factory can whitelist an account");
			self.is_whitelisted.write(address, true);
			self.emit(AccountWhitelisted { account: address });
		}

		fn is_whitelisted(self: @ContractState, address: ContractAddress ) -> bool {
			self.is_whitelisted.read(address)
		}

		fn is_admin(ref self: ContractState, address: ContractAddress) -> bool {
			self.is_admin.read(address) 
		}

		fn create_shipment(ref self: ContractState, order_id: u256, _name: felt252, picture: felt252, address: felt252, trackingMode: felt252){
      let caller = get_caller_address();
			assert(self.is_whitelisted(caller), "Caller not whitelisted");
      let caller = get_caller_address();
			let newShipment = ShipmentDetails {
        order_id,
				name: _name,
				address,
				status: ShipmentStatus::Ordered,
        created_by: caller,
			};
			self.shiplog.write(order_id,newShipment);
			self.emit(ShipmentCreated { shipment_details: newShipment } );
		}

		fn update_shipment(ref self: ContractState, _id: u8, status: ShipmentStatus) {
      let caller = get_caller_address();
			assert(self.is_admin(caller), "Caller not an admin");
			let mut this_shipemet = self.order_log.read(_id);
			this_shipemet.status = status;
		}
	}

}
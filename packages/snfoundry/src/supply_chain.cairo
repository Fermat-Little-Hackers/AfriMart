use starknet::ContractAddress; 
use super::order_status::OrderStatus;

#[starknet::interface]
trait ISupplyChain<TContractState> {
	fn whitelist_account(ref self: TContractState, address: ContractAddress);
	fn is_whitelisted(self: @TContractState, address: ContractAddress) -> bool;
	fn create_shipment(ref self: TContractState, order_id: u256, _name: felt252, picture: felt252, address: felt252, trackingMode: felt252);
	fn update_shipment(ref self: TContractState, order_id: u256, next_location: felt252, new_status: OrderStatus);
	fn is_admin(ref self: TContractState, address: ContractAddress) -> bool;
}

#[starknet::interface]
trait IFactory<TContractState> {
	fn createTracker(ref self: TContractState, orderID: u256, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus);
	fn updateTracker(ref self: TContractState, orderId: u256, companyID: u16, branchID: u128, previousLocation: felt252, currentLocation: felt252, nextStop: felt252, deliveryStatus: OrderStatus);
}

#[starknet::contract]
mod SupplyChain {
	use snfoundry::supply_chain::IFactoryDispatcherTrait;
use super::ISupplyChain;
	use starknet::{ContractAddress, get_caller_address, get_contract_address,};
	use super::OrderStatus;
	use super::IFactoryDispatcher;

    #[storage]
    struct Storage {
		name: felt252,
		company_id: u16,
		branch_id: u128,
		admin_id: u128,
		city: felt252,
		state: felt252,
		country: felt252,
		factory_address: ContractAddress,
		is_whitelisted: LegacyMap<ContractAddress, bool>,
		is_admin: LegacyMap<ContractAddress, bool>,
		shiplog: LegacyMap<u256,ShipmentDetails>,
		order_log: LegacyMap<u256, ShipmentDetails>,
    }

  #[derive(Drop, Copy, starknet::Store, Serde)]
	struct ShipmentDetails {
		order_id: u256,
		name: felt252,
		address: felt252,
		status: OrderStatus,
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

	#[external(v0)]
	impl ISupplyChainImpl of ISupplyChain<ContractState>{
		fn whitelist_account(ref self: ContractState, address: ContractAddress) {
      let caller = get_caller_address();
			assert(self.factory_address.read() == caller, 'NOT FACTORY');
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
			assert(self.is_whitelisted(caller), 'Caller not whitelisted');
			let newShipment = ShipmentDetails {
        		order_id,
				name: _name,
				address,
				status: OrderStatus::Processing,
        		created_by: caller,
			};

			let result = IFactoryDispatcher { contract_address: self.factory_address.read() };
			result.createTracker(
				order_id,
				self.company_id.read(),
				self.branch_id.read(),
				address,
				address,
				address,
				OrderStatus::Processing
			);
			self.shiplog.write(order_id,newShipment);
			self.emit(ShipmentCreated { shipment_details: newShipment } );
		}

		fn update_shipment(ref self: ContractState, order_id: u256, next_location: felt252, new_status: OrderStatus) {
			let caller = get_caller_address();
			assert(self.is_whitelisted(caller), 'Caller not a STAFF');
			let mut this_shipment = self.order_log.read(order_id);
			let address = this_shipment.address;
			this_shipment.status = new_status;
			let result = IFactoryDispatcher { contract_address: self.factory_address.read() };
			result.updateTracker(
				order_id,
				self.company_id.read(),
				self.branch_id.read(),
				self.city.read(),
				self.city.read(),
				next_location,
				new_status
			);
		}
	}

}
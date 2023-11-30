use starknet::ContractAddress; 
use super::order_status::OrderStatus;

#[starknet::interface]
trait ISupplyChain<TContractState> {
	fn whitelist_account(ref self: TContractState, address: ContractAddress);
	fn is_whitelisted(self: @TContractState, address: ContractAddress) -> bool;
	fn create_shipment(ref self: TContractState, order_id: u256, _name: felt252, cid1: felt252, cid2: felt252, address: felt252, trackingMode: felt252);
	fn update_shipment(ref self: TContractState, order_id: u256, next_location: felt252, new_status: OrderStatus);
	fn is_admin(ref self: TContractState, address: ContractAddress) -> bool;

}

#[starknet::interface]
trait IFactory<TContractState> {
	fn createTracker(ref self: TContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus) ;
    fn updateTracker(ref self: TContractState, orderID: u256, nextStop: felt252, deliveryStatus: OrderStatus);
	fn setStaffBranch(ref self: TContractState, staffAddress: ContractAddress) -> bool;
    fn getStaffBranch(self: @TContractState, staffAddress: ContractAddress ) -> ContractAddress;
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
		is_Admin: LegacyMap<ContractAddress, bool>,
		shiplog: LegacyMap<u256,ShipmentDetails>,
		order_log: LegacyMap<u256, ShipmentDetails>,
    }

  #[derive(Drop, Copy, starknet::Store, Serde)]
	struct ShipmentDetails {
		order_id: u256,
		name: felt252,
		cid1: felt252,
		cid2: felt252,
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
		city: felt252,
		state: felt252,
		country: felt252,
    msg_sender: ContractAddress,
		factoryy_address : ContractAddress,
	){
		self.city.write(city);
		self.state.write(state);
		self.country.write(country);
		self.factory_address.write(factoryy_address);
		self.is_Admin.write(msg_sender, true);
	}

	#[external(v0)]
	impl ISupplyChainImpl of ISupplyChain<ContractState>{
		fn whitelist_account(ref self: ContractState, address: ContractAddress) {
      let caller = get_caller_address();
			assert(self.is_Admin.read(caller) == true, 'NOT ADMIN');
			self.is_whitelisted.write(address, true);
			let address_factory = self.factory_address.read();
			let factory_dispatcher = IFactoryDispatcher {contract_address : address_factory };
			factory_dispatcher.setStaffBranch(address);
			self.emit(AccountWhitelisted { account: address });
		}

		fn is_whitelisted(self: @ContractState, address: ContractAddress ) -> bool {
			self.is_whitelisted.read(address)
		}

		fn is_admin(ref self: ContractState, address: ContractAddress) -> bool {
			self.is_Admin.read(address) 
		}

		fn create_shipment(ref self: ContractState, order_id: u256, _name: felt252, cid1: felt252, cid2:felt252, address: felt252, trackingMode: felt252){
      		let caller = get_caller_address();
			assert(self.is_whitelisted.read(caller), 'Caller not whitelisted');
			let newShipment = ShipmentDetails {
        		order_id,
				name: _name,
				cid1,
				cid2,
				address,
				status: OrderStatus::Processing,
        		created_by: caller,
			};

			let result = IFactoryDispatcher { contract_address: self.factory_address.read() };
			result.createTracker(
				order_id,
				address,
				OrderStatus::Processing
			);
			self.shiplog.write(order_id,newShipment);
			self.emit(ShipmentCreated { shipment_details: newShipment } );
		}

		fn update_shipment(ref self: ContractState, order_id: u256, next_location: felt252, new_status: OrderStatus) {
			let caller = get_caller_address();
			assert(self.is_whitelisted.read(caller), 'Caller not a STAFF');
			let mut this_shipment = self.order_log.read(order_id);
			let address = this_shipment.address;
			this_shipment.status = new_status;
			let result = IFactoryDispatcher { contract_address: self.factory_address.read() };
			result.updateTracker(
				order_id,
				next_location,
				new_status
			);
		}
	}

}
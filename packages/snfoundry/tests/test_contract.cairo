use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::TryInto;
use starknet::{ContractAddress, contract_address_const,ClassHash, get_caller_address};
use starknet::Felt252TryIntoContractAddress;

use snforge_std::{declare, ContractClassTrait,get_class_hash, start_prank};
use snfoundry::market_place::{aftimartTraitSafeDispatcher, aftimartTraitSafeDispatcherTrait};
use snfoundry::Rating::{IRatingSafeDispatcher, IRatingSafeDispatcherTrait};
use snfoundry::supply_chain_factory::{IDispatchFactoryDispatcher, IDispatchFactoryDispatcherTrait};
use core::zeroable::Zeroable;
use debug::PrintTrait;


// #[test]
// fn test_deployment_works() {
//     let supply_factory_address = deploy_supply_factory();
//     let market_contract_address = deploy_market_contract(supply_factory_address);
//     let rating_contract_address = deploy_rating_contract(market_contract_address);
//     // let safe_dispatcher = aftimartTraitSafeDispatcher { contract_address };
//     assert(!market_contract_address.is_zero(), 'wrong_market');
//     assert(!supply_factory_address.is_zero(), 'wrong_factory');
//     assert(!rating_contract_address.is_zero(), 'wrong_rating');
// }

#[test]
fn test_setmarketplace_works (){
    let admin_address = contract_address_const::<'admin_address'>();
    let dispatch_hq_admin = contract_address_const::<'dispatch_hq_admin_address'>();
    let dispatch_admin = contract_address_const::<'dispatch_admin_address'>();
    
    let supply_factory_address = deploy_supply_factory();
    let market_contract_address = deploy_market_contract(supply_factory_address);
  
    let factory_dispatcher = IDispatchFactoryDispatcher {contract_address : supply_factory_address};

    start_prank(supply_factory_address,admin_address);
    factory_dispatcher.setMarketPlace(market_contract_address);
    let res = factory_dispatcher.getMarketPlace();

    let new_admin = contract_address_const::<'admin_address'>();
    let admin_id = factory_dispatcher.setFactoryAdmin(new_admin);

    let res2 = factory_dispatcher.setDispatchHqAdmin(dispatch_hq_admin,'ucherider', 'Nigeria', 'Lagos', 'ikorodu');
    
    start_prank(supply_factory_address,dispatch_hq_admin);
    let dispatch_admin_id = factory_dispatcher.setDispatchAdmin(dispatch_admin);

    start_prank(supply_factory_address,dispatch_admin);
    let (id, child_address) = factory_dispatcher.createBranch('ikorodu', 'Lagos', 'Nigeria');

    assert(!child_address.is_zero(), 'bad_child');
    assert(res == market_contract_address, 'incorrect_market');
    assert(res2 == 0, 'invalid_hq_admin');
    assert(admin_id == 2, 'incorrect_admin');
    assert(dispatch_admin_id == 1, 'invalid_dis');

}

// *************************************************************************
//                          SETUP CONTRACTS
// *************************************************************************

fn compute_supply_chain_hash() -> ClassHash {
    let contract = declare('SupplyChain');
    contract.class_hash
}
fn deploy_supply_factory() -> ContractAddress {
    let admin_address = contract_address_const::<'admin_address'>();
    let contract = declare('DispatchCompanyFactory');
    let hash = compute_supply_chain_hash();
    contract.deploy(@array![hash.into(), admin_address.into()]).unwrap()
}

fn deploy_market_contract(supply_factory_address : ContractAddress) -> ContractAddress {
    let contract = declare('afrimart');
    let admin_address = contract_address_const::<'admin_address'>();
    let token_address = contract_address_const::<'token_address'>();
    contract.deploy(@array![admin_address.into(), token_address.into(), supply_factory_address.into()]).unwrap()
}

fn deploy_rating_contract(market_place_address : ContractAddress ) -> ContractAddress {
    let contract = declare('Rating');
    contract.deploy(@array![market_place_address.into()]).unwrap()
}
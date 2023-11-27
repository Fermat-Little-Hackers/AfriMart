use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::TryInto;
use starknet::{ContractAddress, contract_address_const,ClassHash};
use starknet::Felt252TryIntoContractAddress;

use snforge_std::{declare, ContractClassTrait,get_class_hash};
use snfoundry::market_place::{aftimartTraitSafeDispatcher, aftimartTraitSafeDispatcherTrait};
use snfoundry::Rating::{IRatingSafeDispatcher, IRatingSafeDispatcherTrait};
use snfoundry::supply_chain_factory::{IDispatchFactoryDispatcher, IDispatchFactoryDispatcherTrait};
use core::zeroable::Zeroable;


#[test]
fn test_deployment_works() {
    let supply_factory_address = deploy_supply_factory();
    let market_contract_address = deploy_market_contract(supply_factory_address);
    let rating_contract_address = deploy_rating_contract(market_contract_address);
    // let safe_dispatcher = aftimartTraitSafeDispatcher { contract_address };
    assert(!market_contract_address.is_zero(), 'wrong_market');
    assert(!supply_factory_address.is_zero(), 'wrong_factory');
    assert(!rating_contract_address.is_zero(), 'wrong_rating');
}


// *************************************************************************
//                          SETUP CONTRACTS
// *************************************************************************

fn compute_supply_chain_hash() -> ClassHash {
    let contract = declare('SupplyChain');
    contract.class_hash
}
fn deploy_supply_factory() -> ContractAddress {
    let contract = declare('DispatchCompanyFactory');
    let hash = compute_supply_chain_hash();
    contract.deploy(@array![hash.into()]).unwrap()
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
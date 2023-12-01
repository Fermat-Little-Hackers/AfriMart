// use core::box::BoxTrait;
// use core::starknet::SyscallResultTrait;
// use core::traits::Into;
// use array::ArrayTrait;
// use result::ResultTrait;
// use option::OptionTrait;
// use traits::TryInto;
// use starknet::{ContractAddress, contract_address_const,ClassHash, get_caller_address};
// use starknet::Felt252TryIntoContractAddress;


// use snforge_std::{declare, ContractClassTrait,get_class_hash, start_prank, stop_prank};
// use snfoundry::market_place::{cartegory, aftimartTraitSafeDispatcher, aftimartTraitSafeDispatcherTrait};
// use snfoundry::Rating::{IRatingDispatcher, IRatingDispatcherTrait, IRatingSafeDispatcher, IRatingSafeDispatcherTrait};
// use snfoundry::supply_chain_factory::{IDispatchFactoryDispatcher, IDispatchFactoryDispatcherTrait};
// use core::zeroable::Zeroable;
// use debug::PrintTrait;


// #[test]
// fn test_rating_contract_via_fork() {

//     let admin_address = contract_address_const::<'admin_address'>();
//     // let payment_token: ContractAddress = 0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7.try_into().unwrap();

//     let buyer_address = contract_address_const::<'buyer_address'>();
//     let seller_address = contract_address_const::<'seller_address'>();

//     let rating_contract = declare('Rating');
//     // let marketplace_contract = declare('afrimart');

//     // let rating_contract_address: ContractAddress = 0x038dd191ee37db66836001ea07f34320ba2da320ff3e1e040a206098412fbb4a.try_into().unwrap();
//     let marketplace_contract_address: ContractAddress = 0x02116bfe76e0e53af2be9b189994545a6bf13db7e3ed65ee9bdf29e93407b95e.try_into().unwrap();
//     let mut rating_calldata = ArrayTrait::<felt252>::new();
//     // let mut marketplace_calldata = ArrayTrait::<felt252>::new();
    
//     rating_calldata.append(marketplace_contract_address.into());
//     let rating_contract_address = rating_contract.deploy(@rating_calldata).unwrap();

//     let rating_dispatcher = IRatingDispatcher{contract_address: rating_contract_address};

//     // Review product
//     rating_dispatcher.review_product(0, 3, 'Hey yo', 'Hey there');
//     let product_rating = rating_dispatcher.get_product_rating(0);
//     product_rating.print();
//     assert(product_rating == 3, 'Wrong rating');

//     // Review user
//     rating_dispatcher.review_user(0, 5, 'Hey', 'Hey there', admin_address);
//     let user_rating = rating_dispatcher.get_user_rating(admin_address);
//     let user_reviewers = rating_dispatcher.get_user_reviewers(admin_address);
//     assert(user_rating == 5, 'Wrong user rating');
//     assert(user_reviewers.len() == 1, 'wrong reviewers count');

//     // Add another review
//     rating_dispatcher.review_user(0, 5, 'Hey1', 'Hey there1', admin_address);
//     let user_reviews = rating_dispatcher.get_user_review(admin_address);
//     (*user_reviews.at(1)).print();
// }



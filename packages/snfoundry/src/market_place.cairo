use starknet::{ContractAddress};
use array::ArrayTrait;

#[derive(Drop, Copy, starknet::Store, Serde)]
struct userProfile {
    id: u256,
    name: felt252,
    address: ContractAddress,
    totalItemListed: u256,
    totalItemsPurchased: u256,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct order {
    itemID: u256,
    orderId: u256,
    buyer: ContractAddress,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct Item {
    id: u256,
    name: felt252,
    description: felt252,
    imageUri: felt252,
    price: u256,
    seller: ContractAddress,
    amountAvailable: u256,
    offMarket: bool,
}

#[starknet::interface]
trait aftimartTrait<TContractState> {
    fn createProfile(ref self:TContractState, Name: felt252);
    fn listProduct(ref self:TContractState, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256);
    fn editProductDetails(ref self: TContractState, productId: u256, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256);
    fn takeProductOffMarket(ref self: TContractState, productId: u256);
    fn purchaseProduct(ref self: TContractState, productId: u256);
    fn confirmProductReceived(ref self: TContractState, orderId: u256);
    fn changeProductCartegory(ref self: TContractState, productId: u256);
    fn addItemToCart(ref self: TContractState, productId: u256);
    fn removeItemFromCart(ref self: TContractState, productId: u256);
    fn checkOutCart(ref self: TContractState);
    fn getAllProducts(self: @TContractState) -> Array::<u256>;
    fn getProductsByCategory(self: @TContractState, cartegory: u8) -> Array::<u256>;
    fn getProductDetais(self: @TContractState, productId: u256) -> Array::<u256>;
    fn getProductsByUser(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getUserProfile(self: @TContractState, user: ContractAddress) -> userProfile;
}
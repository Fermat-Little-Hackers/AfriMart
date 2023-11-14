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


#[starknet::contract]
mod afrimart {
    use super::{ArrayTrait, ContractAddress, aftimartTrait, userProfile, Item};
    use starknet::{get_caller_address};

    #[storage]
    struct Storage {
        //Track total items listed by a user through: userAddress, index of product, poductID
        itemsListed: LegacyMap<(ContractAddress, u256), u256>,

        // Track Total Items baught by a user
        itemsPurchased: LegacyMap<(ContractAddress, u256), u256>,

        // Track all all users on this Dapp 
        totalProfiles: u256,
        allProfiles: LegacyMap<u256, userProfile>,
        userId: LegacyMap<ContractAddress, u256>,

        // Track All Items Listed
        totalItems: u256,
        allItems: LegacyMap<u256, Item>,

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }


    impl afrimartExternalImpl of super::aftimartTrait<ContractState> {
        fn createProfile(ref self: ContractState, Name: felt252) {
            let UserId: u256 = self.totalProfiles.read() + 1;
            self.totalProfiles.write(UserId);
            let newUser = userProfile{
                id: UserId, name: Name, 
                address: get_caller_address(), 
                totalItemListed: 0, 
                totalItemsPurchased: 0,
            };
            self.allProfiles.write(UserId, newUser);
            self.userId.write(get_caller_address() ,UserId);
        }

        fn listProduct(ref self: ContractState, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256){
            let ItemId: u256 = self.totalItems.read() + 1;
            self.totalItems.write(ItemId);
            let newProduct = Item {
                id: ItemId,
                name: name,
                description: description,
                imageUri: imageUri,
                price: price,
                seller: get_caller_address(),
                amountAvailable: amountAvailable,
                offMarket: false,
            };
            self.allItems.write(ItemId, newProduct);
            //get a users Id
            let userID = self.userId.read(get_caller_address());
            // use a usersId to fetch his details
            let mut usersProfile: userProfile = self.allProfiles.read(userID);
            let UsersItemListedId = usersProfile.totalItemListed + 1;
           // reasign the ipdated details to the users profile
            usersProfile.totalItemListed = UsersItemListedId;
            // store the updated user profile
            self.allProfiles.write(userID, usersProfile);

            // store a list of items listed by a user using the users address, the index of the listed item in his list,
            // finally the Id of the Item in storage.
            self.itemsListed.write((get_caller_address(), UsersItemListedId), ItemId);
        }

            fn editProductDetails(ref self: ContractState, productId: u256, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address(), 'CALLER DIDNT LIST ITEM');
            Item.name = name;
            Item.description = description;
            Item.imageUri = imageUri;
            Item.price = price;
            Item.amountAvailable = amountAvailable;

            self.allItems.write(productId,Item);
        }

        fn takeProductOffMarket(ref self: ContractState, productId: u256) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address(), 'CALLER DIDNT LIST ITEM');
            Item.offMarket = true;
            self.allItems.write(productId,Item);
        }

        fn purchaseProduct(ref self: ContractState, productId: u256) {
            let mut Item = self.allItems.read(productId);

        }


    }

}
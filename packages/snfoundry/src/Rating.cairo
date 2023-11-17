use starknet::ContractAddress;
use array::ArrayTrait;
use alexandria_storage::list::{List, ListTrait};


#[derive(Drop, Copy, starknet::Store, Serde)]
struct order {
    itemID: u256,
    orderId: u256,
    amountOfProducts: u256,
    buyer: ContractAddress,
    paymentTime: u64,
    paymentStatus: orderPaymentStatus,
    shipmentStatus: deliveryStatus,
}

#[derive(Drop, Copy, Serde, starknet::Store)]
enum orderPaymentStatus {
    paymentWithMarket,
    PaymentReleasedToSeller,
}

#[derive(Drop, Copy, Serde, starknet::Store)]
enum deliveryStatus {
    awaitingReleaseFromSeller,
    submitedForDelivery,
    DepartedFromOrigin,
    ArrivedDestination,
    PickedUpByBuyer,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct Item {
    id: u256,
    name: felt252,
    description: felt252,
    imageUri: felt252,
    price: u256,
    cartegory: cartegory,
    seller: ContractAddress,
    amountAvailable: u256,
    totalSales: u256,
    offMarket: bool,
}


#[derive(Drop, Copy, starknet::Store, Serde)]
struct userProfile {
    id: u256,
    name: felt252,
    address: ContractAddress,
    country: felt252,
    region: felt252,
    totalItemListed: u256,
    totalItemsPurchased: u256,
    totalItemsSold: u256,
}


#[derive(Drop, Copy, Serde, starknet::Store)]
enum cartegory {
    Agriculture,
    TextileAndClothings,
    Accesories,
    ToolsAndEquipments,
    DigitalArts,
    PhysicalArtsNDSculptures,
}


#[starknet::interface]
trait IAftimart<TContractState> {
    fn createProfile(ref self:TContractState, Name: felt252, country: felt252, region: felt252);
    fn listProduct(ref self:TContractState, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256, cartegory: cartegory);
    fn editProductDetails(ref self: TContractState, productId: u256, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256);
    fn takeProductOffMarket(ref self: TContractState, productId: u256);
    fn purchaseProduct(ref self: TContractState, productId: u256, Amount: u256);
    fn confirmProductReceived(ref self: TContractState, orderId: u256);
    fn changeProductCartegory(ref self: TContractState, productId: u256, newCartegory: cartegory);
    fn addItemToCart(ref self: TContractState, productId: u256);
    fn removeItemFromCart(ref self: TContractState, productId: u256);
    fn checkOutCart(ref self: TContractState);
    fn getAllProducts(self: @TContractState) -> Array::<u256>;
    fn getProductsByCategory(self: @TContractState, cartegory: u8) -> Array::<u256>;
    fn getProductDetais(self: @TContractState, productId: u256) -> Array::<u256>;
    fn getProductsByUser(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getUserProfile(self: @TContractState, user: ContractAddress) -> userProfile;
    fn getUsersCart(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getOrderInfo(self: @TContractState, orderId: u256) -> order;
    fn getItemInfo(self: @TContractState, itemId: u256) -> Item;
}



#[starknet::interface]
trait IRating <TContractState>{
    fn rate_user(ref self: TContractState, order_id: u256, rating: u32);

    fn rate_product(ref self: TContractState, order_id: u256, rating: u32);

    fn get_user_rating(self: @TContractState, user_address: ContractAddress) -> u32;

    fn get_product_rating(self: @TContractState, product_id: u256) -> u32;
    
    fn review_product(ref self: TContractState, product_id: u256, rating: u32, review: Array<felt252>, extra_info: Array<felt252>);

    fn review_user(ref self: TContractState, user_address: ContractAddress, rating: u32, review: Array<felt252>, extra_info: Array<felt252>);

    // fn get_product_review(self: @TContractState, product_id: u256) -> ProductReview;

    // fn get_user_review(self: @TContractState, user_address: ContractAddress) -> UserReview;
    
    fn comment_on_product(ref self: TContractState, order_id: u256, comment: felt252);

    fn comment_on_user(ref self: TContractState, order_id: u256, comment: felt252);

}

#[derive(starknet::Store, Drop)]
struct ProductReview {
    total_rating: u32,
    review: List<felt252>,
    comments: List<felt252>,
    extra_info_url: List<felt252>,
    reviewers: List<ContractAddress>,
}


#[derive(starknet::Store, Drop)]
struct UserReview {
    total_rating: u32,
    review: List<felt252>,
    comments: List<felt252>,
    extra_info_url: List<felt252>,
    reviewers: List<ContractAddress>,
}


#[starknet::contract]
mod Rating {
    use alexandria_storage::list::{List, ListTrait};
    use starknet::{ContractAddress, get_caller_address};
    use array::ArrayTrait;
    use super::{IRating, ProductReview, UserReview, IAftimartDispatcher, IAftimartDispatcherTrait, userProfile, Item};

    #[storage]
    struct Storage {
        marketplace_contract: ContractAddress,
        product_review: LegacyMap<u256, ProductReview>,
        user_review: LegacyMap<ContractAddress, UserReview>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, marketplace_contract: ContractAddress) {
        self.marketplace_contract.write(marketplace_contract);
    }


    #[external(v0)]
    impl RatingImpl of IRating<ContractState> {
        fn rate_user(ref self: ContractState, order_id: u256, rating: u32){
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            let item = IAftimartDispatcher { contract_address: market_place_contract }.getItemInfo(order.itemID);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut user = self.user_review.read(item.seller);
            user.total_rating =  user.total_rating + rating;
            user.reviewers.append(caller_address);
        }

        fn rate_product(ref self: ContractState, order_id: u256, rating: u32) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut product = self.product_review.read(order.itemID);
            product.total_rating = product.total_rating + rating;
            product.reviewers.append(caller_address);
        }

        fn get_user_rating(self: @ContractState, user_address: ContractAddress) -> u32 {
            let user_review = self.user_review.read(user_address);
            user_review.total_rating / user_review.reviewers.len()
        }

        fn get_product_rating(self: @ContractState, product_id: u256) -> u32 {
            let product_review = self.product_review.read(product_id);
            product_review.total_rating / product_review.reviewers.len()
        }
        

        // TODO: Review
        fn review_product(ref self: ContractState, product_id: u256, rating: u32, review: Array<felt252>, extra_info: Array<felt252>) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut product = self.product_review.read(order.itemID);
            product.total_rating = product.total_rating + rating;
            product.reviewers.append(caller_address);
        }
        
        // TODO: Review
        fn review_user(ref self: ContractState, user_address: ContractAddress, rating: u32, review: Array<felt252>, extra_info: Array<felt252>) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            let item = IAftimartDispatcher { contract_address: market_place_contract }.getItemInfo(order.itemID);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut user = self.user_review.read(item.seller);
            user.total_rating =  user.total_rating + rating;
            user.reviewers.append(caller_address);
        }

        // fn get_product_review(self: @ContractState, product_id: u256) -> ProductReview {
        //     self.product_review.read(product_id)
        // }

        // fn get_user_review(self: @ContractState, user_address: ContractAddress) -> UserReview {
        //     self.user_review.read(user_address)
        // }
        
        fn comment_on_product(ref self: ContractState, order_id: u256, comment: felt252) {
            let caller_address = get_caller_address();
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut product = self.product_review.read(order.itemID);
            product.comments.append(comment);
        }

        fn comment_on_user(ref self: ContractState, order_id: u256, comment: felt252) {
            let caller_address = get_caller_address();
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderInfo(order_id);
            let item = IAftimartDispatcher { contract_address: market_place_contract }.getItemInfo(order.itemID);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut user = self.user_review.read(item.seller);
            user.comments.append(comment);
        }

    }
}
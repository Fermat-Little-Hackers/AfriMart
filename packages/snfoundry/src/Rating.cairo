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
    fn getProductsByUser(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getUserProfile(self: @TContractState, user: ContractAddress) -> userProfile;
    fn getUsersCart(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getOrderDetails(self: @TContractState, orderId: u256) -> order;
    fn getItemInfo(self: @TContractState, itemId: u256) -> Item;
    fn getProductDetails(self: @TContractState, productId: u256) -> Item;
}



#[starknet::interface]
trait IRating <TContractState>{

    fn get_user_rating(self: @TContractState, user_address: ContractAddress) -> u32;

    fn get_product_rating(self: @TContractState, product_id: u256) -> u32;
    
    fn review_product(ref self: TContractState, order_id: u256, rating: u32, review: felt252, extra_info_url: felt252);

    fn review_user(ref self: TContractState, order_id: u256, rating: u32, review: felt252, extra_info_url: felt252);

    fn get_product_review(self: @TContractState, product_id: u256) -> felt252;

    fn get_user_review(self: @TContractState, user_address: ContractAddress) -> Array<felt252>;
    
    fn comment_on_product(ref self: TContractState, order_id: u256, comment: felt252);

    fn comment_on_user(ref self: TContractState, order_id: u256, comment: felt252);

    fn get_user_comments(self: @TContractState, user_address: ContractAddress) -> Array<felt252> ;

    fn get_product_comments(self: @TContractState, product_id: u256) -> felt252 ;

    fn get_user_reviewers(self: @TContractState, user_address: ContractAddress) -> Array<ContractAddress>;

    fn get_product_reviewers(self: @TContractState, product_id: u256) -> ContractAddress;

    fn get_user_extra_info_url(self: @TContractState, user_address: ContractAddress) -> Array<felt252>;

    fn get_product_extra_info_url(self: @TContractState, product_id: u256) -> felt252 ;

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


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        UserReviewed: UserReviewed,
        ProductReviewed: ProductReviewed,
    }

    #[derive(Drop, starknet::Event)]
    struct UserReviewed {
        #[key]
        user_address: ContractAddress, 
        #[key]
        reviewed_by: ContractAddress, 
        #[key]
        rating: u32, 
        #[key]
        review: felt252, 
        #[key]
        extra_info_url: felt252
    }

    #[derive(Drop, starknet::Event)]
    struct ProductReviewed {
        #[key]
        product_id: u256, 
        #[key]
        reviewed_by: ContractAddress, 
        #[key]
        rating: u32, 
        #[key]
        review: felt252,
        #[key]
        extra_info_url: felt252
    }


    #[storage]
    struct Storage {
        marketplace_contract: ContractAddress,

        product_rating: LegacyMap<u256, u32>,
        product_review: LegacyMap<u256, felt252>,
        product_comments: LegacyMap<u256, felt252>,
        product_extra_info_url: LegacyMap<u256, felt252>,
        product_reviewer: LegacyMap<u256, ContractAddress>,
        
        user_total_rating: LegacyMap<ContractAddress, u32>,
        user_reviews: LegacyMap<ContractAddress, List<felt252>>,
        user_comments: LegacyMap<ContractAddress, List<felt252>>,
        user_extra_info_url: LegacyMap<ContractAddress, List<felt252>>,
        user_reviewers: LegacyMap<ContractAddress, List<ContractAddress>>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, marketplace_contract: ContractAddress) {
        self.marketplace_contract.write(marketplace_contract);
    }


    #[external(v0)]
    impl RatingImpl of IRating<ContractState> {

        fn get_user_rating(self: @ContractState, user_address: ContractAddress) -> u32 {
            let user_reviewers_len = self.user_reviewers.read(user_address).len();
            let user_total_rating = self.user_total_rating.read(user_address);
            user_total_rating / user_reviewers_len
        }

        fn get_product_rating(self: @ContractState, product_id: u256) -> u32 {
            self.product_rating.read(product_id)
        }
        
        fn review_product(ref self: ContractState, order_id: u256, rating: u32, review: felt252, extra_info_url: felt252) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderDetails(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            self.product_rating.write(order.itemID, rating);
            self.product_review.write(order.itemID, review);
            self.product_extra_info_url.write(order.itemID, extra_info_url);
            self.product_reviewer.write(order.itemID, caller_address);
            self.emit(ProductReviewed {
                product_id: order.itemID, 
                reviewed_by: caller_address, 
                rating: rating, 
                review: review,
                extra_info_url: extra_info_url
            });
        }
        
        fn review_user(ref self: ContractState, order_id: u256, rating: u32, review: felt252, extra_info_url: felt252) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderDetails(order_id);
            let item = IAftimartDispatcher { contract_address: market_place_contract }.getProductDetails(order.itemID);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            self.user_total_rating.write(item.seller, self.user_total_rating.read(item.seller) + rating);
            let mut rev = self.user_reviews.read(item.seller);
            rev.append(review);
            let mut xtrainfo = self.user_extra_info_url.read(item.seller);
            xtrainfo.append(extra_info_url);
            let mut revrs = self.user_reviewers.read(item.seller);
            revrs.append(caller_address);
            self.emit(UserReviewed {
                user_address: item.seller, 
                reviewed_by: caller_address, 
                rating: rating, 
                review: review,
                extra_info_url: extra_info_url
            });
        }

        fn get_product_review(self: @ContractState, product_id: u256) -> felt252 {
            self.product_review.read(product_id)
        }

        fn get_user_review(self: @ContractState, user_address: ContractAddress) -> Array<felt252> {
            self.user_reviews.read(user_address).array()
        }
        
        fn comment_on_product(ref self: ContractState, order_id: u256, comment: felt252) {
            let caller_address = get_caller_address();
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderDetails(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            self.product_comments.write(order.itemID, comment);
        }

        fn comment_on_user(ref self: ContractState, order_id: u256, comment: felt252) {
            let caller_address = get_caller_address();
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderDetails(order_id);
            let item = IAftimartDispatcher { contract_address: market_place_contract }.getProductDetails(order.itemID);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let mut user_comments = self.user_comments.read(item.seller);
            user_comments.append(comment);
        }

        fn get_user_comments(self: @ContractState, user_address: ContractAddress) -> Array<felt252> {
            self.user_comments.read(user_address).array()
        }

        fn get_product_comments(self: @ContractState, product_id: u256) -> felt252 {
            self.product_comments.read(product_id)
        }

        fn get_user_reviewers(self: @ContractState, user_address: ContractAddress) -> Array<ContractAddress> {
            self.user_reviewers.read(user_address).array()
        }

        fn get_product_reviewers(self: @ContractState, product_id: u256) -> ContractAddress {
            self.product_reviewer.read(product_id)
        }

        fn get_user_extra_info_url(self: @ContractState, user_address: ContractAddress) -> Array<felt252> {
            self.user_extra_info_url.read(user_address).array()
        }

        fn get_product_extra_info_url(self: @ContractState, product_id: u256) -> felt252 {
            self.product_extra_info_url.read(product_id)
        }

    }
}
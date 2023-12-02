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
    processingDelivery: bool,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct newRating {
    itemID: u256,
    orderId: u256,
    buyer: ContractAddress,
    rating: u32,
    review1: felt252,
    review2: felt252,
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

    fn viewReviews(self: @TContractState, ItemId: u256) -> Array::<newRating>;

    fn getProductRatting (self: @TContractState, ItemId: u256) -> u256;

    fn review_product(ref self: TContractState, order_id: u256, rating: u32, review: felt252, review2: felt252);

    fn setMarketPlace(ref self: TContractState, marketPlace: ContractAddress);
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
    use super::{IRating, ProductReview, UserReview, IAftimartDispatcher, IAftimartDispatcherTrait, userProfile, Item, newRating};


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
        // track reviews through mapping itemID to number of reviews
        totalReviews: LegacyMap<u256, u256>,
        totalStars: LegacyMap<u256, u256>,
        individualReview: LegacyMap<(u256, u256), newRating>,
        admin: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, marketplace_contract: ContractAddress, admin: ContractAddress) {
        self.marketplace_contract.write(marketplace_contract);
        self.admin.write(admin);
    }


    #[external(v0)]
    impl RatingImpl of IRating<ContractState> {

        fn review_product(ref self: ContractState, order_id: u256, rating: u32, review: felt252, review2: felt252) {
            let caller_address = get_caller_address();
            assert(rating <= 5, 'Max rating is 5');
            let market_place_contract = self.marketplace_contract.read();
            let order = IAftimartDispatcher { contract_address: market_place_contract }.getOrderDetails(order_id);
            assert(order.buyer == caller_address, 'Not a valid buyer');
            let newOrder = newRating{
                    itemID: order.itemID,
                    orderId: order_id,
                    buyer: caller_address,
                    rating: rating,
                    review1: review,
                    review2: review2,
            };
           let mut totalReviews = (self.totalReviews.read(order.itemID) + 1);
           let mut totalStars = self.totalReviews.read(order.itemID);
           self.totalReviews.write(order.itemID, totalReviews);
           self.individualReview.write((order.itemID, totalReviews), newOrder);
           self.totalStars.write(order.itemID, totalStars + rating.into());
        }

        fn viewReviews(self: @ContractState, ItemId: u256) -> Array::<newRating> {
            let totalReviews = self.totalReviews.read(ItemId);
            let maxReviews = self.totalReviews.read(ItemId);
            let mut allReview = ArrayTrait::new();
            let mut i: u256 = 1;
            loop {
                if i > maxReviews {
                    break;
                }
                let review = self.individualReview.read((ItemId, i));
                allReview.append(review);
                i= i + 1;
            };
            return allReview;
        }

        fn getProductRatting (self: @ContractState, ItemId: u256) -> u256 {
            let totalStars = self.totalStars.read(ItemId);
            let totalRatters = self.totalReviews.read(ItemId);
            return (totalStars / totalRatters);
        }

        fn setMarketPlace(ref self: ContractState, marketPlace: ContractAddress) {
            let caller_address = get_caller_address();
            assert(caller_address == self.admin.read(), 'UNAUTHORIZED');
            self.marketplace_contract.write(marketPlace);
        }

    }
}
use starknet::{ContractAddress};
use array::ArrayTrait;

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

#[derive(Drop, Copy, Serde, starknet::Store, PartialEq)]
enum cartegory {
    Agriculture,
    TextileAndClothings,
    Accesories,
    ToolsAndEquipments,
    DigitalArts,
    PhysicalArtsNDSculptures,
}

#[starknet::interface]
trait IERC20<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> u8;
    fn total_supply(self: @TContractState) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
}

#[starknet::interface]
trait aftimartTrait<TContractState> {
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
    fn getProductsByCategory(self: @TContractState, cartegory: cartegory) -> Array::<u256>;
    fn getProductDetails(self: @TContractState, productId: u256) -> Item;
    fn getProductsListedByUser(self: @TContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256>;
    fn getProductsBoughtByUser(self: @TContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256>;
    fn getUserProfile(self: @TContractState, user: ContractAddress) -> userProfile;
    fn getUsersCart(self: @TContractState, user: ContractAddress) -> Array::<u256>;
    fn getOrderDetails(self: @TContractState, orderId: u256) -> order;
}


#[starknet::contract]
mod afrimart {
    use super::{ArrayTrait, ContractAddress, aftimartTrait, userProfile, Item, order, orderPaymentStatus, deliveryStatus, cartegory, IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{get_caller_address, get_contract_address, info::get_block_timestamp};

    #[storage]
    struct Storage {
        //Track total items listed by a user through: userAddress, index of product, itemId
        itemsListed: LegacyMap<(ContractAddress, u256), u256>,

        //Track total sales by a user through: userAddress, index of product, orderID
        itemsSold: LegacyMap<(ContractAddress, u256), u256>,

        // Track Total Items baught by a user through; userAddress, index of product, orderId
        itemsPurchased: LegacyMap<(ContractAddress, u256), u256>,

        // Track all all users on this Dapp 
        totalProfiles: u256,
        allProfiles: LegacyMap<u256, userProfile>,
        userId: LegacyMap<ContractAddress, u256>,

        // Track All Items Listed
        totalItems: u256,
        allItems: LegacyMap<u256, Item>,

        // Track All Orders on the Platform
        totalOrders: u256,
        allOrders: LegacyMap<u256, order>,

        //System utilities
        paymentToken: IERC20Dispatcher,
        Admin: ContractAddress,

        //Track users cart
        noOfProductsInCart: LegacyMap<ContractAddress, u256>,
        // Mapping of user to index then productId
        allProductsInCart: LegacyMap<(ContractAddress, u256), u256>,
        //Track the Id of all products in cart by mapping a user to a product then its index
        getProductInCartIndex: LegacyMap<(ContractAddress, u256), u256>,

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

    #[constructor]
    fn constructor(ref self: ContractState, _Admin: ContractAddress, paymentTokenAdd: ContractAddress) {
        self.Admin.write(_Admin);
        self.paymentToken.write(IERC20Dispatcher{contract_address: paymentTokenAdd});
    }


    #[external(v0)]
    impl afrimartExternalImpl of super::aftimartTrait<ContractState> {
        fn createProfile(ref self: ContractState, Name: felt252, country: felt252, region: felt252) {
            let UserId: u256 = self.totalProfiles.read() + 1;
            self.totalProfiles.write(UserId);
            let newUser = userProfile{
                id: UserId, name: Name, 
                address: get_caller_address(), 
                country: country,
                region: region,
                totalItemListed: 0, 
                totalItemsPurchased: 0,
                totalItemsSold: 0,
            };
            self.allProfiles.write(UserId, newUser);
            self.userId.write(get_caller_address() ,UserId);
        }

        fn listProduct(ref self: ContractState, name: felt252, description: felt252, imageUri: felt252, price: u256, amountAvailable: u256, cartegory: cartegory){
            let ItemId: u256 = self.totalItems.read() + 1;
            self.totalItems.write(ItemId);
            let newProduct = Item {
                id: ItemId,
                name: name,
                description: description,
                imageUri: imageUri,
                price: price,
                cartegory: cartegory,
                seller: get_caller_address(),
                amountAvailable: amountAvailable,
                totalSales: 0,
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

        fn purchaseProduct(ref self: ContractState, productId: u256, Amount: u256) {
            self._PurchaseProduct(productId, Amount);
        }

        fn confirmProductReceived(ref self: ContractState, orderId: u256) {
            let mut order = self.allOrders.read(orderId);
            assert(order.buyer == get_caller_address(), 'NOT RECORDED BUYER');
            order.shipmentStatus = deliveryStatus::PickedUpByBuyer;
        }

        fn changeProductCartegory(ref self: ContractState, productId: u256, newCartegory: cartegory) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address(), 'CALLER DIDNT LIST ITEM');
            Item.cartegory = newCartegory;
            self.allItems.write(productId,Item);
        }

        fn addItemToCart(ref self: ContractState, productId: u256) {
            let number = self.noOfProductsInCart.read(get_caller_address()) + 1;
            self.noOfProductsInCart.write(get_caller_address(), number);
            self.allProductsInCart.write((get_caller_address(), number), productId);
            self.getProductInCartIndex.write((get_caller_address(), productId), number);
        }

        fn removeItemFromCart(ref self: ContractState, productId: u256) {
            let productNumber = self.getProductInCartIndex.read((get_caller_address(), productId));
            assert(productNumber != 0, 'ITEM NOT IN CALLERS CART');
            self._removeItemFromCart(productId, productNumber, get_caller_address());
        }

        fn checkOutCart(ref self: ContractState) {
            let caller = get_caller_address();
            let noOfProducts = self.noOfProductsInCart.read(caller);
            let mut productNumber: u256 = 1;
            loop {
                if productNumber > noOfProducts {
                    break;
                }
                let productId = self.allProductsInCart.read((caller, productNumber));
                self._PurchaseProduct(productId, productNumber);
                self._removeItemFromCart(productId, productNumber, caller);
                productNumber = productNumber +1;
            }
        }

        fn getAllProducts(self: @ContractState) -> Array::<u256> {
            let mut productNumber: u256 = self.totalItems.read();
            let mut allProductId = ArrayTrait::new();
            let mut i:u256 = 1;
            loop {
                if i > productNumber {
                    break;
                }
                let product: Item = self.allItems.read(i);
                if (product.offMarket == false) {
                    allProductId.append(product.id);
                }
                i = i + 1;
            };
            return allProductId;
        }

        fn getProductsByCategory(self: @ContractState, cartegory: cartegory ) -> Array::<u256> {
            let mut productNumber: u256 = self.totalItems.read();
            let mut allProductId = ArrayTrait::new();
            let mut i:u256 = 1;
            loop {
                if i > productNumber {
                    break;
                }
                let product: Item = self.allItems.read(i);
                if product.cartegory == cartegory {
                    if (product.offMarket == false) {
                        allProductId.append(product.id);
                    }
                }
                i = i + 1;
            };
            return allProductId;
        }

        fn getProductDetails(self: @ContractState, productId: u256) -> Item {
            let maxProductID = self.totalItems.read();
            assert(maxProductID >= productId && productId != 0, 'INVALID PRODUCT ID');
            self.allItems.read(productId)
        }

        fn getProductsListedByUser(self: @ContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256> {
            let userID = self.userId.read(user);
            assert(userID != 0, 'INVALID USER ADDRESS');
            let numListed = self.allProfiles.read(userID).totalItemListed;
            let mut allProductId = ArrayTrait::new();
            let mut allAvailableProductId = ArrayTrait::new();
            let mut i: u256 = 1;

            loop {
                if i > numListed {
                    break;
                }
                let product: u256 = self.itemsListed.read((user, i));
                allProductId.append(product);
                if (self.allItems.read(product).offMarket == false) {
                    allAvailableProductId.append(product);
                }
                i = i + 1;
            };
            // Reason for extra logic is to be able to return to the seller a history of all the product he listed both available and off market
            // while also able to return to buyers just those available on the market.
            if  user == viewer {
                return allProductId;
            } else {
                return allAvailableProductId;
            }
        }

        fn getProductsBoughtByUser(self: @ContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256> {
            let userID = self.userId.read(user);
            assert(userID != 0, 'INVALID USER ADDRESS');
            let numListed = self.allProfiles.read(userID).totalItemsPurchased;
            let mut allProductId = ArrayTrait::new();
            let mut i: u256 = 1;

            loop {
                if i > numListed {
                    break;
                }
                let product: u256 = self.itemsListed.read((user, i));
                allProductId.append(product);
                i = i + 1;
            };
            return allProductId;
        }   

        fn getUserProfile(self: @ContractState, user: ContractAddress) -> userProfile {
            let userID = self.userId.read(user);
            assert(userID != 0, 'INVALID USER ADDRESS');
            let userProfile = self.allProfiles.read(userID);
            return userProfile;
        }

        fn getUsersCart(self: @ContractState, user: ContractAddress) -> Array::<u256> {
            let userID = self.userId.read(user);
            assert(userID != 0, 'INVALID USER ADDRESS');
            let noInCart = self.noOfProductsInCart.read(user);
            let mut allProductId = ArrayTrait::new();
            let mut i: u256 = 1;

            loop {
                if i > noInCart {
                    break;
                }
                let productId = self.allProductsInCart.read((user, i));
                allProductId.append(productId);
                i = i + 1;
            };

            return allProductId;
        } 

        fn getOrderDetails(self: @ContractState, orderId: u256) -> order {
            let totalOrder = self.totalOrders.read();
            assert(totalOrder >= orderId && orderId != 0, 'INVALID ORDER ID');
            let orderDetails = self.allOrders.read(orderId);
            return orderDetails;
        }

    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn _removeItemFromCart(ref self: ContractState, productId: u256, productNumber: u256, caller: ContractAddress) {
            let noOfLastProduct = self.noOfProductsInCart.read(caller);
            let lastProductId = self.allProductsInCart.read((caller, noOfLastProduct));
            self.getProductInCartIndex.write((caller, lastProductId), productNumber);
            self.getProductInCartIndex.write((caller, productId), 0);
            self.noOfProductsInCart.write(caller, noOfLastProduct - 1);
            self.allProductsInCart.write((caller, productNumber), lastProductId);
            self.allProductsInCart.write((caller, noOfLastProduct), 0);
        }

        fn _PurchaseProduct(ref self: ContractState, productId: u256, Amount: u256) {
            let mut Item = self.allItems.read(productId);
            let totalFee = Amount * Item.price;
            let caller = get_caller_address();
            let this = get_contract_address();
            let callersBalance = self.paymentToken.read().balanceOf(caller);
            assert(callersBalance >= totalFee, 'INSUFFICIENT BALANCE');
            self.paymentToken.read().transferFrom(caller, this, totalFee);

            let orderId = self._recordOrder(Item.id, Amount, caller);
            self._recordUsersPurchase(orderId, caller);
            self._recordSellerSale(orderId, Item.seller);

        }

        fn _recordOrder(ref self: ContractState, productId: u256, Amount: u256, caller: ContractAddress) -> u256 {
            let mut Item = self.allItems.read(productId);
            // update all order record
            let orderId = self.totalOrders.read() + 1;
            self.totalOrders.write(orderId);
            let mut orderDetails: order = order {
                itemID: productId,
                orderId: orderId,
                amountOfProducts: Amount,
                buyer: caller,
                paymentTime: get_block_timestamp(),
                paymentStatus: orderPaymentStatus::paymentWithMarket,
                shipmentStatus: deliveryStatus::awaitingReleaseFromSeller,
            };
            self.allOrders.write(orderId, orderDetails);
            // update the item record
            Item.amountAvailable = Item.amountAvailable - Amount;
            Item.totalSales = Item.totalSales + 1;
            self.allItems.write(productId, Item);
            return orderId;
        }

        fn _recordUsersPurchase(ref self: ContractState, orderId: u256, caller: ContractAddress) {
            let userId = self.userId.read(caller);
            let mut _userProfile = self.allProfiles.read(userId);
            let updatedCount = _userProfile.totalItemsPurchased + 1;
            _userProfile.totalItemsPurchased = updatedCount;
            self.allProfiles.write(userId, _userProfile);
            self.itemsPurchased.write((caller, updatedCount), orderId);
        }

        fn _recordSellerSale(ref self: ContractState, orderId: u256, seller: ContractAddress) {
            let userId = self.userId.read(seller);
            let mut _userProfile = self.allProfiles.read(userId);
            let updatedCount = _userProfile.totalItemsSold + 1;
            _userProfile.totalItemsSold = updatedCount;
            self.allProfiles.write(userId, _userProfile);
            self.itemsSold.write((seller, updatedCount), orderId);   
        }
    }

}
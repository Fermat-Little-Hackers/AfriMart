use starknet::{ContractAddress};
use array::ArrayTrait;


#[derive(Drop, Copy, starknet::Store, Serde)]
struct userProfile {
    id: u256,
    name: felt252,
    address: ContractAddress,
    region: felt252,
    country: felt252,
    profileImg1: felt252, 
    profileImg2: felt252,
    totalItemListed: u256,
    totalItemsPurchased: u256,
    totalItemsSold: u256,
    isCreated: bool,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct cartItem {
    itemID: u256,
    amount: u256,
}

#[derive(Drop, Copy, starknet::Store, Serde)]
struct nftItem {
    itemID: u256,
    price: u256,
    nftContract: ContractAddress,
    nftID: u256,
    seller: ContractAddress,
    offMarket: bool,
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
    processingDelivery: bool,
}

#[derive(Drop, Copy, Serde, starknet::Store, PartialEq)]
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
    imageUri1: felt252, 
    imageUri2: felt252,
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
trait IERC721CamelOnly<TContractState> {
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn ownerOf(self: @TContractState, tokenId: u256) -> ContractAddress;
    fn safeTransferFrom(
        ref self: TContractState,
        from: ContractAddress,
        to: ContractAddress,
        tokenId: u256,
        data: Span<felt252>
    );
    fn transferFrom(ref self: TContractState, from: ContractAddress, to: ContractAddress, tokenId: u256);
    fn setApprovalForAll(ref self: TContractState, operator: ContractAddress, approved: bool);
    fn getApproved(self: @TContractState, tokenId: u256) -> ContractAddress;
    fn isApprovedForAll(self: @TContractState, owner: ContractAddress, operator: ContractAddress) -> bool;
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn token_uri(self: @TContractState, token_id: u256) -> felt252;
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
    fn createProfile(ref self:TContractState, Name: felt252, country: felt252, region: felt252, profileImg1: felt252, profileImg2: felt252);
    fn listProduct(ref self:TContractState, name: felt252, description: felt252, imageUri1: felt252, imageUri2: felt252, price: u256, amountAvailable: u256, cartegory: cartegory);
    fn editProductDetails(ref self: TContractState, productId: u256, name: felt252, description: felt252, imageUri1: felt252, imageUri2: felt252, price: u256, amountAvailable: u256);
    fn takeProductOffMarket(ref self: TContractState, productId: u256);
    fn purchaseProduct(ref self: TContractState, productId: u256, Amount: u256);
    fn confirmProductReceived(ref self: TContractState, orderId: u256);
    fn changeProductCartegory(ref self: TContractState, productId: u256, newCartegory: cartegory);
    fn addItemToCart(ref self: TContractState, productId: u256, Amount: u256);
    fn removeItemFromCart(ref self: TContractState, productId: u256);
    fn checkOutCart(ref self: TContractState);
    fn getAllProducts(self: @TContractState) -> Array::<u256>;
    fn getProductsByCategory(self: @TContractState, cartegory: cartegory) -> Array::<u256>;
    fn getProductDetails(self: @TContractState, productId: u256) -> Item;
    fn getProductsListedByUser(self: @TContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256>;
    fn getProductsBoughtByUser(self: @TContractState, user: ContractAddress, viewer: ContractAddress) -> Array::<u256>;
    fn getUserProfile(self: @TContractState, user: ContractAddress) -> userProfile;
    fn getUsersCart(self: @TContractState, user: ContractAddress) -> Array::<cartItem>;
    fn getOrderDetails(self: @TContractState, orderId: u256) -> order;
    fn getCartValue(self: @TContractState, user: ContractAddress) -> u256;
    fn listNft(ref self: TContractState, nftContract: ContractAddress, tokenId: u256, data: Span<felt252>, price: u256);
    fn buyNft(ref self: TContractState, productId: u256);
    fn getAllNfts(self: @TContractState) -> Array::<u256>;
    fn getNftDetails(self: @TContractState, productId: u256) -> nftItem;
    fn registerSupplyChainChild(ref self: TContractState, supplyChainChild: ContractAddress);
    fn releaseSellersPayment(ref self: TContractState, orderId: u256);
    fn getTotalCashInflow(self: @TContractState) -> (u256, u256);
    fn getPendingPayment(self: @TContractState) -> u256;
    fn getItemsSold(self: @TContractState, user: ContractAddress) -> (Array::<u256>, Array::<u256>);
    fn whitelistAdmin(ref self: TContractState, admin: ContractAddress);
    fn getAdmins(self: @TContractState) -> Array<ContractAddress>;
    fn revokeAdminRight(ref self: TContractState, admin: ContractAddress);
    fn beginProcessingDelivery(ref self: TContractState, orderId: u256);
    fn setSupplyChainFactory(ref self: TContractState, supplyChainFactory: ContractAddress);
    fn reEmburse(ref self: TContractState, amount: u256);

}

#[starknet::contract]
mod afrimart {
    use super::{ArrayTrait, ContractAddress, aftimartTrait, userProfile, Item, order, orderPaymentStatus, cartItem, deliveryStatus, cartegory, nftItem, IERC20Dispatcher, IERC20DispatcherTrait, IERC721CamelOnlyDispatcher, IERC721CamelOnlyDispatcherTrait};
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
        adminRight: LegacyMap<ContractAddress, bool>,
        totalAdmins: u256,
        allAdmins: LegacyMap<u256, ContractAddress>,

        //Track users cart
        noOfProductsInCart: LegacyMap<ContractAddress, u256>,
        // Mapping of user to index then cartItem Struct
        allProductsInCart: LegacyMap<(ContractAddress, u256), cartItem>,
        //Track the Id of all products in cart by mapping a user to a product then its index
        getProductInCartIndex: LegacyMap<(ContractAddress, u256), u256>,
        //Track the total price of a cart
        cartTotalPrice: LegacyMap<ContractAddress, u256>,

        //Track NFTs in the system
        totalNFTS: u256,
        allNFTS: LegacyMap<u256, nftItem>,

        supplyChainFactory: ContractAddress,

        // Track Valid Supply Chain Child
        validSupplyChain: LegacyMap<ContractAddress, bool>,

        //Track total cash inflow
        cashInFlow: u256,
        nftCashInflow: u256,

        // Track pending Payment
        pendingPayment: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ProfileCreated: ProfileCreated,
        ProductListed: ProductListed,
        ProductEditied: ProductEditied,
        productOffMarket: productOffMarket,
        ProductPurchased: ProductPurchased,
        ProductReceived: ProductReceived,
        ProductCartigoryChanged: ProductCartigoryChanged,
        ItemAddedToCart: ItemAddedToCart,
        ItemRemovedFromCart: ItemRemovedFromCart,
        cartCheckedOut: cartCheckedOut,
        nftListed: nftListed,
        nftPurchased: nftPurchased,
        supplyChainRegistered: supplyChainRegistered,
        sellersFeeReleased: sellersFeeReleased,
    }

    #[derive(Drop, starknet::Event)]
    struct ProfileCreated {
        #[key]
        by: ContractAddress,
        #[key]
        name: felt252,
        #[key]
        country: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct ProductListed {
        #[key]
        by: ContractAddress,
        #[key]
        name: felt252,
        #[key]
        cartegory: cartegory,
    }

    #[derive(Drop, starknet::Event)]
    struct ProductEditied {
        #[key]
        by: ContractAddress,
        #[key]
        productID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct productOffMarket {
        #[key]
        productID: u256,
        #[key]
        by: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct ProductPurchased {
        #[key]
        by: ContractAddress,
        #[key]
        productID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ProductReceived {
        #[key]
        by: ContractAddress,
        #[key]
        orderID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ProductCartigoryChanged {
        #[key]
        by: ContractAddress,
        #[key]
        productID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ItemAddedToCart {
        #[key]
        by: ContractAddress,
        #[key]
        productID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ItemRemovedFromCart {
        #[key]
        by: ContractAddress,
        #[key]
        productID: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct supplyChainRegistered {
        #[key]
        by: ContractAddress,
        #[key]
        supplyChain: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct cartCheckedOut {
        #[key]
        by: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct nftListed {
        #[key]
        by: ContractAddress,
        #[key]
        nftID: u256,
        #[key]
        nftContract: ContractAddress,   
        #[key]
        price: u256, 
        #[key]
        itemId: u256,  
    }

    #[derive(Drop, starknet::Event)]
    struct nftPurchased {
        #[key]
        by: ContractAddress,
        #[key]
        nftID: u256,
        #[key]
        nftContract: ContractAddress,   
        #[key]
        price: u256, 
        #[key]
        itemId: u256,    
    }

    #[derive(Drop, starknet::Event)]
    struct sellersFeeReleased {
        #[key]
        seller: ContractAddress,
        #[key]
        orderId: u256,
        #[key]
        supplyChain: ContractAddress,   
        #[key]
        amount: u256,    
    }

    #[constructor]
    fn constructor(ref self: ContractState, _Admin: ContractAddress, paymentTokenAdd: ContractAddress, supplyChainFactory: ContractAddress) {
        self.Admin.write(_Admin);
        self.paymentToken.write(IERC20Dispatcher{contract_address: paymentTokenAdd});
        self.supplyChainFactory.write(supplyChainFactory);
        self.adminRight.write(_Admin, true);
    }


    #[external(v0)]
    impl afrimartExternalImpl of super::aftimartTrait<ContractState> {
        fn createProfile(ref self: ContractState, Name: felt252, country: felt252, region: felt252, profileImg1: felt252, profileImg2: felt252) {
            let UserId: u256 = self.totalProfiles.read() + 1;
            self.totalProfiles.write(UserId);
            let newUser = userProfile{
                id: UserId, name: Name, 
                address: get_caller_address(),
                region: region,
                country: country,
                profileImg1: profileImg1,
                profileImg2: profileImg2,
                totalItemListed: 0, 
                totalItemsPurchased: 0,
                totalItemsSold: 0,
                isCreated: true,
            };
            self.allProfiles.write(UserId, newUser);
            self.userId.write(get_caller_address() ,UserId);
            self.emit(ProfileCreated{by: get_caller_address(), name: Name, country: country});

        }

        fn listProduct(ref self: ContractState, name: felt252, description: felt252, imageUri1: felt252, imageUri2: felt252, price: u256, amountAvailable: u256, cartegory: cartegory){
            let ItemId: u256 = self.totalItems.read() + 1;
            self.totalItems.write(ItemId);
            let newProduct = Item {
                id: ItemId,
                name: name,
                description: description,
                imageUri1: imageUri1, 
                imageUri2: imageUri2,
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
            self.emit(ProductListed{by: get_caller_address(), name: name, cartegory: cartegory});
        }

        fn editProductDetails(ref self: ContractState, productId: u256, name: felt252, description: felt252, imageUri1: felt252, imageUri2: felt252, price: u256, amountAvailable: u256) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address(), 'CALLER DIDNT LIST ITEM');
            Item.name = name;
            Item.description = description;
            Item.imageUri1 = imageUri1;
            Item.imageUri2 = imageUri2;
            Item.price = price;
            Item.amountAvailable = amountAvailable;

            self.allItems.write(productId,Item);
            self.emit(ProductEditied{by: get_caller_address(), productID: productId});
        }

        fn takeProductOffMarket(ref self: ContractState, productId: u256) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address() || self.adminRight.read(get_caller_address()) == true, 'CALLER DIDNT LIST ITEM');
            Item.offMarket = true;
            self.allItems.write(productId,Item);
            self.emit(productOffMarket{productID: productId, by: get_caller_address()});
        }

        fn purchaseProduct(ref self: ContractState, productId: u256, Amount: u256) {
            self._PurchaseProduct(productId, Amount);
            self.emit(ProductPurchased{by: get_caller_address(), productID: productId})
        }

        fn confirmProductReceived(ref self: ContractState, orderId: u256) {
            let mut order = self.allOrders.read(orderId);
            assert(order.buyer == get_caller_address(), 'NOT RECORDED BUYER');
            order.shipmentStatus = deliveryStatus::PickedUpByBuyer;
            self.emit(ProductReceived{by: get_caller_address(), orderID: orderId});
        }

        fn changeProductCartegory(ref self: ContractState, productId: u256, newCartegory: cartegory) {
            let mut Item = self.allItems.read(productId);
            assert(Item.seller == get_caller_address(), 'CALLER DIDNT LIST ITEM');
            Item.cartegory = newCartegory;
            self.allItems.write(productId,Item);
            self.emit(ProductCartigoryChanged{by: get_caller_address(), productID: productId});
        }

        fn addItemToCart(ref self: ContractState, productId: u256, Amount: u256) {
            let caller = get_caller_address();
            let number = self.noOfProductsInCart.read(caller) + 1;
            let cartPrice = self.cartTotalPrice.read(caller); 
            let productPrice = self._calculateExpenses(productId, Amount);
            self.cartTotalPrice.write(caller, cartPrice + productPrice);
            let item: cartItem = cartItem{itemID: productId, amount: Amount};
            self.noOfProductsInCart.write(caller, number);
            self.allProductsInCart.write((caller, number), item);
            self.getProductInCartIndex.write((caller, productId), number);
            self.emit(ItemAddedToCart{by: caller, productID: productId});
        }

        fn removeItemFromCart(ref self: ContractState, productId: u256) {
            let productNumber = self.getProductInCartIndex.read((get_caller_address(), productId));
            let productAmount = self.allProductsInCart.read((get_caller_address(), productNumber)).amount;
            let currentExpenses = self._calculateExpenses(productId, productAmount);
            let totalExpenses = self.cartTotalPrice.read(get_caller_address());
            assert(productNumber != 0, 'ITEM NOT IN CALLERS CART');
            self._removeItemFromCart(productId, productNumber, get_caller_address());
            self.cartTotalPrice.write(get_caller_address() , totalExpenses - currentExpenses);
            self.emit(ItemRemovedFromCart{by: get_caller_address(), productID: productId});
        }

        fn checkOutCart(ref self: ContractState) {
            let caller = get_caller_address();
            let noOfProducts = self.noOfProductsInCart.read(caller);
            let mut productNumber: u256 = 1;
            loop {
                if productNumber > noOfProducts {
                    break;
                }
                let product = self.allProductsInCart.read((caller, productNumber));
                let currentExpenses = self._calculateExpenses(product.itemID, product.amount);
                let totalExpenses = self.cartTotalPrice.read(get_caller_address());
                self.cartTotalPrice.write(get_caller_address() , totalExpenses - currentExpenses);

                self._PurchaseProduct(product.itemID, product.amount);
                self._removeItemFromCart(product.itemID, productNumber, caller);

                productNumber = productNumber +1;
            };
            self.emit(cartCheckedOut{by: caller});
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
            let mut allOrderId = ArrayTrait::new();
            let mut i: u256 = 1;

            loop {
                if i > numListed {
                    break;
                }
                let product: u256 = self.itemsPurchased.read((user, i));
                allOrderId.append(product);
                i = i + 1;
            };
            return allOrderId;
        }   

        fn getUserProfile(self: @ContractState, user: ContractAddress) -> userProfile {
            let userID = self.userId.read(user);
            assert(userID != 0, 'INVALID USER ADDRESS');
            let userProfile = self.allProfiles.read(userID);
            return userProfile;
        }

        fn getUsersCart(self: @ContractState, user: ContractAddress) -> Array::<cartItem> {
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

        fn getCartValue(self: @ContractState, user: ContractAddress) -> u256 {
            return self.cartTotalPrice.read(user);
        }

        fn listNft(ref self: ContractState, nftContract: ContractAddress, tokenId: u256, data: Span<felt252>, price: u256) {
            let nft: IERC721CamelOnlyDispatcher = IERC721CamelOnlyDispatcher{contract_address: nftContract};
            assert(nft.ownerOf(tokenId) == get_caller_address(), 'NOT TOKEN OWNER');
            nft.safeTransferFrom(get_caller_address(), get_contract_address(), tokenId, data);
            let itemId = self.totalNFTS.read() + 1;
            self.totalNFTS.write(itemId);
            let nftData = nftItem {
                itemID: itemId,
                price: price,
                nftContract: nftContract,
                nftID: tokenId,
                seller: get_caller_address(),
                offMarket: false,
            };
            self.allNFTS.write(itemId, nftData);  
            self.emit(nftListed{by: get_caller_address(), nftID: tokenId, nftContract: nftContract, price: price, itemId: itemId});
        }

        fn buyNft(ref self: ContractState, productId: u256) {
            let caller = get_caller_address();
            let this = get_contract_address();
            let mut nftData = self.allNFTS.read(productId);   
            self.paymentToken.read().transferFrom(caller, this, nftData.price);
            self.nftCashInflow.write(self.nftCashInflow.read() + nftData.price);
            let nftContract = IERC721CamelOnlyDispatcher{contract_address: nftData.nftContract};
            nftContract.transferFrom(this, caller, nftData.nftID);
            nftData.offMarket = true;
            self.allNFTS.write(productId, nftData);
            self.emit(nftPurchased{by: caller, nftID: nftData.nftID, nftContract: nftData.nftContract, price: nftData.price, itemId: productId});
        }

        fn getAllNfts(self: @ContractState) -> Array::<u256> {
            let mut productsNumber: u256 = self.totalNFTS.read();
            let mut allNftId = ArrayTrait::new();
            let mut i:u256 = 1;
            loop {
                if i > productsNumber {
                    break;
                }
                let Nft: nftItem = self.allNFTS.read(i);
                if (Nft.offMarket == false) {
                    allNftId.append(Nft.itemID);
                }
                i = i + 1;
            };
            return allNftId;
        }

        fn getNftDetails(self: @ContractState, productId: u256) -> nftItem {
            let totalNFTS = self.totalNFTS.read();
            assert(totalNFTS >= productId && productId != 0, 'INVALID ORDER ID');
            let nftDetails = self.allNFTS.read(productId);
            return nftDetails;
        }

        fn registerSupplyChainChild(ref self: ContractState, supplyChainChild: ContractAddress) {
            assert( get_caller_address() == self.supplyChainFactory.read(), 'NOT AN AUTHORIZED CALLER');
            self.validSupplyChain.write(supplyChainChild, true);
            self.emit(supplyChainRegistered{by: get_caller_address(), supplyChain: supplyChainChild});
        }

       fn releaseSellersPayment(ref self: ContractState, orderId: u256) {
            assert(self.validSupplyChain.read(get_caller_address()) == true, 'UNAUTHORIZED SUPPLY CHAIN');
            let mut orderDetails = self.allOrders.read(orderId);
            assert(orderDetails.paymentStatus == orderPaymentStatus::paymentWithMarket, 'PAYMENT ALREADY RELEASED');
            orderDetails.paymentStatus = orderPaymentStatus::PaymentReleasedToSeller;
            self.allOrders.write(orderId, orderDetails);
            let productDetails = self.allItems.read(orderDetails.itemID);
            self.paymentToken.read().transfer(productDetails.seller, productDetails.price * orderDetails.amountOfProducts);
            self.pendingPayment.write(self.pendingPayment.read() - productDetails.price * orderDetails.amountOfProducts);
            self.emit(sellersFeeReleased{seller: productDetails.seller, orderId: orderId, supplyChain: get_caller_address(), amount: productDetails.price * orderDetails.amountOfProducts});
       }

       fn getTotalCashInflow(self: @ContractState) -> (u256, u256) {
            let totalProductInflow = self.cashInFlow.read();
            let totalNftInflow = self.nftCashInflow.read();
            return (totalProductInflow, totalNftInflow);
       }

       fn getPendingPayment(self: @ContractState) -> u256 {
            self.pendingPayment.read()
       } 

        fn whitelistAdmin(ref self: ContractState, admin: ContractAddress){
            assert(get_caller_address() == self.Admin.read(), 'NOT ADMIN');
            self.adminRight.write(get_caller_address(), true);
            self.totalAdmins.write(self.totalAdmins.read() + 1);
            self.allAdmins.write(self.totalAdmins.read(), get_caller_address());
        }

        fn revokeAdminRight(ref self: ContractState, admin: ContractAddress) {
            assert(get_caller_address() == self.Admin.read(), 'NOT ADMIN');
            assert(self.adminRight.read(admin) == true, 'ADDRESS NOT AN ADMIN');
            self.adminRight.write(admin, false);
        }

        fn getAdmins(self: @ContractState) -> Array<ContractAddress> {
            let mut adminNumber: u256 = self.totalAdmins.read();
            let mut allAdmins = ArrayTrait::new();
            let mut i:u256 = 1;
            loop {
                if i > adminNumber {
                    break;
                }
                let admin = self.allAdmins.read(i);
                if (self.adminRight.read(admin) == true) {
                    allAdmins.append(admin);
                }
                i = i + 1;
            };
            return allAdmins;
        }

        fn beginProcessingDelivery(ref self: ContractState, orderId: u256) {
            let mut orderDetails = self.allOrders.read(orderId);
            let seller = self.allItems.read(orderDetails.itemID).seller;
            assert(seller == get_caller_address(), 'NOT SELLER');
            assert(orderDetails.processingDelivery == false, 'DELIVERY ALREADY PROCESSED');
            orderDetails.processingDelivery = true;
            self.allOrders.write(orderId, orderDetails);
        }

        fn getItemsSold(self: @ContractState, user: ContractAddress) -> (Array::<u256>, Array::<u256>) {
            let userId = self.userId.read(user);
            let userProfile = self.allProfiles.read(self.userId.read(user));
            let totalSales = userProfile.totalItemsSold;
            let mut i: u256 = 1;
            let mut pendingProcessing = ArrayTrait::new();
            let mut processed = ArrayTrait::new();
            loop {
                if i > totalSales {
                    break;
                }
                let orderId = self.itemsSold.read((user, i));
                let order = self.allOrders.read(orderId);
                if (order.processingDelivery == false) {
                    pendingProcessing.append(orderId);
                } else {
                    processed.append(orderId);
                }
                i = i + 1;
            };
            return (pendingProcessing, processed);
        }

        fn setSupplyChainFactory(ref self: ContractState, supplyChainFactory: ContractAddress) {
            assert(self.adminRight.read(get_caller_address()) == true, 'CALLER DIDNT LIST ITEM');
            self.supplyChainFactory.write(supplyChainFactory);
        }

        fn reEmburse(ref self: ContractState, amount: u256) {
            assert(get_caller_address() == self.Admin.read(), 'NOT ADMIN');
            self.paymentToken.read().transfer(self.Admin.read(), amount);
        }

 
    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn _removeItemFromCart(ref self: ContractState, productId: u256, productNumber: u256, caller: ContractAddress) {
            let noOfLastProduct = self.noOfProductsInCart.read(caller);
            let lastProductId = self.allProductsInCart.read((caller, noOfLastProduct)).itemID;
            let lastProduct = self.allProductsInCart.read((caller, noOfLastProduct));
            self.getProductInCartIndex.write((caller, lastProductId), productNumber);
            self.getProductInCartIndex.write((caller, productId), 0);
            self.noOfProductsInCart.write(caller, noOfLastProduct - 1);
            self.allProductsInCart.write((caller, productNumber), lastProduct);
            self.allProductsInCart.write((caller, noOfLastProduct), cartItem{ itemID: 0, amount: 0});
        }

        fn _PurchaseProduct(ref self: ContractState, productId: u256, Amount: u256) {
            let mut Item = self.allItems.read(productId);
            let totalFee = Amount * Item.price;
            let caller = get_caller_address();
            let this = get_contract_address();
            let callersBalance = self.paymentToken.read().balanceOf(caller);
            assert(callersBalance >= totalFee, 'INSUFFICIENT BALANCE');
            self.paymentToken.read().transferFrom(caller, this, totalFee);
            self.cashInFlow.write(self.cashInFlow.read() + totalFee);
            let orderId = self._recordOrder(Item.id, Amount, caller);
            self._recordUsersPurchase(orderId, caller);
            self._recordSellerSale(orderId, Item.seller);
            self.pendingPayment.write(self.pendingPayment.read() + totalFee);
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
                processingDelivery: false,
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

        fn _calculateExpenses( self: @ContractState, productId: u256, Amount: u256) -> u256 {
            let productPrice = self.allItems.read(productId).price;
            productPrice * Amount
        }
    }

}
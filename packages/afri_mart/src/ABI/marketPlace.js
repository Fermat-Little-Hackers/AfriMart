const marketPlaceAbi = [
  {
    "type": "impl",
    "name": "afrimartExternalImpl",
    "interface_name": "snfoundry::market_place::aftimartTrait"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "snfoundry::market_place::cartegory",
    "variants": [
      {
        "name": "Agriculture",
        "type": "()"
      },
      {
        "name": "TextileAndClothings",
        "type": "()"
      },
      {
        "name": "Accesories",
        "type": "()"
      },
      {
        "name": "ToolsAndEquipments",
        "type": "()"
      },
      {
        "name": "DigitalArts",
        "type": "()"
      },
      {
        "name": "PhysicalArtsNDSculptures",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "snfoundry::market_place::Item",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "name": "name",
        "type": "core::felt252"
      },
      {
        "name": "description",
        "type": "core::felt252"
      },
      {
        "name": "imageUri1",
        "type": "core::felt252"
      },
      {
        "name": "imageUri2",
        "type": "core::felt252"
      },
      {
        "name": "price",
        "type": "core::integer::u256"
      },
      {
        "name": "cartegory",
        "type": "snfoundry::market_place::cartegory"
      },
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "amountAvailable",
        "type": "core::integer::u256"
      },
      {
        "name": "totalSales",
        "type": "core::integer::u256"
      },
      {
        "name": "offMarket",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "snfoundry::market_place::userProfile",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "name": "name",
        "type": "core::felt252"
      },
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "region",
        "type": "core::felt252"
      },
      {
        "name": "country",
        "type": "core::felt252"
      },
      {
        "name": "profileImg1",
        "type": "core::felt252"
      },
      {
        "name": "profileImg2",
        "type": "core::felt252"
      },
      {
        "name": "totalItemListed",
        "type": "core::integer::u256"
      },
      {
        "name": "totalItemsPurchased",
        "type": "core::integer::u256"
      },
      {
        "name": "totalItemsSold",
        "type": "core::integer::u256"
      },
      {
        "name": "isCreated",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "snfoundry::market_place::cartItem",
    "members": [
      {
        "name": "itemID",
        "type": "core::integer::u256"
      },
      {
        "name": "amount",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "type": "enum",
    "name": "snfoundry::market_place::orderPaymentStatus",
    "variants": [
      {
        "name": "paymentWithMarket",
        "type": "()"
      },
      {
        "name": "PaymentReleasedToSeller",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "snfoundry::market_place::deliveryStatus",
    "variants": [
      {
        "name": "awaitingReleaseFromSeller",
        "type": "()"
      },
      {
        "name": "submitedForDelivery",
        "type": "()"
      },
      {
        "name": "DepartedFromOrigin",
        "type": "()"
      },
      {
        "name": "ArrivedDestination",
        "type": "()"
      },
      {
        "name": "PickedUpByBuyer",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "snfoundry::market_place::order",
    "members": [
      {
        "name": "itemID",
        "type": "core::integer::u256"
      },
      {
        "name": "orderId",
        "type": "core::integer::u256"
      },
      {
        "name": "amountOfProducts",
        "type": "core::integer::u256"
      },
      {
        "name": "buyer",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "paymentTime",
        "type": "core::integer::u64"
      },
      {
        "name": "paymentStatus",
        "type": "snfoundry::market_place::orderPaymentStatus"
      },
      {
        "name": "shipmentStatus",
        "type": "snfoundry::market_place::deliveryStatus"
      },
      {
        "name": "processingDelivery",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "snfoundry::market_place::nftItem",
    "members": [
      {
        "name": "itemID",
        "type": "core::integer::u256"
      },
      {
        "name": "price",
        "type": "core::integer::u256"
      },
      {
        "name": "nftContract",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "nftID",
        "type": "core::integer::u256"
      },
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "offMarket",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "interface",
    "name": "snfoundry::market_place::aftimartTrait",
    "items": [
      {
        "type": "function",
        "name": "createProfile",
        "inputs": [
          {
            "name": "Name",
            "type": "core::felt252"
          },
          {
            "name": "country",
            "type": "core::felt252"
          },
          {
            "name": "region",
            "type": "core::felt252"
          },
          {
            "name": "profileImg1",
            "type": "core::felt252"
          },
          {
            "name": "profileImg2",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "listProduct",
        "inputs": [
          {
            "name": "name",
            "type": "core::felt252"
          },
          {
            "name": "description",
            "type": "core::felt252"
          },
          {
            "name": "imageUri1",
            "type": "core::felt252"
          },
          {
            "name": "imageUri2",
            "type": "core::felt252"
          },
          {
            "name": "price",
            "type": "core::integer::u256"
          },
          {
            "name": "amountAvailable",
            "type": "core::integer::u256"
          },
          {
            "name": "cartegory",
            "type": "snfoundry::market_place::cartegory"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "editProductDetails",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          },
          {
            "name": "name",
            "type": "core::felt252"
          },
          {
            "name": "description",
            "type": "core::felt252"
          },
          {
            "name": "imageUri1",
            "type": "core::felt252"
          },
          {
            "name": "imageUri2",
            "type": "core::felt252"
          },
          {
            "name": "price",
            "type": "core::integer::u256"
          },
          {
            "name": "amountAvailable",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "takeProductOffMarket",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "purchaseProduct",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          },
          {
            "name": "Amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "confirmProductReceived",
        "inputs": [
          {
            "name": "orderId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "changeProductCartegory",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          },
          {
            "name": "newCartegory",
            "type": "snfoundry::market_place::cartegory"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "addItemToCart",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          },
          {
            "name": "Amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "removeItemFromCart",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "checkOutCart",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getAllProducts",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getProductsByCategory",
        "inputs": [
          {
            "name": "cartegory",
            "type": "snfoundry::market_place::cartegory"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getProductDetails",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "snfoundry::market_place::Item"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getProductsListedByUser",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "viewer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getProductsBoughtByUser",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "viewer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getUserProfile",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "snfoundry::market_place::userProfile"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getUsersCart",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<snfoundry::market_place::cartItem>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getOrderDetails",
        "inputs": [
          {
            "name": "orderId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "snfoundry::market_place::order"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getCartValue",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "listNft",
        "inputs": [
          {
            "name": "nftContract",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          },
          {
            "name": "price",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "buyNft",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getAllNfts",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getNftDetails",
        "inputs": [
          {
            "name": "productId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "snfoundry::market_place::nftItem"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "registerSupplyChainChild",
        "inputs": [
          {
            "name": "supplyChainChild",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "releaseSellersPayment",
        "inputs": [
          {
            "name": "orderId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getTotalCashInflow",
        "inputs": [],
        "outputs": [
          {
            "type": "(core::integer::u256, core::integer::u256)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getPendingPayment",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getItemsSold",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "whitelistAdmin",
        "inputs": [
          {
            "name": "admin",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getAdmins",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "revokeAdminRight",
        "inputs": [
          {
            "name": "admin",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "beginProcessingDelivery",
        "inputs": [
          {
            "name": "orderId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "setSupplyChainFactory",
        "inputs": [
          {
            "name": "supplyChainFactory",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "reEmburse",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getPendingDelivery",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "_Admin",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "paymentTokenAdd",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "supplyChainFactory",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProfileCreated",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "name",
        "type": "core::felt252",
        "kind": "key"
      },
      {
        "name": "country",
        "type": "core::felt252",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProductListed",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "name",
        "type": "core::felt252",
        "kind": "key"
      },
      {
        "name": "cartegory",
        "type": "snfoundry::market_place::cartegory",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProductEditied",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::productOffMarket",
    "kind": "struct",
    "members": [
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProductPurchased",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProductReceived",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "orderID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ProductCartigoryChanged",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ItemAddedToCart",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::ItemRemovedFromCart",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "productID",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::cartCheckedOut",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::nftListed",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "nftID",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "nftContract",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "price",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "itemId",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::nftPurchased",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "nftID",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "nftContract",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "price",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "itemId",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::supplyChainRegistered",
    "kind": "struct",
    "members": [
      {
        "name": "by",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "supplyChain",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::sellersFeeReleased",
    "kind": "struct",
    "members": [
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "orderId",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "supplyChain",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "amount",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "snfoundry::market_place::afrimart::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ProfileCreated",
        "type": "snfoundry::market_place::afrimart::ProfileCreated",
        "kind": "nested"
      },
      {
        "name": "ProductListed",
        "type": "snfoundry::market_place::afrimart::ProductListed",
        "kind": "nested"
      },
      {
        "name": "ProductEditied",
        "type": "snfoundry::market_place::afrimart::ProductEditied",
        "kind": "nested"
      },
      {
        "name": "productOffMarket",
        "type": "snfoundry::market_place::afrimart::productOffMarket",
        "kind": "nested"
      },
      {
        "name": "ProductPurchased",
        "type": "snfoundry::market_place::afrimart::ProductPurchased",
        "kind": "nested"
      },
      {
        "name": "ProductReceived",
        "type": "snfoundry::market_place::afrimart::ProductReceived",
        "kind": "nested"
      },
      {
        "name": "ProductCartigoryChanged",
        "type": "snfoundry::market_place::afrimart::ProductCartigoryChanged",
        "kind": "nested"
      },
      {
        "name": "ItemAddedToCart",
        "type": "snfoundry::market_place::afrimart::ItemAddedToCart",
        "kind": "nested"
      },
      {
        "name": "ItemRemovedFromCart",
        "type": "snfoundry::market_place::afrimart::ItemRemovedFromCart",
        "kind": "nested"
      },
      {
        "name": "cartCheckedOut",
        "type": "snfoundry::market_place::afrimart::cartCheckedOut",
        "kind": "nested"
      },
      {
        "name": "nftListed",
        "type": "snfoundry::market_place::afrimart::nftListed",
        "kind": "nested"
      },
      {
        "name": "nftPurchased",
        "type": "snfoundry::market_place::afrimart::nftPurchased",
        "kind": "nested"
      },
      {
        "name": "supplyChainRegistered",
        "type": "snfoundry::market_place::afrimart::supplyChainRegistered",
        "kind": "nested"
      },
      {
        "name": "sellersFeeReleased",
        "type": "snfoundry::market_place::afrimart::sellersFeeReleased",
        "kind": "nested"
      }
    ]
  }
]
export default marketPlaceAbi;
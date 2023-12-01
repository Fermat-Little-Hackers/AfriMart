use starknet::ContractAddress;

#[starknet::interface]
trait IERC20Starknet<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> u8;
    fn total_Supply(self: @TContractState) -> u256;
    fn balance_of(self: @TContractState, user_address: ContractAddress) -> u256;
     fn allowance(self:@TContractState, user_address:ContractAddress, allowed_adddress:ContractAddress)->u256;
    fn transfer(ref self: TContractState, to_address: ContractAddress, value: u256) -> bool;
    fn transfer_from(
        ref self: TContractState,
        from_address: ContractAddress,
        to_address: ContractAddress,
        value: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender_address: ContractAddress, value: u256) -> bool;
    fn increase_allowance(
        ref self: TContractState, spender_address: ContractAddress, value: u256
    ) -> bool ;
    fn decrease_allowance(
        ref self: TContractState, spender_address: ContractAddress, value: u256
    ) -> bool;
       fn burn(ref self: TContractState, value: u256) -> bool ;

    fn mintT(ref self: TContractState, value: u256) -> bool;
}

#[starknet::contract]
mod PaymentToken {
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use starknet::contract_address::ContractAddressZeroable;


    #[storage]
    struct Storage {
        balances: LegacyMap::<ContractAddress, u256>,
        allowed: LegacyMap::<(ContractAddress, ContractAddress), u256>,
        total_supply: u256,
        name: felt252,
        symbol: felt252,
        decimals: u8,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Transfer: Transfer,
        Approval: Approval,
    }

    #[derive(Drop, starknet::Event)]
    struct Transfer {
        from_address: ContractAddress,
        to_address: ContractAddress,
        value: u256
    }
    #[derive(Drop, starknet::Event)]
    struct Approval {
        owner_address: ContractAddress,
        spender_address: ContractAddress,
        value: u256
    }


    #[constructor]
    fn constructor(
        ref self: ContractState,
        _total_supply: u256,
        _name: felt252, 
        _decimals: u8,
        _symbol: felt252,
        _amount: u256
    ) {
        let caller = get_caller_address();
        self.total_supply.write(_total_supply);
        self.name.write(_name);
        self.decimals.write(_decimals);
        self.symbol.write(_symbol);
        self._mint(caller, _amount);
    }
    #[external(v0)]
    impl ERC20StarknetImpl of super::IERC20Starknet<ContractState> {
        fn name(self: @ContractState) -> felt252 {
            self.name.read()
        }
        fn symbol(self: @ContractState) -> felt252 {
            self.symbol.read()
        }
        fn decimals(self: @ContractState) -> u8 {
            self.decimals.read()
        }
        fn total_Supply(self: @ContractState) -> u256 {
            self.total_supply.read()
        }
        fn balance_of(self: @ContractState, user_address: ContractAddress) -> u256 {
            self.balances.read(user_address)
        }
        fn allowance(self:@ContractState, user_address:ContractAddress, allowed_adddress:ContractAddress)->u256{

        self.allowed.read((user_address, allowed_adddress))
        }

        fn transfer(ref self: ContractState, to_address: ContractAddress, value: u256) -> bool {
            let caller = get_caller_address();
            // let address0 = ContractAddressZeroable();
            assert(self.balances.read(caller) >= value, 'insufficient amount');
            assert(!to_address.is_zero(), 'zero address');
            self.balances.write(caller, self.balances.read(caller) - value);
            self.balances.write(to_address, self.balances.read(to_address) + value);
            self.emit(Transfer { from_address: caller, to_address: to_address, value: value });
            true
        }
        fn transfer_from(
            ref self: ContractState,
            from_address: ContractAddress,
            to_address: ContractAddress,
            value: u256
        ) -> bool {
            let caller = get_caller_address();
            assert(self.balances.read(from_address) >= value, 'Insufficient balance');
            assert(self.allowed.read((from_address, caller)) >= value, 'insufficient allowance');
            self
                .allowed
                .write((from_address, caller), self.allowed.read((from_address, caller)) - value);
            self.balances.write(from_address, self.balances.read(from_address) - value);
            self.balances.write(to_address, self.balances.read(to_address) + value);
            self
                .emit(
                    Transfer { from_address: from_address, to_address: to_address, value: value }
                );
            true
        }
        fn approve(ref self: ContractState, spender_address: ContractAddress, value: u256) -> bool {
            let caller = get_caller_address();
            assert(!spender_address.is_zero(), 'zero address');

            self
                .allowed
                .write(
                    (caller, spender_address), self.allowed.read((caller, spender_address)) + value
                );
            self
                .emit(
                    Approval {
                        owner_address: caller, spender_address: spender_address, value: value
                    }
                );
            true
        }

         fn increase_allowance(
        ref self: ContractState, spender_address: ContractAddress, value: u256
    ) -> bool {
        let caller = get_caller_address();

        assert(!spender_address.is_zero(), 'zero address');
        self
            .allowed
            .write((caller, spender_address), self.allowed.read((caller, spender_address)) + value);
        self
            .emit(
                Approval { owner_address: caller, spender_address: spender_address, value: value }
            );
        true
    }

  
    fn decrease_allowance(
        ref self: ContractState, spender_address: ContractAddress, value: u256
    ) -> bool {
        let caller = get_caller_address();
        assert(!spender_address.is_zero(), 'zero address');
        self
            .allowed
            .write((caller, spender_address), self.allowed.read((caller, spender_address)) - value);
        self
            .emit(
                Approval { owner_address: caller, spender_address: spender_address, value: value }
            );
        true
    }
   
    fn burn(ref self: ContractState, value: u256) -> bool {
        let caller = get_caller_address();
        self._burn(caller, value);
        true
    }

    fn mintT(ref self: ContractState, value: u256) -> bool {
        let caller = get_caller_address();
            self._mint(caller, value);
        true
    }
    }
    #[generate_trait]
    impl Private of PrivateTrait {
        fn _burn(ref self: ContractState, from_address: ContractAddress, value: u256) {
            let Address0: ContractAddress = 0.try_into().unwrap();
            assert(!from_address.is_zero(), 'zero address');
            assert(self.balances.read(from_address) >= value, 'insufficient fund');
            self.balances.write(from_address, self.balances.read(from_address) - value);
            self.total_supply.write(self.total_supply.read() - value);
            self.emit(Transfer { from_address: from_address, to_address: Address0, value: value });
        }

        fn _mint(ref self: ContractState, owner: ContractAddress, value: u256) {
            let addr = get_contract_address();
            assert(!owner.is_zero(), 'zero address');
            let mybalance = self.balances.read(owner);
            self.balances.write(owner, (mybalance + value));
            self.emit(Transfer { from_address: addr, to_address: owner, value: value, });
        }
    }
}
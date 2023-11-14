#[starknet::interface]
trait ISupplyChain<TContractState> {
    fn dothis();  
}

#[starknet::contract]
mod SupplyChain {
    #[storage]
    struct Storage {
    }
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

}
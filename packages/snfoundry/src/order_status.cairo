#[derive(Copy, Drop, starknet::Store, Serde)]
enum OrderStatus{
    Processing,
    Shipped,
    Arrived,
    Enroute,
    Delivered,
    Canceled,
}
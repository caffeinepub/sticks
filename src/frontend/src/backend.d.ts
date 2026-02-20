import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type RoomNumber = string;
export interface StockItem {
    inStock: boolean;
    product: Product;
}
export type Time = bigint;
export type CustomerId = Principal;
export type Quantity = bigint;
export type ProductId = bigint;
export type ProductName = string;
export interface Order {
    isCompleted: boolean;
    customer: CustomerId;
    roomNumber: RoomNumber;
    timestamp: Time;
    quantity: Quantity;
    products: Array<Product>;
}
export interface Product {
    id: ProductId;
    name: ProductName;
}
export type OrderId = bigint;
export interface backendInterface {
    addOrUpdateStockItem(product: Product, inStock: boolean): Promise<void>;
    completeOrder(orderId: OrderId): Promise<OrderId>;
    getAllCurrentOrders(): Promise<Array<Order>>;
    getAllStockItems(): Promise<Array<StockItem>>;
    getOrder(orderId: OrderId): Promise<Order>;
    getStockStatus(productId: ProductId): Promise<boolean>;
    placeOrder(products: Array<Product>, quantity: Quantity, roomNumber: RoomNumber): Promise<OrderId>;
}

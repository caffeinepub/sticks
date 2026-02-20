import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type OrderId = bigint;
export interface StockItem {
    inStock: boolean;
    product: Product;
}
export type Time = bigint;
export type RoomNumber = string;
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
export interface UserProfile {
    name: string;
    roomNumber?: string;
}
export interface Product {
    id: ProductId;
    name: ProductName;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateStockItem(product: Product, inStock: boolean): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeOrder(orderId: OrderId): Promise<OrderId>;
    getAllCurrentOrders(): Promise<Array<Order>>;
    getAllStockItems(): Promise<Array<StockItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(orderId: OrderId): Promise<Order>;
    getStockStatus(productId: ProductId): Promise<boolean>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(products: Array<Product>, quantity: Quantity, roomNumber: RoomNumber): Promise<OrderId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}

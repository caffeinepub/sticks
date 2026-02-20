import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
    roomNumber : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Room Service Ordering System
  public type ProductId = Nat;
  public type ProductName = Text;
  public type CustomerId = Principal;
  public type Quantity = Nat;
  public type RoomNumber = Text;
  public type OrderId = Nat;

  public type Product = {
    id : ProductId;
    name : ProductName;
  };

  public type Order = {
    quantity : Quantity;
    roomNumber : RoomNumber;
    products : [Product];
    customer : CustomerId;
    timestamp : Time.Time;
    isCompleted : Bool;
  };

  public type StockItem = {
    product : Product;
    inStock : Bool;
  };

  let orders = Map.empty<OrderId, Order>();
  let stockItems = Map.empty<ProductId, StockItem>();

  var currentOrderId = 0;

  public shared ({ caller }) func placeOrder(products : [Product], quantity : Quantity, roomNumber : RoomNumber) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    if (products.size() == 0) { Runtime.trap("No products selected for order") };
    if (quantity <= 0) { Runtime.trap("Quantity must be greater than zero") };
    if (isAnyProductOutOfStock(products)) { Runtime.trap("One or more products are out of stock") };

    let order : Order = {
      quantity;
      roomNumber;
      products;
      customer = caller;
      timestamp = Time.now();
      isCompleted = false;
    };

    orders.add(currentOrderId, order);
    let orderId = currentOrderId;
    currentOrderId += 1;
    orderId;
  };

  func isAnyProductOutOfStock(products : [Product]) : Bool {
    products.values().any(func(product) { isProductOutOfStock(product.id) });
  };

  func isProductOutOfStock(productId : ProductId) : Bool {
    switch (stockItems.get(productId)) {
      case (?stockItem) { not stockItem.inStock };
      case (null) { Runtime.trap("Product not found in stock") };
    };
  };

  public query ({ caller }) func getOrder(orderId : OrderId) : async Order {
    switch (orders.get(orderId)) {
      case (?order) {
        // Users can only view their own orders, admins can view all
        if (caller != order.customer and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
      case (null) { Runtime.trap("Order does not exist") };
    };
  };

  public query ({ caller }) func getAllCurrentOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public shared ({ caller }) func completeOrder(orderId : OrderId) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can complete orders");
    };
    switch (orders.get(orderId)) {
      case (?order) {
        let updatedOrder = { order with isCompleted = true };
        orders.add(orderId, updatedOrder);
        orderId;
      };
      case (null) { Runtime.trap("Order not found") };
    };
  };

  public shared ({ caller }) func addOrUpdateStockItem(product : Product, inStock : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage stock items");
    };
    let stockItem : StockItem = {
      product;
      inStock;
    };
    stockItems.add(product.id, stockItem);
  };

  public query ({ caller }) func getStockStatus(productId : ProductId) : async Bool {
    // Public function - guests can check stock status
    switch (stockItems.get(productId)) {
      case (?stockItem) { stockItem.inStock };
      case (null) { Runtime.trap("Product not found in stock") };
    };
  };

  public query ({ caller }) func getAllStockItems() : async [StockItem] {
    // Public function - guests can browse available items
    stockItems.values().toArray();
  };
};

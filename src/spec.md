# Specification

## Summary
**Goal:** Build StickSmart, a dual-portal ordering system where customers can order sticks with Internet Identity authentication and sellers can manage orders and stock availability with email/password authentication.

**Planned changes:**
- Implement customer authentication using Internet Identity
- Implement seller authentication using email and password
- Create customer order form with quantity dropdown, room number input, and dynamic price calculation (14 rupees per stick)
- Build backend order management system storing quantity, room number, timestamp, customer identity, and completion status
- Create seller dashboard displaying orders sorted by latest first with quantity, room number, and timestamp
- Add stock management feature allowing sellers to mark items as out of stock, displaying red indicator on customer page and disabling orders
- Implement order completion tracking with tick/checkbox functionality for sellers
- Design interface with warm, earthy color palette (terracotta, amber, sage green) and clean, minimal layout

**User-visible outcome:** Customers can sign in with Internet Identity, view stock status, and place orders for sticks with automatic total calculation. Sellers can sign in with email/password, view all incoming orders sorted by recency, mark stock as in/out, and tick off completed orders.

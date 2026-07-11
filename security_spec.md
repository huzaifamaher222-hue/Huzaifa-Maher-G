# Security Specification: Order Collection Protection

## 1. Data Invariants
- An order document can only be created with an ID starting with `SSW-`.
- Document structures must conform exactly to the schema in `firebase-blueprint.json` (no undocumented keys permitted on create).
- Order statuses can only transition inside the valid states: `["Pending", "Shipped", "Delivered", "Cancelled"]`.
- The `createdAt` timestamp must match the exact time of transaction.
- Standard clients are not authorized to delete orders; deletion is strictly administrative.

## 2. The "Dirty Dozen" Malicious Payloads
Here are the 12 malicious payloads designed to breach the system, which will be blocked by our Firestore Security Rules:

1. **Privilege Escalation**: Attempting to create an order document with a spoofed system administrator role field.
2. **Key Poisoning / Shadow Fields**: Adding a custom `isApprovedByMerchant: true` field during a client order submit.
3. **Identity Spoofing**: Attempting to set someone else's verified email/identifier.
4. **Denial of Wallet (String Bloating)**: Submitting a customer name string longer than 100 characters.
5. **Denial of Wallet (ID Bloating)**: Attempting to create a document with an ID longer than 128 characters or containing illegal characters.
6. **State Hijacking**: Creating a new order already marked as `Delivered` instead of starting as `Pending`.
7. **Bypassing Required Fields**: Creating an order without the required `phone` or `address` field.
8. **Invalid Formatting (Regex Bypass)**: Placing an order where the phone number is text/junk characters.
9. **Price Modification**: Setting `totalPrice: -100` or `0` on a multi-item purchase.
10. **Temporal Forgery**: Setting `createdAt` to a custom date in the future or past instead of the true server time.
11. **Malicious State Transition**: Updating an order status from `Cancelled` or `Delivered` back to `Pending` to re-trigger shipping sequences.
12. **Unauthorized Mass Harvesting**: Querying the full list of orders without specifying any client credentials or limits.

## 3. Mock Test Cases
The security configuration will reject each of the above malicious writes with a `PERMISSION_DENIED` response, ensuring total system integrity.

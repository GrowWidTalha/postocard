⏳ Pending / Fixes
Fix the Design Creation Process

 Review & Debug Flow:
Ensure that the design creation form handles all fields correctly (including new schema fields such as pdfUploadId and thumbnailUploadId).
 Validation:
Add/update validations (e.g., file type, size, and required fields) to avoid broken submissions.
 UI/UX Enhancements:
Polish the user flow to make design creation intuitive and error-free.
Fix the UploadThing ID Population in the Design Form

 API Integration Check:
Verify that upon file upload the UploadThing API response is correctly parsed and mapped to the corresponding fields (pdfUploadId and thumbnailUploadId).
 Error Handling:
Implement error messaging or fallback behaviors in case the UploadThing API call fails.
 Testing:
Confirm through unit/integration tests that file uploads populate the database fields as expected.
Additional Enhancements in the Admin Dashboard (Future Tasks)

 Advanced Analytics:
Expand reporting features (e.g., detailed sales metrics, popular design trends).
 Communication Tools:
Enhance tools for communicating with printing partners and designers (e.g., in-dashboard notifications or messaging).
 Inventory & Order Tracking:
Further refine the inventory management and order tracking modules to improve clarity and usability.
 Guest Checkout Management:
Ensure guest orders (using guestEmail) are correctly displayed and managed in the admin dashboard.

# 📸 Screenshots & Proof of Concept Guide

## How to Capture and Add Screenshots

This directory contains screenshots demonstrating the e-commerce application in action.

### Screenshots to Capture

#### Frontend Screenshots

1. **Login Page** (`01-login.svg`)
   - Path: http://localhost:4200/auth/login
   - Shows: Email/password login form, validation messages
   - Command: `npm start` then take screenshot

2. **Registration Page** (`02-register.svg`)
   - Path: http://localhost:4200/auth/register
   - Shows: Registration form with all fields
   - Command: Click "Create one" from login page

3. **Home Page** (`03-home.svg`)
   - Path: http://localhost:4200
   - Shows: Hero section, featured products
   - Command: Login or access without auth

4. **Products Catalog** (`04-products.svg`)
   - Path: http://localhost:4200/products
   - Shows: Product list, search, filters, pagination
   - Command: Click "Shop" in navbar

5. **Product Detail** (`05-product-detail.svg`)
   - Path: http://localhost:4200/products/{productId}
   - Shows: Product details, reviews, add to cart button
   - Command: Click any product card

6. **Shopping Cart** (`06-cart.svg`)
   - Path: http://localhost:4200/cart
   - Shows: Cart items, quantities, total price
   - Command: Add items then click cart icon

7. **Checkout Page** (`07-checkout.svg`)
   - Path: http://localhost:4200/checkout
   - Shows: Shipping address, payment options, order summary
   - Command: Click "Proceed to Checkout"

8. **Order Confirmation** (`08-order-confirmation.svg`)
   - Path: http://localhost:4200/orders/{orderId}
   - Shows: Order details, tracking number, status
   - Command: Complete checkout

9. **Order History** (`09-order-history.svg`)
   - Path: http://localhost:4200/orders
   - Shows: List of user's orders with status
   - Command: Click "Orders" in navbar

10. **Admin Dashboard** (`10-admin-dashboard.svg`)
    - Path: http://localhost:4200/admin
    - Shows: Admin overview, stats
    - Command: Login as admin (admin@example.com), click "Admin"

11. **Admin Products** (`11-admin-products.svg`)
    - Path: http://localhost:4200/admin/products
    - Shows: Product management, add/edit/delete
    - Command: In admin, click "Products"

12. **Responsive Mobile** (`12-mobile-responsive.svg`)
    - Path: Use Chrome DevTools mobile view
    - Shows: Mobile layout on 375px width
    - Command: F12 → Toggle device toolbar

#### Backend Screenshots

13. **API Test - Login** (`13-api-login.svg`)
    - Tool: Postman or cURL
    - Shows: POST /api/auth/login with response
    - Command: `curl -X POST http://localhost:3000/api/auth/login ...`

14. **API Test - Get Products** (`14-api-products.svg`)
    - Tool: Postman or Browser
    - Shows: GET /api/products with product list
    - Command: Visit http://localhost:3000/api/products

15. **Docker Containers Running** (`15-docker-running.svg`)
    - Tool: Terminal
    - Shows: `docker-compose ps` output
    - Command: `docker-compose ps`

#### Database Screenshots

16. **MongoDB Data** (`16-mongodb-data.svg`)
    - Tool: MongoDB Compass or mongosh
    - Shows: Collections and sample data
    - Command: `docker-compose exec mongodb mongosh`

### How to Capture Screenshots

#### Option 1: Using Browser DevTools
```bash
# Start your application
docker-compose up
# or
npm run dev  # backend
npm start    # frontend

# Open browser and navigate to page
# Press F12 to open DevTools
# Click the camera icon or Ctrl+Shift+P → "Capture screenshot"
```

#### Option 2: Using Built-in OS Tools

**Windows (Snipping Tool)**
- Press `Win + Shift + S`
- Select area to capture
- Save as PNG

**Mac (Screenshot)**
- Press `Cmd + Shift + 4`
- Select area to capture
- File saved to Desktop

**Linux (Screenshot)**
- Use `gnome-screenshot` or `scrot`
```bash
# Full screen
scrot screenshot.png

# Selected area
scrot -s screenshot.png
```

#### Option 3: Using Playwright/Selenium (Automated)
```javascript
// Example with Playwright
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4200');
await page.screenshot({ path: '01-home.png' });
await browser.close();
```

### Directory Structure

```
docs/screenshots/
├── SCREENSHOTS_GUIDE.md           # This file
├── frontend/
│   ├── 01-login.svg
│   ├── 02-register.svg
│   ├── 03-home.svg
│   ├── 04-products.svg
│   ├── 05-product-detail.svg
│   ├── 06-cart.svg
│   ├── 07-checkout.svg
│   ├── 08-order-confirmation.svg
│   ├── 09-order-history.svg
│   ├── 10-admin-dashboard.svg
│   ├── 11-admin-products.svg
│   └── 12-mobile-responsive.svg
├── backend/
│   ├── 13-api-login.svg
│   ├── 14-api-products.svg
│   └── 15-docker-running.svg
└── database/
   └── 16-mongodb-data.svg
```

### Adding Screenshots to README

After capturing, add to README with this format:

```markdown
### Screenshot: Login Page
![Login Page](docs/screenshots/frontend/01-login.svg)
*User login page with email and password fields*

### Screenshot: Product Catalog
![Products](docs/screenshots/frontend/04-products.svg)
*Product listing with search and filter functionality*
```

### Best Practices for Screenshots

✅ **Do:**
- Capture at standard resolution (1920x1080)
- Show realistic data/content
- Include cursor/interactions when relevant
- Add descriptive captions
- Compress images (use PNG format)
- Remove sensitive data

❌ **Don't:**
- Screenshot with personal information visible
- Use low resolution/blurry images
- Include unnecessary UI elements
- Add watermarks
- Screenshot test/debug data

### Tools Recommended

- **Postman** - API testing with screenshots
- **MongoDB Compass** - Database visualization
- **Chrome DevTools** - Frontend debugging
- **docker-compose ps** - Infrastructure verification
- **Figma** - Design mockups (optional)

### Next Steps

1. Run the application (`docker-compose up`)
2. Capture each screenshot listed above
3. Place in appropriate subdirectory
4. Update README and docs with screenshot references
5. Commit to version control

---

For more details, see [README.md](../README.md)

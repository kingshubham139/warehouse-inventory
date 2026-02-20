# 📦 Warehouse Inventory Manager

A clean, fast React app to track items across multiple warehouses — built for the RastaaAI internship assignment.

---

## Features

- ✅ **Add** inventory items with full form validation
- ✅ **View all items** in a searchable, filterable table
- ✅ **Edit** any item (pre-filled form, quantity updates, etc.)
- ✅ **Delete** items with a confirmation modal
- ✅ **Low stock highlight** — items with qty < 5 are visually flagged
- ✅ **Auto-calculated fields** — ID, stock status, last updated date
- ✅ **LocalStorage persistence** — data survives page refresh
- ✅ **React Router** — `/`, `/add`, `/edit/:id`
- ✅ **Responsive** — works on mobile, tablet & desktop
- ✅ **Toast notifications** — instant feedback on every action

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI library |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Browser LocalStorage | Data persistence |
| CSS Custom Properties | Theming & design tokens |

---

## Project Structure

```
warehouse-inventory/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx            # Entry point
    ├── App.jsx             # Root component, routing, shared state
    ├── index.css           # Global styles + design system
    ├── components/
    │   ├── Navbar.jsx          # Top nav with route links
    │   ├── InventoryTable.jsx  # Main data table
    │   ├── SearchFilter.jsx    # Search bar + dropdowns
    │   ├── StatsBar.jsx        # Summary stats cards
    │   ├── ItemForm.jsx        # Reusable form (add + edit)
    │   ├── ConfirmModal.jsx    # Delete confirmation dialog
    │   └── Toast.jsx           # Toast notification system
    ├── pages/
    │   ├── Home.jsx            # / — inventory list
    │   ├── AddItem.jsx         # /add — add new item
    │   └── EditItem.jsx        # /edit/:id — edit existing item
    └── utils/
        └── localStorage.js     # All data logic + LS operations
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/warehouse-inventory.git
cd warehouse-inventory

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder, ready to deploy.

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Connect repo at netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`

> **Important for Netlify:** Add a `_redirects` file inside `public/` with:
> ```
> /*  /index.html  200
> ```
> This ensures React Router works correctly on page refresh.

---

## Data Schema

Each inventory item has this shape:

```js
{
  id: "INV-001",          // Auto-generated unique ID
  name: "Packing Tape",   // Required text
  category: "Packaging",  // Electronics | Groceries | Clothing | Packaging | Other
  quantity: 42,           // Integer ≥ 0
  warehouse: "Warehouse A", // Warehouse A | B | C
  status: "In Stock",     // Auto: "In Stock" (qty > 0) or "Out of Stock" (qty = 0)
  lastUpdated: "2025-01-15" // Auto-set to today's date on add/edit
}
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| Item Name | Required, cannot be blank |
| Category | Must select from dropdown |
| Quantity | Required, must be whole number ≥ 0 |
| Warehouse | Must select from dropdown |

---

## Live Demo

🔗 [View Live App](YOUR_LIVE_URL_HERE)

🐙 [GitHub Repository](YOUR_GITHUB_URL_HERE)

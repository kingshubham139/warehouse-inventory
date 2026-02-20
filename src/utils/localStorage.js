// ============================================================
//  localStorage utilities for Warehouse Inventory Manager
// ============================================================

const STORAGE_KEY = 'warehouse_inventory_items'

/** Generate a unique item ID like INV-001 */
export function generateId(items) {
  if (!items || items.length === 0) return 'INV-001'
  // Find highest existing numeric suffix
  const nums = items
    .map((item) => {
      const match = item.id.match(/^INV-(\d+)$/)
      return match ? parseInt(match[1], 10) : 0
    })
    .filter((n) => !isNaN(n))
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1
  return `INV-${String(next).padStart(3, '0')}`
}

/** Calculate stock status from quantity */
export function calcStatus(qty) {
  return Number(qty) > 0 ? 'In Stock' : 'Out of Stock'
}

/** Format date as YYYY-MM-DD */
export function today() {
  return new Date().toISOString().slice(0, 10)
}

/** Load all items from localStorage */
export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Save all items to localStorage */
export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('Failed to save to localStorage', e)
  }
}

/** Add a new item */
export function addItem(items, formData) {
  const newItem = {
    id: generateId(items),
    name: formData.name.trim(),
    category: formData.category,
    quantity: Number(formData.quantity),
    warehouse: formData.warehouse,
    status: calcStatus(formData.quantity),
    lastUpdated: today(),
  }
  const updated = [...items, newItem]
  saveItems(updated)
  return updated
}

/** Update an existing item by id */
export function updateItem(items, id, formData) {
  const updated = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name: formData.name.trim(),
          category: formData.category,
          quantity: Number(formData.quantity),
          warehouse: formData.warehouse,
          status: calcStatus(formData.quantity),
          lastUpdated: today(),
        }
      : item
  )
  saveItems(updated)
  return updated
}

/** Delete an item by id */
export function deleteItem(items, id) {
  const updated = items.filter((item) => item.id !== id)
  saveItems(updated)
  return updated
}

/** Get a single item by id */
export function getItemById(items, id) {
  return items.find((item) => item.id === id) || null
}

// ---- Constants used in dropdowns ----
export const CATEGORIES = [
  'Electronics',
  'Groceries',
  'Clothing',
  'Packaging',
  'Other',
]

export const WAREHOUSES = [
  'Warehouse A',
  'Warehouse B',
  'Warehouse C',
]

export const LOW_STOCK_THRESHOLD = 5

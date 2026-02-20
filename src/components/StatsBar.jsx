import { LOW_STOCK_THRESHOLD } from '../utils/localStorage'

export default function StatsBar({ items }) {
  const total = items.length
  const inStock = items.filter((i) => i.status === 'In Stock').length
  const outOfStock = items.filter((i) => i.status === 'Out of Stock').length
  const lowStock = items.filter(
    (i) => i.quantity > 0 && i.quantity < LOW_STOCK_THRESHOLD
  ).length

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <div className="stat-label">Total Items</div>
        <div className="stat-value yellow">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">In Stock</div>
        <div className="stat-value green">{inStock}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Out of Stock</div>
        <div className="stat-value red">{outOfStock}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Low Stock (&lt;{LOW_STOCK_THRESHOLD})</div>
        <div className={`stat-value ${lowStock > 0 ? 'red' : 'green'}`}>{lowStock}</div>
      </div>
    </div>
  )
}

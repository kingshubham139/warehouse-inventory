import { useNavigate } from 'react-router-dom'
import { LOW_STOCK_THRESHOLD } from '../utils/localStorage'

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)

export default function InventoryTable({ items, onDeleteRequest }) {
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="table-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No items found</h3>
          <p>Try adjusting your search or filters, or add a new inventory item.</p>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            + Add First Item
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLow = item.quantity > 0 && item.quantity < LOW_STOCK_THRESHOLD
            const isOut = item.quantity === 0

            return (
              <tr key={item.id} className={isLow || isOut ? 'low-stock' : ''}>
                <td>
                  <span className="cell-id">{item.id}</span>
                </td>
                <td>
                  <span className={`cell-name ${isLow ? 'low-stock-text' : ''}`}>
                    {item.name}
                    {isLow && (
                      <span className="badge badge-low">⚠ LOW</span>
                    )}
                  </span>
                </td>
                <td>
                  <span className="badge badge-category">{item.category}</span>
                </td>
                <td>
                  <span className={`cell-qty ${isLow || isOut ? 'low' : 'ok'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td>
                  <span className="badge badge-warehouse">{item.warehouse}</span>
                </td>
                <td>
                  {item.status === 'In Stock' ? (
                    <span className="badge badge-status-in">● In Stock</span>
                  ) : (
                    <span className="badge badge-status-out">✕ Out of Stock</span>
                  )}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {item.lastUpdated}
                </td>
                <td>
                  <div className="action-cell">
                    <button
                      className="btn-icon edit"
                      onClick={() => navigate(`/edit/${item.id}`)}
                      title="Edit item"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => onDeleteRequest(item)}
                      title="Delete item"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

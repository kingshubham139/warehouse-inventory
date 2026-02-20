const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)

export default function ConfirmModal({ item, onConfirm, onCancel }) {
  if (!item) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <TrashIcon />
        </div>
        <h3>Delete Item?</h3>
        <p>
          You are about to permanently delete{' '}
          <strong>{item.name}</strong>{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--yellow)' }}>
            ({item.id})
          </span>
          . This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getItemById } from '../utils/localStorage'
import ItemForm from '../components/ItemForm'

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

export default function EditItem({ items, onEdit, showToast }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const item = getItemById(items, id)

  // If item doesn't exist, redirect home
  useEffect(() => {
    if (items.length > 0 && !item) {
      showToast('Item not found.', 'error')
      navigate('/')
    }
  }, [item, items, navigate, showToast])

  if (!item) {
    return (
      <div className="page-wrapper">
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <AlertIcon />
          <p style={{ marginTop: '12px' }}>Loading item...</p>
        </div>
      </div>
    )
  }

  const initialData = {
    name: item.name,
    category: item.category,
    quantity: String(item.quantity),
    warehouse: item.warehouse,
  }

  const handleSubmit = (formData) => {
    onEdit(id, formData)
    showToast(`"${formData.name.trim()}" updated successfully!`, 'success')
    navigate('/')
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/')}
          style={{ marginBottom: '16px' }}
        >
          <ArrowLeftIcon />
          Back to Inventory
        </button>
        <h1>Edit <span>Item</span></h1>
        <p>
          Editing{' '}
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--yellow)', fontSize: '12px' }}>
            {item.id}
          </span>{' '}
          — {item.name}
        </p>
      </div>

      <div className="form-card">
        <ItemForm
          initialData={initialData}
          itemId={item.id}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}

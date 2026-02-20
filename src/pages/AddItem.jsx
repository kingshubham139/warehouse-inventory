import { useNavigate } from 'react-router-dom'
import ItemForm from '../components/ItemForm'

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

export default function AddItem({ onAdd, showToast }) {
  const navigate = useNavigate()

  const handleSubmit = (formData) => {
    onAdd(formData)
    showToast(`"${formData.name.trim()}" added to inventory!`, 'success')
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
        <h1>Add <span>New Item</span></h1>
        <p>Fill in the details below to register a new inventory item</p>
      </div>

      <div className="form-card">
        <ItemForm
          onSubmit={handleSubmit}
          submitLabel="Add to Inventory"
        />
      </div>
    </div>
  )
}

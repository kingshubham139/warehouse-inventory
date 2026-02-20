import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, WAREHOUSES, calcStatus, today } from '../utils/localStorage'

const defaultForm = {
  name: '',
  category: '',
  quantity: '',
  warehouse: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Item name is required.'
  if (!form.category) errors.category = 'Please select a category.'
  if (form.quantity === '' || form.quantity === null) {
    errors.quantity = 'Quantity is required.'
  } else if (isNaN(Number(form.quantity)) || Number(form.quantity) < 0) {
    errors.quantity = 'Quantity must be a number ≥ 0.'
  } else if (!Number.isInteger(Number(form.quantity))) {
    errors.quantity = 'Quantity must be a whole number.'
  }
  if (!form.warehouse) errors.warehouse = 'Please select a warehouse location.'
  return errors
}

export default function ItemForm({ initialData, itemId, onSubmit, submitLabel }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialData || defaultForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // If initialData changes (edit page loads existing item), sync it
  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error on change if field was touched
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validate({ ...form, [name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      ...(fieldErrors[name] ? { [name]: fieldErrors[name] } : {}),
      ...(fieldErrors[name] ? {} : { [name]: undefined }),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Touch all fields
    setTouched({ name: true, category: true, quantity: true, warehouse: true })
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  // Preview auto-calculated values
  const previewStatus = form.quantity !== '' ? calcStatus(form.quantity) : '—'
  const previewDate = today()
  const previewId = itemId || 'AUTO'

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {/* Auto-generated fields (read-only display) */}
        <div className="form-group">
          <label className="form-label">Item ID</label>
          <div className="form-display">{previewId}</div>
          <span className="form-hint">Auto-generated on save</span>
        </div>

        <div className="form-group">
          <label className="form-label">Last Updated</label>
          <div className="form-display">{previewDate}</div>
          <span className="form-hint">Set automatically on save</span>
        </div>

        <div className="form-divider" />

        {/* Item Name */}
        <div className="form-group full-width">
          <label className="form-label" htmlFor="name">
            Item Name <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
            placeholder="e.g. Industrial Packing Tape"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.name && touched.name && (
            <span className="form-error">⚠ {errors.name}</span>
          )}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category <span>*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category && touched.category ? 'error' : ''}`}
            value={form.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && touched.category && (
            <span className="form-error">⚠ {errors.category}</span>
          )}
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label className="form-label" htmlFor="quantity">
            Quantity <span>*</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            step="1"
            className={`form-input ${errors.quantity && touched.quantity ? 'error' : ''}`}
            placeholder="0"
            value={form.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.quantity && touched.quantity ? (
            <span className="form-error">⚠ {errors.quantity}</span>
          ) : (
            <span className="form-hint">Must be a whole number ≥ 0</span>
          )}
        </div>

        {/* Warehouse */}
        <div className="form-group">
          <label className="form-label" htmlFor="warehouse">
            Warehouse Location <span>*</span>
          </label>
          <select
            id="warehouse"
            name="warehouse"
            className={`form-select ${errors.warehouse && touched.warehouse ? 'error' : ''}`}
            value={form.warehouse}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select warehouse...</option>
            {WAREHOUSES.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          {errors.warehouse && touched.warehouse && (
            <span className="form-error">⚠ {errors.warehouse}</span>
          )}
        </div>

        {/* Stock Status (preview) */}
        <div className="form-group">
          <label className="form-label">Stock Status</label>
          <div
            className="form-display"
            style={{
              color:
                previewStatus === 'In Stock'
                  ? 'var(--green)'
                  : previewStatus === 'Out of Stock'
                  ? 'var(--red)'
                  : 'var(--text-muted)',
            }}
          >
            {previewStatus}
          </div>
          <span className="form-hint">Auto-calculated from quantity</span>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel || 'Save Item'}
        </button>
      </div>
    </form>
  )
}

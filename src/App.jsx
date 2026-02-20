import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ToastContainer from './components/Toast'
import Home from './pages/Home'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import {
  loadItems,
  addItem,
  updateItem,
  deleteItem,
} from './utils/localStorage'

let toastIdCounter = 0

export default function App() {
  // ── Global state ──────────────────────────────────────────
  const [items, setItems] = useState(() => loadItems())
  const [toasts, setToasts] = useState([])

  // ── Toast helpers ──────────────────────────────────────────
  const showToast = useCallback((message, type = 'info') => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ── CRUD handlers ──────────────────────────────────────────
  const handleAdd = useCallback((formData) => {
    setItems((prev) => addItem(prev, formData))
  }, [])

  const handleEdit = useCallback((id, formData) => {
    setItems((prev) => updateItem(prev, id, formData))
  }, [])

  const handleDelete = useCallback((id) => {
    setItems((prev) => deleteItem(prev, id))
  }, [])

  // ── Render ─────────────────────────────────────────────────
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              onDelete={handleDelete}
              showToast={showToast}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddItem
              onAdd={handleAdd}
              showToast={showToast}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditItem
              items={items}
              onEdit={handleEdit}
              showToast={showToast}
            />
          }
        />
        {/* 404 catch-all */}
        <Route
          path="*"
          element={
            <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: '80px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '80px', color: 'var(--yellow)', opacity: 0.3 }}>404</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Page not found.</p>
            </div>
          }
        />
      </Routes>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </BrowserRouter>
  )
}

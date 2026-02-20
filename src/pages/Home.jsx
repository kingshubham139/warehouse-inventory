import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/InventoryTable'
import SearchFilter from '../components/SearchFilter'
import StatsBar from '../components/StatsBar'
import ConfirmModal from '../components/ConfirmModal'

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

export default function Home({ items, onDelete, showToast }) {
  const navigate = useNavigate()

  // Filters
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [warehouse, setWarehouse] = useState('')

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Filtered items
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return items.filter((item) => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      const matchCategory = !category || item.category === category
      const matchWarehouse = !warehouse || item.warehouse === warehouse
      return matchSearch && matchCategory && matchWarehouse
    })
  }, [items, search, category, warehouse])

  const handleDeleteRequest = (item) => setDeleteTarget(item)

  const handleDeleteConfirm = () => {
    onDelete(deleteTarget.id)
    showToast(`"${deleteTarget.name}" deleted.`, 'success')
    setDeleteTarget(null)
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="header-row">
          <div>
            <h1>Inventory <span>Overview</span></h1>
            <p>Track, manage and update warehouse stock in real time</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            <PlusIcon />
            Add Item
          </button>
        </div>
      </div>

      <StatsBar items={items} />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        total={items.length}
        filtered={filtered.length}
      />

      <InventoryTable
        items={filtered}
        onDeleteRequest={handleDeleteRequest}
      />

      {deleteTarget && (
        <ConfirmModal
          item={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

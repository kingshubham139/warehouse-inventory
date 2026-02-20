import { CATEGORIES, WAREHOUSES } from '../utils/localStorage'

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export default function SearchFilter({ search, setSearch, category, setCategory, warehouse, setWarehouse, total, filtered }) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, category, warehouse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
      >
        <option value="">All Warehouses</option>
        {WAREHOUSES.map((w) => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      {(search || category || warehouse) && (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setSearch('')
            setCategory('')
            setWarehouse('')
          }}
        >
          Clear
        </button>
      )}

      <span className="toolbar-results">
        {filtered} / {total} item{total !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

// SVG Icons inline to avoid any dependency issues
const WarehouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner" style={{ position: 'relative' }}>
        <Link to="/" className="navbar-brand" onClick={handleNavClick}>
          <div className="navbar-logo">
            <WarehouseIcon />
          </div>
          <div>
            <div className="navbar-title">
              Rastaa<span>AI</span>
            </div>
            <div className="navbar-subtitle">Warehouse Inventory</div>
          </div>
        </Link>

        <div className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <ListIcon />
            Inventory
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <PlusIcon />
            Add Item
          </NavLink>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', background: menuOpen ? 'var(--yellow)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', background: menuOpen ? 'var(--yellow)' : '' }} />
        </button>
      </div>
    </nav>
  )
}

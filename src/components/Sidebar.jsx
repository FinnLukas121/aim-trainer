import { useState } from 'react'
import '../styles/Sidebar.css'

function Sidebar({ currentPage, setCurrentPage }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'home', label: 'HOME', icon: '🎮' },
    { id: 'play', label: 'PLAY', icon: '▶️' },
    { id: 'training', label: 'TRAINING', icon: '⚡' },
    { id: 'stats', label: 'STATS', icon: '📊' },
    { id: 'settings', label: 'SETTINGS', icon: '⚙️' }
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          {!isCollapsed && <span className="logo-text">AIM TRAINER</span>}
        </div>
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        {!isCollapsed && <p className="version">v1.0.0</p>}
      </div>
    </aside>
  )
}

export default Sidebar
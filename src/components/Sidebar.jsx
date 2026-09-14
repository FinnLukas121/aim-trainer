import './Sidebar.css'

const Sidebar = ({ currentPage, onNavigate, isOpen, onToggle }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'play', label: 'Play', icon: '🎮' },
    { id: 'training', label: 'Training', icon: '📚' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">AIMTRAINER</span>
        </div>
        <button className="collapse-btn" onClick={onToggle}>
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="version">v1.0.0</div>
      </div>
    </aside>
  )
}

export default Sidebar
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Play from './pages/Play'
import Training from './pages/Training'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import './styles/App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderPage = () => {
    switch(currentPage) {
      case 'play':
        return <Play />
      case 'training':
        return <Training />
      case 'stats':
        return <Stats />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
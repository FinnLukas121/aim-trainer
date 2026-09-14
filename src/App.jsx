import { useState, useEffect } from 'react'
import './styles/App.css'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Play from './pages/Play'
import Training from './pages/Training'
import Stats from './pages/Stats'
import Settings from './pages/Settings'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aimTrainerSettings')
    return saved ? JSON.parse(saved) : {
      trainingDuration: 30,
      targetSize: 30,
      targetSpeed: 1,
      soundEnabled: true,
      musicEnabled: false,
      theme: 'dark'
    }
  })

  useEffect(() => {
    localStorage.setItem('aimTrainerSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings })
  }

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'play' && <Play settings={settings} setCurrentPage={setCurrentPage} />}
        {currentPage === 'training' && <Training settings={settings} setCurrentPage={setCurrentPage} />}
        {currentPage === 'stats' && <Stats />}
        {currentPage === 'settings' && <Settings settings={settings} updateSettings={updateSettings} />}
      </main>
    </div>
  )
}

export default App
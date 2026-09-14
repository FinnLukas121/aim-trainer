import { useState, useEffect } from 'react'
import '../styles/pages/Stats.css'

function Stats() {
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedStats = localStorage.getItem('aimTrainerStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    } else {
      setStats({
        reaction: [],
        precision: [],
        speed: [],
        gridshot: []
      })
    }
  }, [])

  const resetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      localStorage.removeItem('aimTrainerStats')
      setStats({
        reaction: [],
        precision: [],
        speed: [],
        gridshot: []
      })
    }
  }

  if (!stats) return <div className="stats-page">Loading...</div>

  const getAllStats = () => {
    if (filter === 'all') {
      return [...stats.reaction, ...stats.precision, ...stats.speed, ...stats.gridshot]
    }
    return stats[filter] || []
  }

  const getStats = (mode) => stats[mode] || []

  const calculateAverage = (values) => {
    if (values.length === 0) return 0
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
  }

  const calculateBest = (mode) => {
    const modeStats = getStats(mode)
    if (modeStats.length === 0) return 'N/A'
    if (mode === 'reaction') {
      return Math.min(...modeStats.map(s => s.avgReactionTime)).toFixed(0) + 'ms'
    }
    return Math.max(...modeStats.map(s => s.score || 0))
  }

  const reactionTimes = getStats('reaction').map(s => s.avgReactionTime)
  const allScores = [
    ...getStats('precision').map(s => s.score || 0),
    ...getStats('speed').map(s => s.score || 0),
    ...getStats('gridshot').map(s => s.score || 0)
  ]

  const totalSessions = Object.values(stats).reduce((acc, arr) => acc + arr.length, 0)

  return (
    <div className="stats-page">
      <div className="stats-container">
        <h1>STATISTICS</h1>
        <p className="stats-subtitle">Track your progress and improvements</p>

        <div className="overall-stats">
          <div className="stat-box">
            <div className="stat-value">{totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{reactionTimes.length > 0 ? calculateAverage(reactionTimes) : '0'}ms</div>
            <div className="stat-label">Avg Reaction Time</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{allScores.length > 0 ? calculateAverage(allScores).toFixed(0) : '0'}</div>
            <div className="stat-label">Avg Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{Math.max(...allScores, 0)}</div>
            <div className="stat-label">Best Score</div>
          </div>
        </div>

        <div className="mode-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ALL MODES
          </button>
          <button
            className={`filter-btn ${filter === 'reaction' ? 'active' : ''}`}
            onClick={() => setFilter('reaction')}
          >
            REACTION
          </button>
          <button
            className={`filter-btn ${filter === 'precision' ? 'active' : ''}`}
            onClick={() => setFilter('precision')}
          >
            PRECISION
          </button>
          <button
            className={`filter-btn ${filter === 'speed' ? 'active' : ''}`}
            onClick={() => setFilter('speed')}
          >
            SPEED
          </button>
          <button
            className={`filter-btn ${filter === 'gridshot' ? 'active' : ''}`}
            onClick={() => setFilter('gridshot')}
          >
            GRIDSHOT
          </button>
        </div>

        <div className="mode-stats">
          <div className="mode-stat-card">
            <h3>⚡ REACTION</h3>
            <div className="stat-item">
              <span>Sessions:</span>
              <strong>{getStats('reaction').length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Time:</span>
              <strong>{calculateBest('reaction')}</strong>
            </div>
            <div className="stat-item">
              <span>Avg Time:</span>
              <strong>{reactionTimes.length > 0 ? calculateAverage(reactionTimes) + 'ms' : 'N/A'}</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>🎯 PRECISION</h3>
            <div className="stat-item">
              <span>Sessions:</span>
              <strong>{getStats('precision').length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Score:</span>
              <strong>{calculateBest('precision')}</strong>
            </div>
            <div className="stat-item">
              <span>Avg Accuracy:</span>
              <strong>{getStats('precision').length > 0 ? calculateAverage(getStats('precision').map(s => s.accuracy || 0)).toFixed(1) + '%' : 'N/A'}</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>🚀 SPEED</h3>
            <div className="stat-item">
              <span>Sessions:</span>
              <strong>{getStats('speed').length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Score:</span>
              <strong>{calculateBest('speed')}</strong>
            </div>
            <div className="stat-item">
              <span>Avg Targets/Sec:</span>
              <strong>{getStats('speed').length > 0 ? calculateAverage(getStats('speed').map(s => s.targetsPerSecond || 0)).toFixed(2) : 'N/A'}</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>📈 GRIDSHOT</h3>
            <div className="stat-item">
              <span>Sessions:</span>
              <strong>{getStats('gridshot').length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Score:</span>
              <strong>{calculateBest('gridshot')}</strong>
            </div>
            <div className="stat-item">
              <span>Avg Time:</span>
              <strong>{getStats('gridshot').length > 0 ? calculateAverage(getStats('gridshot').map(s => s.completionTime || 0)).toFixed(1) + 's' : 'N/A'}</strong>
            </div>
          </div>
        </div>

        <div className="stats-history">
          <h2>SESSION HISTORY</h2>
          <div className="history-list">
            {getAllStats().length > 0 ? (
              getAllStats()
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 10)
                .map((session, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-mode">{session.mode?.toUpperCase()}</div>
                    <div className="history-details">
                      <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                      <span>{new Date(session.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="history-score">{session.score || session.avgReactionTime + 'ms'}</div>
                  </div>
                ))
            ) : (
              <p className="no-data">No sessions recorded yet. Start training!</p>
            )}
          </div>
        </div>

        <button className="btn btn-danger" onClick={resetStats}>
          🔄 RESET ALL STATISTICS
        </button>
      </div>
    </div>
  )
}

export default Stats
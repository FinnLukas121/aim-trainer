import { useEffect } from 'react'
import '../styles/components/GameResults.css'

function GameResults({ stats, onExit, onGameEnd }) {
  useEffect(() => {
    // Save stats to localStorage
    const savedStats = localStorage.getItem('aimTrainerStats')
    const allStats = savedStats ? JSON.parse(savedStats) : {
      reaction: [],
      precision: [],
      speed: [],
      gridshot: []
    }

    const modeKey = stats.mode
    if (modeKey && allStats[modeKey]) {
      allStats[modeKey].push(stats)
      localStorage.setItem('aimTrainerStats', JSON.stringify(allStats))
    }
  }, [stats])

  const getBestScore = () => {
    const savedStats = localStorage.getItem('aimTrainerStats')
    if (!savedStats) return 'N/A'

    const allStats = JSON.parse(savedStats)
    const modeStats = allStats[stats.mode] || []

    if (stats.mode === 'reaction') {
      if (modeStats.length === 0) return 'N/A'
      return Math.min(...modeStats.map((s) => s.avgReactionTime)) + 'ms'
    }

    if (modeStats.length === 0) return 'N/A'
    return Math.max(...modeStats.map((s) => s.score || 0))
  }

  const getPersonalBest = () => {
    const savedStats = localStorage.getItem('aimTrainerStats')
    if (!savedStats) return 'First time!'

    const allStats = JSON.parse(savedStats)
    const modeStats = allStats[stats.mode] || []

    if (modeStats.length <= 1) return 'New Personal Best! 🎉'

    if (stats.mode === 'reaction') {
      const prevBest = Math.min(...modeStats.slice(0, -1).map((s) => s.avgReactionTime))
      const currentTime = stats.avgReactionTime
      if (currentTime < prevBest) {
        return `Personal Best! -${(prevBest - currentTime).toFixed(0)}ms ✨`
      }
      return `Previous Best: ${prevBest}ms`
    }

    const prevBest = Math.max(...modeStats.slice(0, -1).map((s) => s.score || 0))
    const currentScore = stats.score
    if (currentScore > prevBest) {
      return `Personal Best! +${(currentScore - prevBest).toFixed(0)} points ✨`
    }
    return `Previous Best: ${prevBest} points`
  }

  const formatMode = (mode) => {
    const names = {
      reaction: '⚡ REACTION',
      precision: '🎯 PRECISION',
      speed: '🚀 SPEED',
      gridshot: '📊 GRIDSHOT'
    }
    return names[mode] || mode.toUpperCase()
  }

  return (
    <div className="game-results">
      <div className="results-container">
        <div className="results-header">
          <h1>SESSION COMPLETE</h1>
          <div className="mode-badge">{formatMode(stats.mode)}</div>
        </div>

        <div className="results-score">
          <div className="score-display">{stats.score}</div>
          <div className="score-label">SCORE</div>
        </div>

        <div className="results-grid">
          {stats.mode === 'reaction' && (
            <>
              <div className="result-item">
                <span className="result-label">Average Reaction Time</span>
                <span className="result-value">{stats.avgReactionTime}ms</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Rounds</span>
                <span className="result-value">{stats.hits}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Best Time</span>
                <span className="result-value">{getBestScore()}</span>
              </div>
            </>
          )}

          {stats.mode === 'precision' && (
            <>
              <div className="result-item">
                <span className="result-label">Accuracy</span>
                <span className="result-value">{stats.accuracy}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Hits</span>
                <span className="result-value">{stats.hits}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Misses</span>
                <span className="result-value">{stats.misses}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Duration</span>
                <span className="result-value">{stats.duration}s</span>
              </div>
              <div className="result-item">
                <span className="result-label">Best Score</span>
                <span className="result-value">{getBestScore()}</span>
              </div>
            </>
          )}

          {stats.mode === 'speed' && (
            <>
              <div className="result-item">
                <span className="result-label">Hits</span>
                <span className="result-value">{stats.hits}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Misses</span>
                <span className="result-value">{stats.misses}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Accuracy</span>
                <span className="result-value">{stats.accuracy}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Targets/Second</span>
                <span className="result-value">{stats.targetsPerSecond}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Best Score</span>
                <span className="result-value">{getBestScore()}</span>
              </div>
            </>
          )}

          {stats.mode === 'gridshot' && (
            <>
              <div className="result-item">
                <span className="result-label">Hits</span>
                <span className="result-value">{stats.hits}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Misses</span>
                <span className="result-value">{stats.misses}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Accuracy</span>
                <span className="result-value">{stats.accuracy}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Time</span>
                <span className="result-value">{stats.completionTime}s</span>
              </div>
              <div className="result-item">
                <span className="result-label">Best Score</span>
                <span className="result-value">{getBestScore()}</span>
              </div>
            </>
          )}
        </div>

        <div className="personal-best">
          <p>{getPersonalBest()}</p>
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onExit}>
            🔄 PLAY AGAIN
          </button>
          <button className="btn btn-secondary" onClick={() => onGameEnd(<div></div>)}>
            📊 VIEW STATS
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResults
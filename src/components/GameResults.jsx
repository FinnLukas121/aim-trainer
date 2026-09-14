import '../styles/components/GameResults.css'

const GameResults = ({ stats, onPlayAgain, onExit }) => {
  return (
    <div className="game-results">
      <div className="results-container">
        <div className="results-header">
          <h1>SESSION COMPLETE!</h1>
          <div className="mode-badge">{stats.mode}</div>
        </div>

        <div className="results-score">
          <div className="score-display">{stats.score}</div>
          <div className="score-label">{stats.scoreLabel}</div>
        </div>

        <div className="results-grid">
          {stats.metrics.map((metric, i) => (
            <div key={i} className="result-item">
              <span className="result-label">{metric.label}</span>
              <span className="result-value">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="personal-best">
          <p>🏆 Great performance! Keep training to beat your personal best!</p>
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onPlayAgain}>
            PLAY AGAIN
          </button>
          <button className="btn btn-secondary" onClick={onExit}>
            BACK TO MENU
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResults
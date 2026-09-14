import '../styles/pages/Stats.css'

const Stats = () => {
  return (
    <div className="stats-page">
      <div className="stats-container">
        <h1>YOUR STATISTICS</h1>
        <p className="stats-subtitle">Track your progress and personal bests</p>

        <div className="overall-stats">
          <div className="stat-box">
            <div className="stat-value">0</div>
            <div className="stat-label">TOTAL SESSIONS</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">0ms</div>
            <div className="stat-label">AVG REACTION</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">0%</div>
            <div className="stat-label">ACCURACY</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">0</div>
            <div className="stat-label">PERSONAL BEST</div>
          </div>
        </div>

        <div className="mode-filter">
          <button className="filter-btn active">ALL</button>
          <button className="filter-btn">REACTION</button>
          <button className="filter-btn">PRECISION</button>
          <button className="filter-btn">SPEED</button>
          <button className="filter-btn">GRIDSHOT</button>
        </div>

        <div className="mode-stats">
          <div className="mode-stat-card">
            <h3>REACTION TEST</h3>
            <div className="stat-item">
              <span>Sessions</span>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <span>Avg Reaction</span>
              <strong>0ms</strong>
            </div>
            <div className="stat-item">
              <span>Best Time</span>
              <strong>0ms</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>PRECISION</h3>
            <div className="stat-item">
              <span>Sessions</span>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <span>Avg Accuracy</span>
              <strong>0%</strong>
            </div>
            <div className="stat-item">
              <span>Best Score</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>SPEED CHALLENGE</h3>
            <div className="stat-item">
              <span>Sessions</span>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <span>Avg Score</span>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <span>Best Score</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="mode-stat-card">
            <h3>GRIDSHOT</h3>
            <div className="stat-item">
              <span>Sessions</span>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <span>Avg Time</span>
              <strong>0s</strong>
            </div>
            <div className="stat-item">
              <span>Best Time</span>
              <strong>0s</strong>
            </div>
          </div>
        </div>

        <div className="stats-history">
          <h2>RECENT SESSIONS</h2>
          <div className="no-data">No sessions yet. Start playing to track your progress!</div>
        </div>
      </div>
    </div>
  )
}

export default Stats
import '../styles/pages/Home.css'

function Home({ setCurrentPage }) {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1>AIM TRAINER</h1>
          <p className="subtitle">Master Your Aim. Improve Your Skills.</p>
        </div>

        <div className="home-intro">
          <p className="intro-text">Click the targets as fast and accurately as possible.</p>
          <p className="intro-desc">Train your reflexes and improve your aim with multiple game modes designed for competitive gaming.</p>
        </div>

        <div className="home-buttons">
          <button className="btn btn-primary" onClick={() => setCurrentPage('play')}>
            <span className="btn-icon">▶️</span>
            <span>START TRAINING</span>
          </button>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('stats')}>
            <span className="btn-icon">📊</span>
            <span>VIEW STATS</span>
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>REACTION</h3>
            <p>Test your reflexes with instant targets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>PRECISION</h3>
            <p>Improve accuracy and consistency</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>SPEED</h3>
            <p>Beat the clock in timed challenges</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>GRIDSHOT</h3>
            <p>Master complex target patterns</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
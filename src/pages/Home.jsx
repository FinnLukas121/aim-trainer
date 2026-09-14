import '../styles/pages/Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1>AIM TRAINER</h1>
          <p className="subtitle">Master Your Gaming Skills</p>
        </div>

        <div className="home-intro">
          <p className="intro-text">Train your reflexes, precision, and aiming skills</p>
          <p className="intro-desc">
            Choose from multiple game modes designed to improve your gaming performance
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>REACTION TEST</h3>
            <p>Test your reflexes with instant target appearances</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>PRECISION</h3>
            <p>Improve your accuracy with careful aiming challenges</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>SPEED</h3>
            <p>Beat the clock in fast-paced timed challenges</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>GRIDSHOT</h3>
            <p>Master complex target patterns on a grid</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
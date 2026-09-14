import '../styles/pages/Training.css'

const Training = () => {
  return (
    <div className="training-page">
      <div className="training-container">
        <h1>TRAINING GUIDE</h1>

        <div className="training-tabs">
          <button className="tab-btn active">ROUTINE</button>
          <button className="tab-btn">TIPS</button>
          <button className="tab-btn">PROGRESSION</button>
        </div>

        <div className="tab-content">
          <div className="training-card">
            <h3>DAILY ROUTINE</h3>
            <div className="routine-item">
              <h4>Warm Up (5 min)</h4>
              <p>Start with Reaction Test to warm up your reflexes</p>
            </div>
            <div className="routine-item">
              <h4>Precision Training (10 min)</h4>
              <p>Focus on accuracy with the Precision game mode</p>
            </div>
            <div className="routine-item">
              <h4>Speed Challenge (5 min)</h4>
              <p>Test your speed and reaction time combined</p>
            </div>
            <div className="routine-item">
              <h4>Gridshot Practice (10 min)</h4>
              <p>Master complex patterns and sequential clicking</p>
            </div>
          </div>

          <div className="training-card">
            <h3>PRO TIPS</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <h3>Ergonomics</h3>
                <p>Maintain proper posture and keep your arm relaxed for better control</p>
              </div>
              <div className="tip-card">
                <h3>Mouse Settings</h3>
                <p>Use consistent mouse sensitivity across all games for muscle memory</p>
              </div>
              <div className="tip-card">
                <h3>Training Schedule</h3>
                <p>Train regularly (daily) for best results. Consistency beats intensity</p>
              </div>
              <div className="tip-card">
                <h3>Breaks</h3>
                <p>Take short breaks to maintain focus and prevent fatigue</p>
              </div>
            </div>
          </div>

          <div className="training-card">
            <h3>PROGRESSION LEVELS</h3>
            <div className="progression-stages">
              <div className="stage">
                <div className="stage-badge">BEGINNER</div>
                <h3>Level 1: Foundation</h3>
                <ul>
                  <li>Complete 10 Reaction Test sessions</li>
                  <li>Achieve 80%+ accuracy in Precision</li>
                  <li>Click 20+ targets in Speed Challenge</li>
                  <li>Complete Gridshot in under 60 seconds</li>
                </ul>
              </div>
              <div className="stage">
                <div className="stage-badge">INTERMEDIATE</div>
                <h3>Level 2: Development</h3>
                <ul>
                  <li>Average reaction time below 250ms</li>
                  <li>Achieve 90%+ accuracy in Precision</li>
                  <li>Click 35+ targets in Speed Challenge</li>
                  <li>Complete Gridshot in under 40 seconds</li>
                </ul>
              </div>
              <div className="stage">
                <div className="stage-badge">ADVANCED</div>
                <h3>Level 3: Mastery</h3>
                <ul>
                  <li>Average reaction time below 200ms</li>
                  <li>Achieve 95%+ accuracy in Precision</li>
                  <li>Click 50+ targets in Speed Challenge</li>
                  <li>Complete Gridshot in under 25 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Training
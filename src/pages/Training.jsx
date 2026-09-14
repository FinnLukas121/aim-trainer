import { useState } from 'react'
import '../styles/pages/Training.css'

function Training({ settings, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('recommendations')

  return (
    <div className="training-page">
      <div className="training-container">
        <h1>TRAINING GUIDE</h1>
        <p className="page-subtitle">Improve your aim systematically</p>

        <div className="training-tabs">
          <button
            className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            📋 RECOMMENDATIONS
          </button>
          <button
            className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            💡 TIPS
          </button>
          <button
            className={`tab-btn ${activeTab === 'progression' ? 'active' : ''}`}
            onClick={() => setActiveTab('progression')}
          >
            📈 PROGRESSION
          </button>
        </div>

        {activeTab === 'recommendations' && (
          <div className="tab-content">
            <div className="training-card">
              <h3>📋 Daily Training Routine</h3>
              <div className="routine-item">
                <h4>Warm Up (5 min)</h4>
                <p>Start with Reaction mode to activate your reflexes</p>
              </div>
              <div className="routine-item">
                <h4>Precision Training (10 min)</h4>
                <p>Practice accuracy with Precision mode</p>
              </div>
              <div className="routine-item">
                <h4>Speed Challenge (5 min)</h4>
                <p>Push your limits with Speed mode</p>
              </div>
              <div className="routine-item">
                <h4>Complex Patterns (10 min)</h4>
                <p>Master gridshot for advanced aiming</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="tab-content">
            <div className="tips-grid">
              <div className="tip-card">
                <h3>🎯 Focus</h3>
                <p>Stay concentrated on the targets. Eliminate distractions and maintain steady focus throughout your session.</p>
              </div>
              <div className="tip-card">
                <h3>🖱️ Mouse Control</h3>
                <p>Use consistent mouse sensitivity. Find the sweet spot that allows both speed and precision.</p>
              </div>
              <div className="tip-card">
                <h3>⚡ Reaction Speed</h3>
                <p>React instantly to target appearances. Reduce decision time and let muscle memory take over.</p>
              </div>
              <div className="tip-card">
                <h3>📊 Consistency</h3>
                <p>Train regularly to build muscle memory. Consistency trumps intensity in skill development.</p>
              </div>
              <div className="tip-card">
                <h3>🎵 Environment</h3>
                <p>Train in a quiet, well-lit environment. Good lighting and minimal distractions improve performance.</p>
              </div>
              <div className="tip-card">
                <h3>🧘 Posture</h3>
                <p>Maintain good posture and arm position. This reduces fatigue and improves accuracy over time.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progression' && (
          <div className="tab-content">
            <div className="progression-stages">
              <div className="stage">
                <div className="stage-badge">BEGINNER</div>
                <h3>Foundation (Week 1-2)</h3>
                <ul>
                  <li>Focus on Reaction mode to build reflexes</li>
                  <li>Train 15-20 minutes daily</li>
                  <li>Target average reaction: 250-300ms</li>
                </ul>
              </div>
              <div className="stage">
                <div className="stage-badge">INTERMEDIATE</div>
                <h3>Development (Week 3-6)</h3>
                <ul>
                  <li>Mix Precision and Speed modes</li>
                  <li>Train 30-40 minutes daily</li>
                  <li>Target average reaction: 150-200ms</li>
                </ul>
              </div>
              <div className="stage">
                <div className="stage-badge">ADVANCED</div>
                <h3>Mastery (Week 7+)</h3>
                <ul>
                  <li>Focus on Gridshot and all modes</li>
                  <li>Train 45-60 minutes daily</li>
                  <li>Target average reaction: &lt;150ms</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Training
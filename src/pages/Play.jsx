import { useState } from 'react'
import ReactionGame from '../games/ReactionGame'
import PrecisionGame from '../games/PrecisionGame'
import SpeedGame from '../games/SpeedGame'
import GridshotGame from '../games/GridshotGame'
import '../styles/pages/Play.css'

const Play = () => {
  const [selectedMode, setSelectedMode] = useState(null)

  if (selectedMode) {
    const GameComponent = {
      reaction: ReactionGame,
      precision: PrecisionGame,
      speed: SpeedGame,
      gridshot: GridshotGame,
    }[selectedMode]

    return <GameComponent onExit={() => setSelectedMode(null)} />
  }

  return (
    <div className="play-page">
      <div className="mode-selector">
        <h1>SELECT GAME MODE</h1>
        <p className="mode-subtitle">Choose your training challenge</p>

        <div className="modes-grid">
          <div className="mode-card" onClick={() => setSelectedMode('reaction')}>
            <span className="mode-icon">⚡</span>
            <h3>REACTION TEST</h3>
            <p>Test your reflexes. Click on targets as fast as you can.</p>
          </div>
          <div className="mode-card" onClick={() => setSelectedMode('precision')}>
            <span className="mode-icon">🎯</span>
            <h3>PRECISION</h3>
            <p>Improve accuracy. Click targets with high precision.</p>
          </div>
          <div className="mode-card" onClick={() => setSelectedMode('speed')}>
            <span className="mode-icon">🚀</span>
            <h3>SPEED CHALLENGE</h3>
            <p>Beat the clock. Click as many targets as possible in 30s.</p>
          </div>
          <div className="mode-card" onClick={() => setSelectedMode('gridshot')}>
            <span className="mode-icon">📊</span>
            <h3>GRIDSHOT</h3>
            <p>Master patterns. Click targets in the correct order on a grid.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Play
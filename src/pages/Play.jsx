import { useState } from 'react'
import '../styles/pages/Play.css'
import ReactionGame from '../games/ReactionGame'
import PrecisionGame from '../games/PrecisionGame'
import SpeedGame from '../games/SpeedGame'
import GridshotGame from '../games/GridshotGame'

function Play({ settings, setCurrentPage }) {
  const [selectedMode, setSelectedMode] = useState(null)
  const [gameResults, setGameResults] = useState(null)

  const gameModes = [
    {
      id: 'reaction',
      name: 'REACTION',
      description: 'Click targets as fast as possible',
      icon: '⚡',
      color: '#ff6b6b'
    },
    {
      id: 'precision',
      name: 'PRECISION',
      description: 'Improve your accuracy',
      icon: '🎯',
      color: '#4ecdc4'
    },
    {
      id: 'speed',
      name: 'SPEED',
      description: '30 seconds - Score as many hits as possible',
      icon: '🚀',
      color: '#45b7d1'
    },
    {
      id: 'gridshot',
      name: 'GRIDSHOT',
      description: 'Hit all targets in the grid',
      icon: '📈',
      color: '#a78bfa'
    }
  ]

  if (gameResults) {
    return (
      <div className="play-page">
        <div className="results-container">
          <h1>SESSION COMPLETE</h1>
          <div className="results-content">
            {gameResults}
            <button className="btn btn-primary" onClick={() => {
              setGameResults(null)
              setSelectedMode(null)
            }}>
              BACK TO MODES
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (selectedMode) {
    const GameComponent = {
      reaction: ReactionGame,
      precision: PrecisionGame,
      speed: SpeedGame,
      gridshot: GridshotGame
    }[selectedMode]

    return (
      <div className="play-page">
        <GameComponent
          settings={settings}
          onGameEnd={(results) => setGameResults(results)}
          onExit={() => setSelectedMode(null)}
        />
      </div>
    )
  }

  return (
    <div className="play-page">
      <div className="mode-selector">
        <h1>SELECT TRAINING MODE</h1>
        <p className="mode-subtitle">Choose your training challenge</p>
        <div className="modes-grid">
          {gameModes.map((mode) => (
            <div
              key={mode.id}
              className="mode-card"
              style={{ borderColor: mode.color }}
              onClick={() => setSelectedMode(mode.id)}
            >
              <div className="mode-icon" style={{ color: mode.color }}>
                {mode.icon}
              </div>
              <h3>{mode.name}</h3>
              <p>{mode.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Play
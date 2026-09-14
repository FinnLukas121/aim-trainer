import { useState, useEffect, useRef } from 'react'
import GameResults from '../components/GameResults'
import '../styles/games/SpeedGame.css'

const SpeedGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('countdown')
  const [countdownValue, setCountdownValue] = useState(3)
  const [targetPosition, setTargetPosition] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const gameAreaRef = useRef(null)
  const gameTimerRef = useRef(null)
  const countdownIntervalRef = useRef(null)

  // Countdown phase
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdownValue > 0) {
        countdownIntervalRef.current = setTimeout(() => {
          setCountdownValue(prev => prev - 1)
        }, 1000)
      } else {
        setGameState('playing')
        spawnTarget()
      }
    }
    return () => clearTimeout(countdownIntervalRef.current)
  }, [countdownValue, gameState])

  // Game timer
  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [gameState])

  const spawnTarget = () => {
    if (!gameAreaRef.current || gameState !== 'playing') return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const targetSize = 35
    
    const x = Math.random() * (rect.width - targetSize)
    const y = Math.random() * (rect.height - targetSize)

    setTargetPosition({ x, y })
  }

  const handleTargetClick = () => {
    if (gameState !== 'playing' || !targetPosition) return

    setScore(score + 1)
    spawnTarget()
  }

  if (gameState === 'finished') {
    const targetsPerSecond = (score / (30 - timeLeft)).toFixed(2)
    const stats = {
      mode: 'SPEED',
      score: score,
      scoreLabel: 'Targets Clicked',
      metrics: [
        { label: 'Total Targets', value: score },
        { label: 'Time Taken', value: `${30 - timeLeft}s` },
        { label: 'Targets/Second', value: targetsPerSecond },
        { label: 'Average Time/Target', value: `${Math.round((30 - timeLeft) / score * 1000)}ms` },
      ]
    }
    return <GameResults stats={stats} onPlayAgain={() => window.location.reload()} onExit={onExit} />
  }

  return (
    <div className="speed-game">
      <div className="game-header">
        <h2>🚀 SPEED CHALLENGE</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      <div className="game-stats">
        <div className="stat">Score: {score}</div>
        <div className="stat timer">⏱️ {timeLeft}s</div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {gameState === 'countdown' && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdownValue > 0 ? countdownValue : 'GO!'}</div>
          </div>
        )}

        {targetPosition && (
          <div
            className="target speed-target"
            onClick={handleTargetClick}
            style={{
              width: '35px',
              height: '35px',
              left: `${targetPosition.x}px`,
              top: `${targetPosition.y}px`,
            }}
          />
        )}
      </div>

      <div className="instruction">
        Click as many targets as possible in 30 seconds!
      </div>
    </div>
  )
}

export default SpeedGame
import { useState, useEffect, useRef } from 'react'
import GameResults from '../components/GameResults'
import '../styles/games/PrecisionGame.css'

const PrecisionGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('countdown')
  const [countdownValue, setCountdownValue] = useState(3)
  const [targetPosition, setTargetPosition] = useState(null)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
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
    const targetSize = 40
    
    const x = Math.random() * (rect.width - targetSize)
    const y = Math.random() * (rect.height - targetSize)

    setTargetPosition({ x, y })
  }

  const handleTargetClick = (e) => {
    e.stopPropagation()
    if (gameState !== 'playing' || !targetPosition) return

    setHits(hits + 1)
    spawnTarget()
  }

  const handleAreaClick = () => {
    if (gameState === 'playing' && targetPosition) {
      setMisses(misses + 1)
    }
  }

  if (gameState === 'finished') {
    const total = hits + misses
    const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0
    const stats = {
      mode: 'PRECISION',
      score: accuracy,
      scoreLabel: 'Accuracy %',
      metrics: [
        { label: 'Hits', value: hits },
        { label: 'Misses', value: misses },
        { label: 'Accuracy', value: `${accuracy}%` },
        { label: 'Total Clicks', value: total },
      ]
    }
    return <GameResults stats={stats} onPlayAgain={() => window.location.reload()} onExit={onExit} />
  }

  return (
    <div className="precision-game">
      <div className="game-header">
        <h2>🎯 PRECISION</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      <div className="game-stats">
        <div className="stat">Hits: {hits}</div>
        <div className="stat">Misses: {misses}</div>
        <div className="stat">Accuracy: {hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0}%</div>
        <div className="stat">Time: {timeLeft}s</div>
      </div>

      <div className="game-area" ref={gameAreaRef} onClick={handleAreaClick}>
        {gameState === 'countdown' && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdownValue > 0 ? countdownValue : 'GO!'}</div>
          </div>
        )}

        {targetPosition && (
          <div
            className="target precision-target"
            onClick={handleTargetClick}
            style={{
              width: '40px',
              height: '40px',
              left: `${targetPosition.x}px`,
              top: `${targetPosition.y}px`,
            }}
          >
            <div className="target-inner"></div>
          </div>
        )}
      </div>

      <div className="instruction">
        Click targets precisely. Missing counts against your accuracy!
      </div>
    </div>
  )
}

export default PrecisionGame
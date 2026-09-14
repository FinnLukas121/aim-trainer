import { useState, useEffect, useRef } from 'react'
import '../styles/games/GridshotGame.css'
import GameResults from '../components/GameResults'

function GridshotGame({ settings, onGameEnd, onExit }) {
  const [gameState, setGameState] = useState('countdown')
  const [countdown, setCountdown] = useState(3)
  const [gridTargets, setGridTargets] = useState([])
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timeLimit, setTimeLimit] = useState(30)
  const countdownTimerRef = useRef(null)
  const gameTimerRef = useRef(null)
  const startTimeRef = useRef(null)
  const gridRef = useRef(null)
  const trainingDuration = settings.trainingDuration || 30
  const GRID_SIZE = 4

  useEffect(() => {
    if (gameState === 'countdown') {
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(countdownTimerRef.current)
  }, [gameState])

  useEffect(() => {
    if (countdown === 0 && gameState === 'countdown') {
      setGameState('playing')
      startTimeRef.current = Date.now()
      initializeGrid()
    }
  }, [countdown, gameState])

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setTimeElapsed(elapsed)
        if (elapsed >= trainingDuration) {
          setGameState('ended')
        }
      }, 100)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [gameState, trainingDuration])

  const initializeGrid = () => {
    const targets = []
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      targets.push({
        id: i,
        row: Math.floor(i / GRID_SIZE),
        col: i % GRID_SIZE,
        hit: false
      })
    }
    // Randomize order
    targets.sort(() => Math.random() - 0.5)
    setGridTargets(targets)
  }

  const handleTargetClick = (targetId) => {
    const target = gridTargets.find((t) => t.id === targetId)
    if (!target || target.hit) return

    // Check if it's the next target to hit (in order)
    const hitCount = gridTargets.filter((t) => t.hit).length
    if (gridTargets[hitCount].id !== targetId) {
      setMisses(misses + 1)
      if (settings.soundEnabled) {
        playSound('miss')
      }
      return
    }

    setGridTargets((prev) =>
      prev.map((t) => (t.id === targetId ? { ...t, hit: true } : t))
    )
    setHits(hits + 1)
    setScore(score + 20)

    if (settings.soundEnabled) {
      playSound('success')
    }

    // Check if all targets are hit
    if (hits + 1 === GRID_SIZE * GRID_SIZE) {
      setGameState('ended')
    }
  }

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.value = 1000
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } else if (type === 'miss') {
      oscillator.frequency.value = 200
      gain.gain.setValueAtTime(0.2, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  if (gameState === 'ended') {
    const completionTime = timeElapsed
    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0
    const stats = {
      mode: 'gridshot',
      score,
      hits,
      misses,
      accuracy,
      completionTime,
      timestamp: new Date().toISOString()
    }

    return (
      <GameResults
        stats={stats}
        onExit={onExit}
        onGameEnd={onGameEnd}
      />
    )
  }

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0
  const nextTargetIndex = gridTargets.filter((t) => t.hit).length
  const totalTargets = GRID_SIZE * GRID_SIZE

  return (
    <div className="gridshot-game">
      <div className="game-header">
        <h2>GRIDSHOT</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      {gameState === 'countdown' && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown === 0 ? 'GO!' : countdown}</div>
        </div>
      )}

      <div className="game-stats">
        <div className="stat">Progress: {nextTargetIndex}/{totalTargets}</div>
        <div className="stat">Score: {score}</div>
        <div className="stat">Time: {timeElapsed}/{trainingDuration}s</div>
        <div className="stat">Accuracy: {accuracy}%</div>
      </div>

      <div className="grid-container" ref={gridRef}>
        <div className="grid">
          {gridTargets.map((target, idx) => {
            const isNextTarget = idx === nextTargetIndex && !target.hit
            return (
              <div
                key={target.id}
                className={`grid-cell ${
                  target.hit ? 'hit' : isNextTarget ? 'next' : ''
                }`}
                onClick={() => handleTargetClick(target.id)}
              >
                <div className="cell-number">{idx + 1}</div>
                {isNextTarget && <div className="pulse-ring"></div>}
              </div>
            )
          })}
        </div>
      </div>

      <p className="instruction">Click targets in order from 1 to {totalTargets}!</p>
    </div>
  )
}

export default GridshotGame
import { useState, useEffect, useRef } from 'react'
import '../styles/games/PrecisionGame.css'
import GameResults from '../components/GameResults'

function PrecisionGame({ settings, onGameEnd, onExit }) {
  const [gameState, setGameState] = useState('countdown')
  const [countdown, setCountdown] = useState(3)
  const [targetVisible, setTargetVisible] = useState(false)
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [totalShots, setTotalShots] = useState(0)
  const [duration, setDuration] = useState(0)
  const gameAreaRef = useRef(null)
  const countdownTimerRef = useRef(null)
  const gameTimerRef = useRef(null)
  const targetTimerRef = useRef(null)
  const startTimeRef = useRef(null)
  const trainingDuration = settings.trainingDuration || 30

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
      showNextTarget()
    }
  }, [countdown, gameState])

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setDuration(elapsed)
        if (elapsed >= trainingDuration) {
          setGameState('ended')
        }
      }, 100)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [gameState, trainingDuration])

  const getRandomPosition = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 }
    const rect = gameAreaRef.current.getBoundingClientRect()
    const targetSize = Math.max(15, settings.targetSize - 10) || 20
    const maxX = rect.width - targetSize
    const maxY = rect.height - targetSize
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    }
  }

  const showNextTarget = () => {
    setTargetVisible(true)
    setTargetPos(getRandomPosition())
  }

  const handleTargetClick = () => {
    if (!targetVisible) return

    setHits(hits + 1)
    setScore(score + 10)
    setTotalShots(totalShots + 1)
    setTargetVisible(false)

    if (settings.soundEnabled) {
      playSound('success')
    }

    targetTimerRef.current = setTimeout(() => {
      showNextTarget()
    }, 300 / (settings.targetSpeed || 1))
  }

  const handleMiss = () => {
    if (targetVisible) {
      setMisses(misses + 1)
      setTotalShots(totalShots + 1)
      setTargetVisible(false)

      if (settings.soundEnabled) {
        playSound('miss')
      }

      targetTimerRef.current = setTimeout(() => {
        showNextTarget()
      }, 500)
    }
  }

  const handleGameAreaClick = (e) => {
    if (e.target.classList.contains('target')) return
    handleMiss()
  }

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.value = 800
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } else if (type === 'miss') {
      oscillator.frequency.value = 300
      gain.gain.setValueAtTime(0.2, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  if (gameState === 'ended') {
    const accuracy = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 0
    const stats = {
      mode: 'precision',
      score,
      hits,
      misses,
      accuracy,
      totalShots,
      duration,
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

  const accuracy = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 0

  return (
    <div className="precision-game">
      <div className="game-header">
        <h2>PRECISION</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      {gameState === 'countdown' && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown === 0 ? 'GO!' : countdown}</div>
        </div>
      )}

      <div className="game-stats">
        <div className="stat">Score: {score}</div>
        <div className="stat">Hits: {hits}</div>
        <div className="stat">Misses: {misses}</div>
        <div className="stat">Accuracy: {accuracy}%</div>
        <div className="stat">Time: {duration}/{trainingDuration}s</div>
      </div>

      <div className="game-area" ref={gameAreaRef} onClick={handleGameAreaClick}>
        {targetVisible && (
          <div
            className="target precision-target"
            style={{
              left: `${targetPos.x}px`,
              top: `${targetPos.y}px`,
              width: `${settings.targetSize || 30}px`,
              height: `${settings.targetSize || 30}px`
            }}
            onClick={handleTargetClick}
          >
            <div className="target-inner"></div>
          </div>
        )}
      </div>

      <p className="instruction">Click targets accurately. Missing counts as a miss!</p>
    </div>
  )
}

export default PrecisionGame
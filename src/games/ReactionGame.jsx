import { useState, useEffect, useRef } from 'react'
import '../styles/games/ReactionGame.css'
import GameResults from '../components/GameResults'

function ReactionGame({ settings, onGameEnd, onExit }) {
  const [gameState, setGameState] = useState('countdown') // countdown, playing, ended
  const [countdown, setCountdown] = useState(3)
  const [targetVisible, setTargetVisible] = useState(false)
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [reactionTimes, setReactionTimes] = useState([])
  const [currentRound, setCurrentRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(10)
  const gameAreaRef = useRef(null)
  const targetTimerRef = useRef(null)
  const countdownTimerRef = useRef(null)
  const startTimeRef = useRef(null)

  // Countdown before game starts
  useEffect(() => {
    if (gameState === 'countdown') {
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(countdownTimerRef.current)
  }, [gameState])

  // Start game when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && gameState === 'countdown') {
      setGameState('playing')
      showNextTarget()
    }
  }, [countdown, gameState])

  const getRandomPosition = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 }
    const rect = gameAreaRef.current.getBoundingClientRect()
    const targetSize = settings.targetSize || 30
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
    startTimeRef.current = Date.now()
  }

  const handleTargetClick = () => {
    if (!targetVisible) return

    const reactionTime = Date.now() - startTimeRef.current
    const newTimes = [...reactionTimes, reactionTime]
    setReactionTimes(newTimes)
    setTargetVisible(false)

    // Play sound effect
    if (settings.soundEnabled) {
      playSound('success')
    }

    if (newTimes.length < totalRounds) {
      setCurrentRound(newTimes.length + 1)
      targetTimerRef.current = setTimeout(() => {
        showNextTarget()
      }, 500)
    } else {
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
      oscillator.frequency.value = 800
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  if (gameState === 'ended') {
    const avgReactionTime = reactionTimes.length > 0
      ? Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length)
      : 0

    const stats = {
      mode: 'reaction',
      score: Math.max(0, 1000 - avgReactionTime),
      avgReactionTime,
      hits: reactionTimes.length,
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

  return (
    <div className="reaction-game">
      <div className="game-header">
        <h2>REACTION TEST</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      {gameState === 'countdown' && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown === 0 ? 'GO!' : countdown}</div>
        </div>
      )}

      <div className="game-stats">
        <div className="stat">Round: {currentRound}/{totalRounds}</div>
        <div className="stat">Avg Time: {reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length) : 0}ms</div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {targetVisible && (
          <div
            className="target reaction-target"
            style={{
              left: `${targetPos.x}px`,
              top: `${targetPos.y}px`,
              width: `${settings.targetSize || 30}px`,
              height: `${settings.targetSize || 30}px`
            }}
            onClick={handleTargetClick}
          >
            <div className="target-pulse"></div>
          </div>
        )}
      </div>

      <p className="instruction">Click the target as fast as possible!</p>
    </div>
  )
}

export default ReactionGame
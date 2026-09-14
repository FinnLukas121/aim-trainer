import { useState, useEffect, useRef } from 'react'
import '../styles/games/SpeedGame.css'
import GameResults from '../components/GameResults'

function SpeedGame({ settings, onGameEnd, onExit }) {
  const [gameState, setGameState] = useState('countdown')
  const [countdown, setCountdown] = useState(3)
  const [score, setScore] = useState(0)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [totalShots, setTotalShots] = useState(0)
  const [targets, setTargets] = useState([])
  const gameAreaRef = useRef(null)
  const countdownTimerRef = useRef(null)
  const gameTimerRef = useRef(null)
  const targetTimerRef = useRef(null)
  const startTimeRef = useRef(null)
  const targetIdRef = useRef(0)

  const GAME_DURATION = 30

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
      setTimeLeft(GAME_DURATION)
    }
  }, [countdown, gameState])

  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const remaining = Math.max(0, GAME_DURATION - elapsed)
        setTimeLeft(remaining)
        if (remaining === 0) {
          setGameState('ended')
        }
      }, 100)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [gameState])

  useEffect(() => {
    if (gameState === 'playing') {
      const spawnTarget = () => {
        if (gameState === 'playing') {
          const newTarget = {
            id: targetIdRef.current++,
            x: Math.random() * (gameAreaRef.current?.clientWidth - 40 || 400),
            y: Math.random() * (gameAreaRef.current?.clientHeight - 40 || 400)
          }
          setTargets((prev) => [...prev, newTarget])
          targetTimerRef.current = setTimeout(spawnTarget, 500 / (settings.targetSpeed || 1))
        }
      }
      targetTimerRef.current = setTimeout(spawnTarget, 100)
    }
    return () => clearTimeout(targetTimerRef.current)
  }, [gameState, settings.targetSpeed])

  const handleTargetClick = (targetId) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId))
    setHits(hits + 1)
    setScore(score + 15)
    setTotalShots(totalShots + 1)

    if (settings.soundEnabled) {
      playSound('success')
    }
  }

  const handleGameAreaClick = (e) => {
    if (e.target.classList.contains('speed-target')) return
    if (targets.length > 0) {
      setMisses(misses + 1)
      setTotalShots(totalShots + 1)
      if (settings.soundEnabled) {
        playSound('miss')
      }
    }
  }

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.value = 900
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.08)
    } else if (type === 'miss') {
      oscillator.frequency.value = 300
      gain.gain.setValueAtTime(0.2, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    }
  }

  if (gameState === 'ended') {
    const accuracy = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 0
    const targetsPerSecond = (hits / GAME_DURATION).toFixed(2)
    const stats = {
      mode: 'speed',
      score,
      hits,
      misses,
      accuracy,
      totalShots,
      targetsPerSecond,
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
    <div className="speed-game">
      <div className="game-header">
        <h2>SPEED CHALLENGE</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      {gameState === 'countdown' && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown === 0 ? 'GO!' : countdown}</div>
        </div>
      )}

      <div className="game-stats">
        <div className="stat timer" style={{
          color: timeLeft <= 5 ? '#ff6b6b' : '#fff'
        }}>
          ⏱️ {timeLeft}s
        </div>
        <div className="stat">Score: {score}</div>
        <div className="stat">Hits: {hits}</div>
        <div className="stat">Accuracy: {accuracy}%</div>
      </div>

      <div className="game-area" ref={gameAreaRef} onClick={handleGameAreaClick}>
        {targets.map((target) => (
          <div
            key={target.id}
            className="target speed-target"
            style={{
              left: `${target.x}px`,
              top: `${target.y}px`,
              width: `${settings.targetSize || 30}px`,
              height: `${settings.targetSize || 30}px`
            }}
            onClick={() => handleTargetClick(target.id)}
          >
            <div className="target-pulse"></div>
          </div>
        ))}
      </div>

      <p className="instruction">Click as many targets as possible in 30 seconds!</p>
    </div>
  )
}

export default SpeedGame
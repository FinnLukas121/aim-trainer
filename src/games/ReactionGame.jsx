import { useState, useEffect, useRef } from 'react'
import GameResults from '../components/GameResults'
import '../styles/games/ReactionGame.css'

const ReactionGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('countdown') // countdown, playing, finished
  const [round, setRound] = useState(1)
  const [countdownValue, setCountdownValue] = useState(3)
  const [targetPosition, setTargetPosition] = useState(null)
  const [targetVisible, setTargetVisible] = useState(false)
  const [waitTime, setWaitTime] = useState(0)
  const [reactionTimes, setReactionTimes] = useState([])
  const gameAreaRef = useRef(null)
  const countdownTimeRef = useRef(Date.now())
  const targetTimeRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const targetTimeoutRef = useRef(null)

  // Initial countdown
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdownValue > 0) {
        countdownIntervalRef.current = setTimeout(() => {
          setCountdownValue(prev => prev - 1)
        }, 1000)
      } else {
        setGameState('playing')
        showNextTarget()
      }
    }
    return () => clearTimeout(countdownIntervalRef.current)
  }, [countdownValue, gameState])

  const showNextTarget = () => {
    if (!gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const minDist = 80
    
    let x, y, valid
    do {
      valid = true
      x = Math.random() * (rect.width - 100) + 50
      y = Math.random() * (rect.height - 100) + 50
      
      if (targetPosition) {
        const dist = Math.sqrt((x - targetPosition.x) ** 2 + (y - targetPosition.y) ** 2)
        if (dist < minDist) valid = false
      }
    } while (!valid)

    setTargetPosition({ x, y })
    setTargetVisible(true)
    targetTimeRef.current = Date.now()
    
    const randomWait = Math.random() * 2000 + 1000 // 1-3 seconds
    setWaitTime(Math.round(randomWait))

    if (Math.random() > 0.8) {
      // 20% chance of early click (false start)
      targetTimeoutRef.current = setTimeout(() => {
        setTargetVisible(false)
      }, randomWait)
    }
  }

  const handleTargetClick = () => {
    if (!targetVisible || gameState !== 'playing') return

    const reactionTime = Date.now() - targetTimeRef.current
    setReactionTimes([...reactionTimes, reactionTime])
    setTargetVisible(false)
    clearTimeout(targetTimeoutRef.current)

    if (round < 10) {
      setTimeout(() => {
        setRound(round + 1)
        setTimeout(showNextTarget, 500)
      }, 300)
    } else {
      setGameState('finished')
    }
  }

  if (gameState === 'finished') {
    const avgReaction = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    const stats = {
      mode: 'REACTION',
      score: avgReaction,
      scoreLabel: 'Average Reaction Time',
      metrics: [
        { label: 'Rounds Completed', value: 10 },
        { label: 'Avg Reaction Time', value: `${avgReaction}ms` },
        { label: 'Best Time', value: `${Math.min(...reactionTimes)}ms` },
        { label: 'Worst Time', value: `${Math.max(...reactionTimes)}ms` },
      ]
    }
    return <GameResults stats={stats} onPlayAgain={() => window.location.reload()} onExit={onExit} />
  }

  return (
    <div className="reaction-game">
      <div className="game-header">
        <h2>⚡ REACTION TEST</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      <div className="game-stats">
        <div className="stat">Round: {round}/10</div>
        <div className="stat">State: {gameState === 'countdown' ? 'Ready...' : 'Playing'}</div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {gameState === 'countdown' && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdownValue > 0 ? countdownValue : 'GO!'}</div>
          </div>
        )}

        {targetVisible && (
          <div
            className="target reaction-target"
            onClick={handleTargetClick}
            style={{
              width: '50px',
              height: '50px',
              left: `${targetPosition.x}px`,
              top: `${targetPosition.y}px`,
            }}
          >
            <div className="target-pulse"></div>
          </div>
        )}
      </div>

      <div className="instruction">
        Click on targets as fast as you can. Measure your reaction time!
      </div>
    </div>
  )
}

export default ReactionGame
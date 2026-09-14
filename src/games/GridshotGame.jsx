import { useState, useEffect, useRef } from 'react'
import GameResults from '../components/GameResults'
import '../styles/games/GridshotGame.css'

const GridshotGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('countdown')
  const [countdownValue, setCountdownValue] = useState(3)
  const [nextNumber, setNextNumber] = useState(1)
  const [hits, setHits] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const gameTimerRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const gridRef = useRef(null)

  // Countdown phase
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdownValue > 0) {
        countdownIntervalRef.current = setTimeout(() => {
          setCountdownValue(prev => prev - 1)
        }, 1000)
      } else {
        setGameState('playing')
        setStartTime(Date.now())
      }
    }
    return () => clearTimeout(countdownIntervalRef.current)
  }, [countdownValue, gameState])

  // Elapsed time tracker
  useEffect(() => {
    if (gameState === 'playing' && startTime) {
      gameTimerRef.current = setInterval(() => {
        setElapsedTime(Math.round((Date.now() - startTime) / 100) / 10)
      }, 100)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [gameState, startTime])

  // Check if game is complete
  useEffect(() => {
    if (hits === 16 && gameState === 'playing') {
      setGameState('finished')
    }
  }, [hits, gameState])

  const handleCellClick = (cellNumber) => {
    if (gameState !== 'playing') return

    if (cellNumber === nextNumber) {
      setHits(hits + 1)
      if (nextNumber < 16) {
        setNextNumber(nextNumber + 1)
      }
    }
  }

  if (gameState === 'finished') {
    const stats = {
      mode: 'GRIDSHOT',
      score: elapsedTime,
      scoreLabel: 'Completion Time',
      metrics: [
        { label: 'Cells Clicked', value: '16/16' },
        { label: 'Completion Time', value: `${elapsedTime}s` },
        { label: 'Accuracy', value: '100%' },
        { label: 'Avg Time/Cell', value: `${(elapsedTime / 16).toFixed(2)}s` },
      ]
    }
    return <GameResults stats={stats} onPlayAgain={() => window.location.reload()} onExit={onExit} />
  }

  return (
    <div className="gridshot-game">
      <div className="game-header">
        <h2>📊 GRIDSHOT</h2>
        <button className="exit-btn" onClick={onExit}>✕</button>
      </div>

      <div className="game-stats">
        <div className="stat">Progress: {hits}/16</div>
        <div className="stat">Next: {nextNumber}</div>
        <div className="stat">Time: {elapsedTime}s</div>
      </div>

      <div className="game-area" ref={gridRef}>
        {gameState === 'countdown' && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdownValue > 0 ? countdownValue : 'GO!'}</div>
          </div>
        )}

        <div className="grid-container">
          <div className="grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`grid-cell ${hits > i ? 'hit' : ''} ${nextNumber === i + 1 ? 'next' : ''}`}
                onClick={() => handleCellClick(i + 1)}
              >
                {!hits || i >= hits ? <span className="cell-number">{i + 1}</span> : null}
                {hits > i && <div className="pulse-ring"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="instruction">
        Click targets in sequence from 1 to 16
      </div>
    </div>
  )
}

export default GridshotGame
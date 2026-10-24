import { useState, useEffect, useCallback } from 'react'
import './IntroLoader.css'

const STORAGE_KEY = 'samarth_intro_seen'
const TARGET_DURATION_MS = 2100 // Smooth ~2.1s sequence within the requested 2-3s target
const HARD_TIMEOUT_MS = 3200 // Failsafe: never block page access

export default function IntroLoader({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(() => {
    try {
      if (typeof window === 'undefined') return false
      // Respect prefers-reduced-motion
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
        return false
      }
      // Check session storage
      return sessionStorage.getItem(STORAGE_KEY) !== 'true'
    } catch {
      return false
    }
  })

  const [count, setCount] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Ignore storage errors in private browsing
    }

    setIsExiting(true)
    const exitTimer = setTimeout(() => {
      setShouldRender(false)
      if (typeof onComplete === 'function') {
        onComplete()
      }
    }, 450)

    return () => clearTimeout(exitTimer)
  }, [onComplete])

  useEffect(() => {
    if (!shouldRender) {
      if (typeof onComplete === 'function') {
        onComplete()
      }
      return
    }

    // Lock body scroll during intro
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Listen for Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    const startTime = performance.now()
    let frameId

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / TARGET_DURATION_MS, 1)

      // Ease-out cubic calculation for smooth slowdown at 90-100%
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * 100))

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCount(100)
        // Brief pause at 100% then exit smoothly
        setTimeout(handleFinish, 180)
      }
    }

    frameId = requestAnimationFrame(step)

    // Hard fallback timeout: guarantees page access even if animation is throttled
    const hardTimeout = setTimeout(() => {
      setCount(100)
      handleFinish()
    }, HARD_TIMEOUT_MS)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(hardTimeout)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [shouldRender, handleFinish, onComplete])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={`intro-loader ${isExiting ? 'intro-loader--exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome introduction"
    >
      <div className="intro-loader__grid" aria-hidden="true" />
      <span className="intro-loader__crosshair intro-loader__crosshair--tl" aria-hidden="true">+</span>
      <span className="intro-loader__crosshair intro-loader__crosshair--tr" aria-hidden="true">+</span>
      <span className="intro-loader__crosshair intro-loader__crosshair--bl" aria-hidden="true">+</span>
      <span className="intro-loader__crosshair intro-loader__crosshair--br" aria-hidden="true">+</span>

      <header className="intro-loader__header">
        <div className="intro-loader__status">
          <span className="intro-loader__pulse-dot" />
          <span>System Initializing // 2026</span>
        </div>
        <button
          type="button"
          className="intro-loader__skip"
          onClick={handleFinish}
          aria-label="Skip introduction animation"
        >
          Skip [ESC]
        </button>
      </header>

      <main className="intro-loader__center">
        <span className="intro-loader__pre-tag">// PORTFOLIO INITIALIZATION</span>
        <div className="intro-loader__mask">
          <h1 className="intro-loader__name">
            SAMARTH <em>SHEKHAR</em>
          </h1>
        </div>
        <div className="intro-loader__accent-line" aria-hidden="true" />
        <div className="intro-loader__role-wrap">
          <p className="intro-loader__role">
            AI Engineering &bull; Full-Stack Development &bull; Product Thinking
          </p>
        </div>
      </main>

      <footer className="intro-loader__footer">
        <div className="intro-loader__meta">
          <span className="intro-loader__label">Environment Loaded</span>
          <span className="intro-loader__number" aria-live="polite">
            {count}%
          </span>
        </div>
        <div className="intro-loader__bar-track" aria-hidden="true">
          <div
            className="intro-loader__bar-fill"
            style={{ width: `${count}%` }}
          />
        </div>
      </footer>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/config'
import { useGlobal } from '@/lib/global'

const ENTER_AUDIO = 'https://gcore.jsdelivr.net/gh/Uwimalx/endspace-nav@refs/heads/main/public/enter.mp3'
const BG_AUDIO = 'https://gcore.jsdelivr.net/gh/Uwimalx/endspace-nav@refs/heads/main/public/background.mp3'

export const LoadingCover = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [phase, setPhase] = useState('init')
  const { onLoading } = useGlobal()
  const hasCompletedRef = useRef(false)
  const targetProgressRef = useRef(0)
  const displayProgressRef = useRef(0)

  const enterAudioRef = useRef(null)
  const bgAudioRef = useRef(null)
  const bgmOnRef = useRef(true)
  const phaseRef = useRef('init')
  const enterPlayedRef = useRef(false)
  const bgPlayingRef = useRef(false)

  const siteName = siteConfig('ENDSPACE_LOADING_SITE_NAME', 'CLOUD09_NAV')
  const textInit = siteConfig('ENDSPACE_LOADING_TEXT_INIT', 'INITIALIZING')
  const textLoading = siteConfig('ENDSPACE_LOADING_TEXT_LOADING', 'LOADING')
  const textComplete = siteConfig('ENDSPACE_LOADING_TEXT_COMPLETE', 'READY')
  const textSweeping = siteConfig('ENDSPACE_LOADING_TEXT_SWEEPING', 'LAUNCHING')
  const textFadeout = siteConfig('ENDSPACE_LOADING_TEXT_FADEOUT', 'WELCOME')
  const loadingImage = siteConfig('ENDSPACE_LOADING_IMAGE', '')

  const playEnterThenBg = () => {
    if (!bgmOnRef.current || enterPlayedRef.current) return
    enterPlayedRef.current = true

    if (!enterAudioRef.current) {
      playBg()
      return
    }

    enterAudioRef.current.play().then(() => {
      enterAudioRef.current.addEventListener('ended', playBg, { once: true })
    }).catch(() => {
      playBg()
    })
  }

  const playBg = () => {
    if (!bgmOnRef.current || !bgAudioRef.current) return
    if (bgAudioRef.current.paused) {
      bgAudioRef.current.play().catch(() => {})
    }
    bgPlayingRef.current = true
  }

  const pauseBg = () => {
    if (bgAudioRef.current && !bgAudioRef.current.paused) {
      bgAudioRef.current.pause()
    }
    bgPlayingRef.current = false
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    bgmOnRef.current = localStorage.getItem('nav-bgm') !== 'off'

    const enterAudio = new Audio(ENTER_AUDIO)
    enterAudio.volume = 0.7
    enterAudioRef.current = enterAudio

    const bgAudio = new Audio(BG_AUDIO)
    bgAudio.loop = true
    bgAudio.volume = 0.4
    bgAudioRef.current = bgAudio

    return () => {
      if (enterAudioRef.current) {
        enterAudioRef.current.pause()
        enterAudioRef.current = null
      }
      if (bgAudioRef.current) {
        bgAudioRef.current.pause()
        bgAudioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const handleBgmToggle = (e) => {
      bgmOnRef.current = e.detail.on
      localStorage.setItem('nav-bgm', e.detail.on ? 'on' : 'off')

      if (e.detail.on) {
        playBg()
      } else {
        pauseBg()
      }
    }
    window.addEventListener('nav-bgm-toggle', handleBgmToggle)
    return () => window.removeEventListener('nav-bgm-toggle', handleBgmToggle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const initTimer = setTimeout(() => {
      setPhase('loading')
    }, 100)

    let totalResources = 0
    let loadedResources = 0

    const countResources = () => {
      const images = document.images
      totalResources = Math.max(1, images.length)

      for (let i = 0; i < images.length; i++) {
        if (images[i].complete) loadedResources++
      }

      for (let i = 0; i < images.length; i++) {
        if (!images[i].complete) {
          images[i].addEventListener('load', () => {
            loadedResources++
          })
          images[i].addEventListener('error', () => {
            loadedResources++
          })
        }
      }
    }
    countResources()

    let rafId = null
    const animate = () => {
      const target = targetProgressRef.current
      const current = displayProgressRef.current

      if (current < target) {
        const diff = target - current
        const step = Math.max(0.5, diff * 0.15)
        displayProgressRef.current = Math.min(target, current + step)
        setDisplayProgress(Math.floor(displayProgressRef.current))
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const progressInterval = setInterval(() => {
      const realProgress =
        totalResources > 0
          ? Math.floor((loadedResources / totalResources) * 100)
          : 0

      if (!onLoading) {
        targetProgressRef.current = 100
      } else {
        targetProgressRef.current = Math.min(90, Math.max(targetProgressRef.current, realProgress))
      }
    }, 30)

    const maxWaitTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        targetProgressRef.current = 100
      }
    }, 5000)

    return () => {
      clearTimeout(initTimer)
      clearInterval(progressInterval)
      clearTimeout(maxWaitTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [onLoading])

  useEffect(() => {
    if (!onLoading) {
      targetProgressRef.current = 100
    }
  }, [onLoading])

  useEffect(() => {
    if (displayProgress >= 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true

      setPhase('complete')

      const sweepTimer = setTimeout(() => {
        setPhase('sweeping')

        playEnterThenBg()

        setTimeout(() => {
          setPhase('fadeout')
          setTimeout(() => {
            setIsVisible(false)
            document.body.style.overflow = ''
          }, 300)
        }, 400)
      }, 100)

      return () => clearTimeout(sweepTimer)
    }
  }, [displayProgress])

  if (!isVisible) return null

  return (
    <div
      className={`loading-cover ${phase}`}
      style={{ 
        '--progress': `${displayProgress}%`, 
        '--progress-num': displayProgress,
        '--progress-info-x': `calc(${displayProgress} * (100vw - 6rem) / 100)`
      }}
    >
      <div className="progress-container">
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
      </div>

      <div className="center-content">
        {loadingImage && <img src={loadingImage} alt="Loading" className="loading-image" />}
        <div className="site-name">{siteName}</div>
      </div>

      <div className="progress-info">
        <div className="progress-percent">{Math.floor(displayProgress)}%</div>
        <div className="status-line">
          <span className="status-dot" />
          <span className="status-text">
            {phase === 'init' && textInit}
            {phase === 'loading' && textLoading}
            {phase === 'complete' && textComplete}
            {phase === 'sweeping' && textSweeping}
            {phase === 'fadeout' && textFadeout}
          </span>
        </div>
      </div>

      <div className="sweep-overlay" />

      <style>{`
        .loading-cover {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0f1419;
          z-index: 99999;
          overflow: hidden;
        }
        .center-content {
          position: absolute;
          top: 50%;
          right: 12%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          z-index: 10;
        }
        .loading-image {
          max-width: 240px;
          max-height: 240px;
          opacity: 0.9;
        }
        .site-name {
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-size: clamp(0.75rem, 1.5vw, 1rem);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          user-select: none;
        }
        .progress-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 12px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
        }
        .progress-track {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--progress);
          background: #FBFB46;
          transition: height 0.05s linear;
        }
        .progress-info {
          position: absolute;
          left: 24px;
          top: var(--progress);
          transform: translateY(-100%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          transition: top 0.05s linear;
          padding-bottom: 12px;
        }
        .progress-percent {
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: #FBFB46;
          letter-spacing: 2px;
          line-height: 1;
        }
        .status-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          background: #FBFB46;
          border-radius: 50%;
          animation: blink 0.8s ease-in-out infinite;
        }
        .status-text {
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(251, 251, 70, 0.8);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .sweep-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #FBFB46;
          transform: scaleX(0);
          transform-origin: left;
          pointer-events: none;
          z-index: 50;
        }
        .loading-cover.sweeping .sweep-overlay {
          animation: sweepCover 0.4s ease-in-out forwards;
        }
        .loading-cover.fadeout {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .loading-cover.fadeout .sweep-overlay {
          transform: scaleX(1);
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes sweepCover {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        @media (max-width: 768px) {
          .center-content {
            top: 50%;
            right: auto;
            left: 50%;
            transform: translate(-50%, -50%);
            gap: 16px;
          }
          .loading-image {
            max-width: 160px;
            max-height: 160px;
          }
          .site-name {
            font-size: 0.7rem;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingCover

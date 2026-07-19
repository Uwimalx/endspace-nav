import { useState, useEffect } from 'react'
import { siteConfig } from '@/config'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react'

export const TitleBar = ({ post }) => {
  const marqueeText = siteConfig('ENDSPACE_BANNER_WATERMARK_TEXT', 'CLOUD09_NAV')
  const siteName = siteConfig('SITE_NAME', 'CLOUD09_NAV')
  const siteBio = siteConfig('BIO', 'Navigation Terminal')
  const avatar = siteConfig('AVATAR', '/favicon.svg')

  const [bgmOn, setBgmOn] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('nav-bgm')
    if (saved === 'off') {
      setBgmOn(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('nav-bgm', bgmOn ? 'on' : 'off')
    const event = new CustomEvent('nav-bgm-toggle', { detail: { on: bgmOn } })
    window.dispatchEvent(event)
  }, [bgmOn])

  return (
    <div className="relative py-12 md:py-16 border-b-2 border-[var(--endspace-border-base)] overflow-hidden">
      {post && post.pageCoverThumbnail && (
        <div className="absolute inset-0">
          <img
            src={post.pageCoverThumbnail}
            alt={post.title || 'Cover'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, var(--endspace-text-muted) 2px, var(--endspace-text-muted) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, var(--endspace-text-muted) 2px, var(--endspace-text-muted) 4px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {!post && (
        <div className="absolute inset-0 flex items-center opacity-[0.12] pointer-events-none overflow-hidden">
          <div className="bg-watermark-scroll whitespace-nowrap leading-none">
            <span className="text-[8rem] md:text-[12rem] font-black text-[var(--endspace-text-primary)] select-none">
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">&#x2022;</span>
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--endspace-border-base)]">
            <img
              src={avatar}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-[var(--endspace-text-primary)] uppercase tracking-wider">
              {siteName}
            </h1>
            <p className="text-xs md:text-sm text-[var(--endspace-text-muted)] font-mono">
              {siteBio}
            </p>
          </div>
        </div>

        <button
          onClick={() => setBgmOn(!bgmOn)}
          className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
            bgmOn
              ? 'border-[var(--endspace-text-primary)] text-[var(--endspace-text-primary)] bg-[var(--endspace-bg-secondary)]'
              : 'border-[var(--endspace-text-muted)] text-[var(--endspace-text-muted)] bg-transparent'
          } hover:scale-110 active:scale-95`}
          aria-label={bgmOn ? 'Mute background music' : 'Play background music'}
        >
          {bgmOn ? (
            <IconVolume size={22} stroke={2} />
          ) : (
            <IconVolumeOff size={22} stroke={2} />
          )}
        </button>
      </div>

      <style>{`
        .bg-watermark-scroll {
          display: inline-block;
          animation: bgMarquee 30s linear infinite;
        }
        @keyframes bgMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default TitleBar

import { useState, useEffect } from 'react'
import { IconArrowUp } from '@tabler/icons-react'

const FloatingControls = ({ toc, ...props }) => {
  const [percent, setPercent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
      setPercent(p)
      setVisible(scrollTop > 200)
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 bottom-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
      <div
        className={`bg-[var(--endspace-bg-tertiary)]/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg flex flex-row gap-3 pointer-events-auto transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={handleScrollToTop}
          className="w-10 h-10 rounded-full bg-[var(--endspace-bg-primary)] flex items-center justify-center p-1 cursor-pointer group shadow-lg transition-transform active:scale-95"
          aria-label="Scroll To Top"
          title="Scroll To Top"
        >
          <div className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 bg-transparent group-hover:bg-[var(--endspace-accent-yellow)]">
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-[10px] font-bold font-mono text-[var(--endspace-text-secondary)] group-hover:hidden">
                {Math.round(percent)}%
              </span>
              <IconArrowUp
                size={20}
                stroke={2}
                className="text-[var(--endspace-on-accent)] hidden group-hover:block"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default FloatingControls

import LayoutBase from '@/theme/Layout'

const NotFoundPage = () => {
  return (
    <LayoutBase>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="endspace-card p-12 text-center tech-corner max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="relative flex justify-center items-center mb-6">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#fbfb46] opacity-90 pointer-events-none"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
              <div className="relative text-8xl font-black text-black z-10">
                404
              </div>
            </div>
            <div className="text-2xl font-bold text-[var(--endspace-text-primary)] mb-2">
              PAGE_NOT_FOUND
            </div>
            <div className="text-[var(--endspace-text-muted)] text-sm font-mono">
              The requested resource could not be located
            </div>
          </div>

          <a
            href="/"
            className="inline-block endspace-button-primary px-8 py-3 no-underline"
          >
            <span className="tech-text">RETURN_HOME</span>
          </a>

          <div className="mt-8 pt-8 border-t border-[var(--endspace-border-base)] flex items-center justify-center gap-4 text-xs text-[var(--endspace-text-muted)] tech-text">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>ERROR</span>
            </div>
            <span>|</span>
            <div>CODE: 404</div>
            <span>|</span>
            <div>STATUS: NOT_FOUND</div>
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

export default NotFoundPage

import { siteConfig } from '@/config'

export const Footer = ({ title }) => {
  const d = new Date()
  const y = d.getFullYear()

  return (
    <footer className="relative mt-20 bg-[#252726] text-gray-300 overflow-hidden">
      <div className="spectrum-bar opacity-30" />

      <div className="py-6 md:py-8 space-y-3 md:space-y-4 px-4">
        <div className="flex justify-center items-center gap-4 md:gap-6 text-sm font-mono md:-ml-10">
        </div>

        {siteConfig('BEI_AN') && (
          <div className="flex justify-center items-center text-sm font-mono text-gray-500 md:-ml-10">
            {siteConfig('BEI_AN_LINK') ? (
              <a
                href={siteConfig('BEI_AN_LINK')}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 hover:underline transition-colors py-1"
              >
                {siteConfig('BEI_AN')}
              </a>
            ) : (
              <span>{siteConfig('BEI_AN')}</span>
            )}
          </div>
        )}

        <div className="flex justify-center items-center text-xs font-mono text-gray-500 md:-ml-10">
          <div className="text-center">
            &copy;{' '}
            {siteConfig('SINCE') && siteConfig('SINCE') !== y
              ? `${siteConfig('SINCE')}-${y}`
              : y}{' '}
            {siteConfig('AUTHOR')}
            <span className="hidden sm:inline">. All Rights Reserved.</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-b-4 border-r-4 border-gray-800 opacity-50 hidden md:block" />
    </footer>
  )
}

export default Footer

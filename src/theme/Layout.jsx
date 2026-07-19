import { useEffect } from 'react'
import { siteConfig } from '@/config'
import { useGlobal } from '@/lib/global'
import TitleBar from '@/theme/components/TitleBar'
import Footer from '@/theme/components/Footer'
import LoadingCover from '@/theme/components/LoadingCover'
import FloatingControls from '@/theme/components/FloatingControls'
import useViewportScale from '@/theme/components/useViewportScale'

const LayoutBase = ({ children }) => {
  const { onLoading, fullWidth } = useGlobal()

  useViewportScale()

  const LOADING_COVER = siteConfig('ENDSPACE_LOADING_COVER', true)

  useEffect(() => {
    const siteName = siteConfig('SITE_NAME', '')
    if (siteName) {
      document.title = siteName
    }
  }, [])

  return (
    <div id="theme-endspace" className="min-h-screen relative">
      {LOADING_COVER && <LoadingCover />}

      <div className="flex flex-col min-h-screen">
        {!fullWidth && <TitleBar />}

        <div
          id="container-inner"
          className="w-full relative z-10 flex-grow"
        >
          <div
            id="container-wrapper"
            className="relative mx-auto justify-center md:flex py-8 px-4 md:px-8 lg:px-12 max-w-screen-xl xl:max-w-screen-2xl items-start"
          >
            <div
              className={`${
                fullWidth ? 'w-full' : 'max-w-5xl w-full mx-auto'
              }`}
            >
              <div
                className={`transition-all duration-700 transform ${
                  onLoading
                    ? 'opacity-0 translate-y-16'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {children}
              </div>
            </div>

            {!fullWidth && <div />}
          </div>
        </div>

        {!fullWidth && <Footer />}

        <FloatingControls />
      </div>
    </div>
  )
}

export default LayoutBase

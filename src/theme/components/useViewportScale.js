import { useEffect, useCallback } from 'react'
import { isBrowser } from '@/lib/utils'

const useViewportScale = (options = {}) => {
  const {
    landscapeBase = { width: 1440, height: 900 },
    portraitBase = { width: 390, height: 844 },
    baseFontSize = 16,
    minFontSize = 14,
    maxFontSize = 24
  } = options

  let _innerWidth = 0
  let _innerHeight = 0

  const applyScale = useCallback(() => {
    if (!isBrowser) return

    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    if (innerWidth === _innerWidth && innerHeight === _innerHeight) {
      return
    }
    _innerWidth = innerWidth
    _innerHeight = innerHeight

    let fontSize = baseFontSize

    if (innerHeight >= innerWidth) {
      const designWidth = portraitBase.width
      const designHeight = portraitBase.height

      if (innerWidth / innerHeight > designWidth / designHeight) {
        fontSize = baseFontSize * (innerHeight / designHeight)
      } else {
        fontSize = baseFontSize * (innerWidth / designWidth)
      }
    } else {
      const designWidth = landscapeBase.width
      const designHeight = landscapeBase.height

      if (innerWidth / innerHeight > designWidth / designHeight) {
        fontSize = baseFontSize * (innerHeight / designHeight)
      } else {
        fontSize = baseFontSize * (innerWidth / designWidth)
      }
    }

    fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize))

    const html = document.documentElement
    html.style.fontSize = `${fontSize}px`
    html.style.setProperty('--endspace-viewport-scale', (fontSize / baseFontSize).toString())
    html.style.setProperty('--endspace-base-font-size', `${fontSize}px`)
  }, [landscapeBase, portraitBase, baseFontSize, minFontSize, maxFontSize])

  useEffect(() => {
    if (!isBrowser) return

    applyScale()

    const handleResize = () => {
      applyScale()
    }

    const handleOrientationChange = () => {
      setTimeout(applyScale, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      document.documentElement.style.fontSize = ''
      document.documentElement.style.removeProperty('--endspace-viewport-scale')
      document.documentElement.style.removeProperty('--endspace-base-font-size')
    }
  }, [applyScale])

  return { applyScale }
}

export default useViewportScale

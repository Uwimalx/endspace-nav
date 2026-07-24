import { useEffect, useState } from 'react'
import { siteConfig } from '@/config'

// 根据主题色亮度计算对比色（黑或白），用于在主题色背景上显示文字
const getContrastColor = (hex) => {
  const m = hex.replace('#', '').match(/.{1,2}/g)
  if (!m) return '#000'
  const [r, g, b] = m.map((x) => parseInt(x, 16))
  // 感知亮度公式
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#000' : '#fff'
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const primary = siteConfig('ENDSPACE_THEME_COLOR', '#FBFB46')

    const darkColors = {
      bgBase: '#0f1419',
      bgPrimary: '#1a1f2e',
      bgSecondary: '#0f1419',
      bgTertiary: '#334155',
      textPrimary: '#f1f5f9',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      border: '#334155',
      gridColor: 'rgba(255,255,255,0.02)'
    }

    const lightColors = {
      bgBase: '#fafafa',
      bgPrimary: '#ffffff',
      bgSecondary: '#f4f4f5',
      bgTertiary: '#e4e4e7',
      textPrimary: '#18181b',
      textSecondary: '#52525b',
      textMuted: '#a1a1aa',
      border: '#e4e4e7',
      gridColor: 'rgba(0,0,0,0.03)'
    }

    const colors = isDark ? darkColors : lightColors
    const root = document.documentElement

    root.style.setProperty('--endspace-bg-base', colors.bgBase)
    root.style.setProperty('--endspace-bg-primary', colors.bgPrimary)
    root.style.setProperty('--endspace-bg-secondary', colors.bgSecondary)
    root.style.setProperty('--endspace-bg-tertiary', colors.bgTertiary)

    root.style.setProperty('--endspace-text-primary', colors.textPrimary)
    root.style.setProperty('--endspace-text-secondary', colors.textSecondary)
    root.style.setProperty('--endspace-text-muted', colors.textMuted)

    root.style.setProperty('--endspace-accent-yellow', primary)
    root.style.setProperty('--endspace-accent-yellow-dim', `${primary}26`)
    root.style.setProperty('--endspace-on-accent', getContrastColor(primary))
    const onAccentRgb = getContrastColor(primary) === '#000' ? '0, 0, 0' : '255, 255, 255'
    root.style.setProperty('--endspace-on-accent-60', `rgba(${onAccentRgb}, 0.6)`)
    root.style.setProperty('--endspace-on-accent-70', `rgba(${onAccentRgb}, 0.7)`)
    root.style.setProperty('--endspace-accent-cyan', '#62F0F5')
    root.style.setProperty('--endspace-accent-cyan-dim', 'rgba(98, 240, 245, 0.1)')

    root.style.setProperty('--endspace-border-base', colors.border)
    root.style.setProperty('--endspace-border-active', primary)
    root.style.setProperty('--endspace-grid-color', colors.gridColor)

    const bgFilter = isDark ? 'brightness(0.4) contrast(1.1) saturate(0.8)' : 'none'
    const bgOverlay = isDark ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(15,20,25,0.8) 50%, rgba(0,0,0,0.7) 100%)' : 'none'
    root.style.setProperty('--endspace-bg-filter', bgFilter)
    root.style.setProperty('--endspace-bg-overlay', bgOverlay)

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setIsDark(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return children
}

export default ThemeProvider
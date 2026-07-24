import { createContext, useContext, useEffect, useState } from 'react'
import { siteConfig } from './config'

const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [onLoading, setOnLoading] = useState(true)
  const [locale, setLocale] = useState('zh-CN')
  const [fullWidth, setFullWidth] = useState(false)

  const siteInfo = {
    title: siteConfig('SITE_NAME', 'Endspace'),
    icon: siteConfig('LOGO', '/favicon.svg'),
    description: siteConfig('BIO', '')
  }

  const NOTION_CONFIG = null

  useEffect(() => {
    const timer = setTimeout(() => setOnLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const value = {
    onLoading,
    setOnLoading,
    locale,
    siteInfo,
    fullWidth,
    setFullWidth,
    NOTION_CONFIG
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const ctx = useContext(GlobalContext)
  if (!ctx) throw new Error('useGlobal must be used within GlobalProvider')
  return ctx
}

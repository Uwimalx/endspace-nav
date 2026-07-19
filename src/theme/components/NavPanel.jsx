import { useMemo, useState } from 'react'
import { siteConfig } from '@/config'
import { IconSearch, IconArrowUpRight, IconExternalLink } from '@tabler/icons-react'

const FAVICON_SOURCES = [
  (domain) => `https://favicon.run/favicon?domain=${domain}&sz=64`,
  (domain) => `https://a.favicon.im/${domain}`,
]

const resolveHost = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

const NavCard = ({ link, newTab }) => {
  const host = resolveHost(link.url)
  const [iconSrc, setIconSrc] = useState(() => {
    if (link.icon) return link.icon
    if (!host) return ''
    return FAVICON_SOURCES[0](host)
  })
  const [iconLoaded, setIconLoaded] = useState(false)
  const [iconFailed, setIconFailed] = useState(false)
  const [retryIndex, setRetryIndex] = useState(0)

  const handleIconError = () => {
    if (link.icon) {
      setIconFailed(true)
      return
    }
    const nextIndex = retryIndex + 1
    if (nextIndex < FAVICON_SOURCES.length && host) {
      setRetryIndex(nextIndex)
      setIconSrc(FAVICON_SOURCES[nextIndex](host))
    } else {
      setIconFailed(true)
    }
  }

  const showIcon = iconSrc && !iconFailed
  return (
    <a
      href={link.url}
      target={newTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="nav-card endspace-frame group relative flex flex-col p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--endspace-accent-yellow)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--endspace-on-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      <div className="relative z-10 flex items-start gap-3">
        <div className="nav-card-icon flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--endspace-bg-secondary)] border border-[var(--endspace-border-base)] group-hover:bg-[var(--endspace-on-accent)] group-hover:border-[var(--endspace-on-accent)] transition-colors">
          {showIcon ? (
            <img
              src={iconSrc}
              alt={link.name}
              className="w-6 h-6 object-contain transition-all"
              referrerPolicy="no-referrer"
              onLoad={() => setIconLoaded(true)}
              onError={handleIconError}
            />
          ) : (
            <IconExternalLink
              size={18}
              className="text-[var(--endspace-text-muted)] group-hover:text-[var(--endspace-on-accent)] transition-colors"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="nav-card-title text-sm font-bold text-[var(--endspace-text-primary)] group-hover:text-[var(--endspace-on-accent)] transition-colors truncate">
              {link.name}
            </h3>
            <IconArrowUpRight
              size={14}
              stroke={2}
              className="flex-shrink-0 text-[var(--endspace-text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--endspace-on-accent)] -translate-x-1 group-hover:translate-x-0 transition-all"
            />
          </div>
          {link.desc && (
            <p className="nav-card-desc text-xs text-[var(--endspace-text-muted)] group-hover:text-[var(--endspace-on-accent-70)] transition-colors mt-1 line-clamp-2 leading-relaxed">
              {link.desc}
            </p>
          )}
          <div className="nav-card-host tech-text text-[10px] text-[var(--endspace-text-muted)] group-hover:text-[var(--endspace-on-accent-60)] transition-colors mt-2 truncate">
            {(() => {
              try {
                return new URL(link.url).hostname.replace(/^www\./, '')
              } catch {
                return link.url
              }
            })()}
          </div>
        </div>
      </div>
    </a>
  )
}

export const NavPanel = () => {
  const enabled = siteConfig('ENDSPACE_NAV_PANEL', true)
  const title = siteConfig('ENDSPACE_NAV_TITLE', 'NAVIGATION')
  const subtitle = siteConfig('ENDSPACE_NAV_SUBTITLE', '')
  const newTab = siteConfig('ENDSPACE_NAV_NEW_TAB', true)
  const groups = siteConfig('ENDSPACE_NAV_GROUPS', [])

  const [keyword, setKeyword] = useState('')

  const filteredGroups = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return groups
    return groups
      .map((g) => ({
        ...g,
        links: g.links.filter(
          (l) =>
            l.name?.toLowerCase().includes(kw) ||
            l.desc?.toLowerCase().includes(kw) ||
            l.url?.toLowerCase().includes(kw)
        )
      }))
      .filter((g) => g.links.length > 0)
  }, [keyword, groups])

  const totalLinks = useMemo(
    () => groups.reduce((n, g) => n + (g.links?.length || 0), 0),
    [groups]
  )

  if (!enabled) return null

  return (
    <div className="nav-panel w-full">
      <section className="nav-hero relative mb-10">
        <div className="flex items-end gap-3 pb-3 border-b-2 border-[var(--endspace-text-primary)] relative">
          <h1 className="text-4xl md:text-6xl font-black text-[var(--endspace-text-primary)] tracking-tight relative z-10">
            {title}
          </h1>
          <span className="endspace-section-meta">
            // {totalLinks}_LINKS_INDEXED
          </span>
          <div className="flex-1" />
        </div>
        {subtitle && (
          <div className="tech-text text-xs md:text-sm text-[var(--endspace-text-muted)] mt-2 tracking-widest">
            {subtitle}
          </div>
        )}
      </section>

      <section className="nav-search mb-10">
        <div className="nav-search-box endspace-frame flex items-center gap-3 px-4 py-3">
          <IconSearch
            size={18}
            className="text-[var(--endspace-text-muted)] flex-shrink-0"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="FILTER_LINKS..."
            className="tech-text flex-1 bg-transparent outline-none text-sm text-[var(--endspace-text-primary)] placeholder:text-[var(--endspace-text-muted)] tracking-wider"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="tech-text text-xs text-[var(--endspace-text-muted)] hover:text-[var(--endspace-text-primary)] transition-colors px-2"
            >
              CLEAR
            </button>
          )}
        </div>
      </section>

      {filteredGroups.length === 0 ? (
        <div className="nav-empty endspace-card p-12 text-center">
          <div className="tech-text text-[var(--endspace-text-muted)]">
            NO_RESULTS_FOUND // "{keyword}"
          </div>
        </div>
      ) : (
        filteredGroups.map((group, gi) => (
          <section key={group.title || gi} className="nav-group mb-12">
            <div className="flex items-end gap-3 mb-5 pb-2 border-b border-[var(--endspace-border-base)] relative">
              <span className="ef-index-badge !relative !top-0 !left-0">
                {String(gi + 1).padStart(2, '0')}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--endspace-text-primary)] uppercase tracking-wide">
                {group.title}
              </h2>
              <span className="endspace-section-meta">
                // {group.links.length}_NODES
              </span>
              <div className="flex-1" />
            </div>

            <div className="nav-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.links.map((link, li) => (
                <NavCard key={link.url + li} link={link} newTab={newTab} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

export default NavPanel

import { siteConfig } from '@/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'

export const MobileNav = (props) => {
  const { siteInfo } = useGlobal()

  const avatarUrl =
    props?.siteInfo?.icon || siteInfo?.icon || siteConfig('AVATAR')

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white border-b border-[var(--endspace-border-base)] safe-area-top">
        <div className="flex items-center justify-between h-16 px-5">
          <SmartLink href="/" title="Home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--endspace-text-primary)] uppercase tracking-wider">
                {siteConfig('SITE_NAME') || ''}
              </span>
              <span className="text-xs text-[var(--endspace-text-muted)]">
                {siteConfig('BIO') || ''}
              </span>
            </div>
          </SmartLink>
        </div>
      </nav>

      <div className="h-16 md:hidden" />
    </>
  )
}

export default MobileNav

import LayoutBase from '@/theme/Layout'
import NavPanel from '@/theme/components/NavPanel'
import { siteConfig } from '@/config'

const HomePage = () => {
  return (
    <LayoutBase>
      {siteConfig('ENDSPACE_NAV_PANEL', true) ? (
        <NavPanel />
      ) : (
        <div className="endspace-frame p-8">
          <h1 className="text-3xl font-black">Welcome</h1>
          <p className="text-[var(--endspace-text-secondary)] mt-4">
            启用 ENDSPACE_NAV_PANEL 以显示导航面板。
          </p>
        </div>
      )}
    </LayoutBase>
  )
}

export default HomePage

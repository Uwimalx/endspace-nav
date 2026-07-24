import { useState, useRef } from 'react'
import { siteConfig } from '@/config'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { EndspacePlayer } from './EndspacePlayer'
import { IconBrandX } from '@tabler/icons-react'
import RadarFillIcon from 'remixicon-react/RadarFillIcon'

import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import WeiboFillIcon from 'remixicon-react/WeiboFillIcon'
import BilibiliFillIcon from 'remixicon-react/BilibiliFillIcon'
import TelegramFillIcon from 'remixicon-react/TelegramFillIcon'
import InstagramFillIcon from 'remixicon-react/InstagramFillIcon'
import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon'
import LinkedinBoxFillIcon from 'remixicon-react/LinkedinBoxFillIcon'
import WechatFillIcon from 'remixicon-react/WechatFillIcon'
import GlobeFillIcon from 'remixicon-react/GlobeFillIcon'
import MailFillIcon from 'remixicon-react/MailFillIcon'

const SocialIconComponents = {
  CONTACT_GITHUB: GithubFillIcon,
  CONTACT_TWITTER: IconBrandX,
  CONTACT_WEIBO: WeiboFillIcon,
  CONTACT_BILIBILI: BilibiliFillIcon,
  CONTACT_TELEGRAM: TelegramFillIcon,
  CONTACT_INSTAGRAM: InstagramFillIcon,
  CONTACT_YOUTUBE: YoutubeFillIcon,
  CONTACT_LINKEDIN: LinkedinBoxFillIcon,
  CONTACT_WEHCHAT_PUBLIC: WechatFillIcon,
  CONTACT_ZHISHIXINGQIU: GlobeFillIcon
}

export const SideNav = (props) => {
  const { siteInfo } = useGlobal()
  const { customNav, customMenu } = props
  const [isHovered, setIsHovered] = useState(false)
  const emailIcon = useRef(null)

  const avatarUrl =
    props?.siteInfo?.icon || siteInfo?.icon || siteConfig('LOGO')

  const socialLinks = [
    { key: 'CONTACT_GITHUB', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', label: 'Twitter' },
    { key: 'CONTACT_WEIBO', label: 'Weibo' },
    { key: 'CONTACT_BILIBILI', label: 'Bilibili' },
    { key: 'CONTACT_TELEGRAM', label: 'Telegram' },
    { key: 'CONTACT_INSTAGRAM', label: 'Instagram' },
    { key: 'CONTACT_YOUTUBE', label: 'YouTube' },
    {
      key: 'CONTACT_XIAOHONGSHU',
      svg: '/svg/xiaohongshu.svg',
      label: 'Xiaohongshu'
    },
    { key: 'CONTACT_LINKEDIN', label: 'LinkedIn' },
    { key: 'CONTACT_ZHISHIXINGQIU', label: 'Zhishixingqiu' },
    { key: 'CONTACT_WEHCHAT_PUBLIC', label: 'WeChat' }
  ]

  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')

  const renderSocialIcon = (key, svg, label) => {
    if (svg) {
      return (
        <img
          src={svg}
          alt={label}
          className="w-3 h-3 opacity-60 hover:opacity-100"
        />
      )
    }
    const IconComponent = SocialIconComponents[key]
    if (IconComponent) {
      return <IconComponent size={14} stroke={1.5} />
    }
    return null
  }

  return (
    <div
      className={`fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col bg-[var(--endspace-bg-base)] border-r border-[var(--endspace-border-base)] transition-all duration-300 ease-in-out shadow-md ${
        isHovered ? 'w-[16rem]' : 'w-[5rem]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 h-[10rem] py-6 flex flex-col items-center">
        <SmartLink href="/" title="Home">
          <div className="w-[3rem] h-[3rem] flex-shrink-0 transition-transform duration-300 cursor-pointer hover:scale-105">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover shadow-lg transition-colors"
            />
          </div>
        </SmartLink>
        <div
          className={`mt-3 text-center transition-all duration-300 overflow-hidden ${
            isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
          }`}
        >
          <SmartLink href="/" className="hover:text-[var(--endspace-accent-yellow)] transition-colors">
            <div className="text-sm font-bold text-[var(--endspace-text-primary)] uppercase tracking-wider">
              {siteConfig('AUTHOR') || ''}
            </div>
          </SmartLink>
          <div className="text-xs text-[var(--endspace-text-muted)] mt-1 px-3 line-clamp-3 leading-relaxed">
            {siteConfig('BIO') || ''}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex-shrink-0 flex flex-col justify-end h-auto pb-4">
        <div
          className={`mx-auto transition-[width] duration-300 ease-out ${
            isHovered ? 'w-[13.5rem]' : 'w-[3rem]'
          }`}
        >
          <div
            className={`overflow-visible border border-gray-200 bg-gray-100/95 shadow-sm transition-[border-radius] duration-200 ${
              isHovered
                ? 'h-[7rem] rounded-2xl px-3 py-2'
                : 'h-[6.75rem] rounded-full px-1 py-2'
            }`}
          >
            <div
              className={`flex items-center justify-center ${
                isHovered ? 'h-[3rem]' : 'h-10'
              }`}
            >
              <EndspacePlayer isExpanded={isHovered} embedded />
            </div>

            <div
              className={`mx-auto h-px bg-gray-300/80 transition-[width] duration-300 ease-out ${
                isHovered ? 'my-1.5 w-full' : 'my-2 w-5'
              }`}
            />

            <div className="flex h-10 items-center justify-center overflow-hidden">
              <div
                className={`flex justify-center transition-opacity duration-150 ${
                  isHovered
                    ? 'pointer-events-none absolute opacity-0'
                    : 'opacity-100'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-500 rounded-full cursor-pointer hover:text-black hover:bg-gray-200 transition-colors">
                  <RadarFillIcon size={18} />
                </div>
              </div>

              <div
                className={`transition-opacity duration-150 ${
                  isHovered ? 'opacity-100' : 'pointer-events-none absolute opacity-0'
                }`}
              >
                <div className="mx-auto flex w-full items-center justify-center gap-1.5 flex-nowrap px-1">
                  {CONTACT_EMAIL && (
                    <a
                      onClick={(e) =>
                        handleEmailClick(e, emailIcon, CONTACT_EMAIL)
                      }
                      title="email"
                      className="w-[1.75rem] h-[1.75rem] flex cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 hover:text-black flex-shrink-0"
                      ref={emailIcon}
                    >
                      <MailFillIcon size={14} />
                    </a>
                  )}

                  {socialLinks.map(({ key, svg, label }) => {
                    const url = siteConfig(key)
                    if (!url) return null
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        title={label}
                        className="w-[1.75rem] h-[1.75rem] flex items-center justify-center text-gray-500 rounded-full hover:text-black hover:bg-gray-200 transition-colors flex-shrink-0"
                      >
                        {renderSocialIcon(key, svg, label)}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="flex justify-center">
            <div
              className="w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer"
              title={isHovered ? 'Collapse' : 'Expand'}
            >
              <div
                className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transition-transform duration-300 ${
                  isHovered
                    ? 'border-r-[10px] border-r-[var(--endspace-text-primary)] border-l-0'
                    : 'border-l-[10px] border-l-[var(--endspace-text-primary)] border-r-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav

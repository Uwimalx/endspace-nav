import { Link } from 'react-router-dom'

const SmartLink = ({ href, children, ...rest }) => {
  const isExternal =
    href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))

  if (isExternal) {
    const { passHref, legacyBehavior, ...restWithoutNext } = rest
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...restWithoutNext}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href || '/'} {...rest}>
      {children}
    </Link>
  )
}

export default SmartLink

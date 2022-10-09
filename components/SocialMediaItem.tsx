import Link from 'next/link'

import { Facebook } from '../icons/Facebook'
import { GitHub } from '../icons/Github'
import { Instagram } from '../icons/Instagram'
import { Twitter } from '../icons/Twitter'

interface SocialMediaItemProps {
  href: string
  name: string
}

const getIconFromName = (iconName: string) => {
  switch (iconName) {
    case 'facebook':
      return <Facebook />
    case 'instagram':
      return <Instagram />
    case 'twitter':
      return <Twitter />
    case 'github':
      return <GitHub />
  }
}

export const SocialMediaItem = ({ href, name }: SocialMediaItemProps) => {
  const icon = getIconFromName(name)

  return (
    <Link href={href}>
      <a
        href='/'
        rel='noreferrer'
        target='_blank'
        className='text-gray-700 transition hover:text-gray-700/75'
      >
        <span className='sr-only'>{name}</span>
        {icon}
      </a>
    </Link>
  )
}

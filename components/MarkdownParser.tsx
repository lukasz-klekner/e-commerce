import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'

import { MarkdownResult } from '../types'

export const MarkdownParser = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />
          }

          const APP_URL = process.env.APP_URL!
          // console.log(process.env.APP_URL)
          // console.log(APP_URL)

          // if (!APP_URL) {
          //   throw new Error(`Missing APP_URL env variable!`)
          // }

          if (
            href.startsWith('http://' || 'https://') &&
            !href.startsWith(APP_URL)
          ) {
            return (
              <a
                {...props}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
              />
            )
          }

          return (
            <Link href={href}>
              <a {...props} />
            </Link>
          )
        },
      }}
    />
  )
}

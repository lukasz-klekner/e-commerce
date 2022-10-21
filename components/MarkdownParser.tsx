import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export const MarkdownParser = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />
          }

          const APP_URL = process.env.APP_URL!

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
    >
      {children}
    </ReactMarkdown>
  )
}

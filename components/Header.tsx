import Link from "next/link";
import { useRouter } from "next/router";
import clsx from 'clsx'

export const Header = () => {
  const { asPath } = useRouter()

  return (
  <header className="bg-gray-900 text-white px-4 py-2">
    <nav>
      <ul className="flex gap-2">
        <li>
            <Link href='/'>
                <a className={`${clsx(asPath === '/' && 'underline')}`}>
                    Home
                </a>
            </Link>
        </li>
        <li>
          <Link href='/about'>
                  <a className={`${clsx(asPath === '/about' && 'underline')}`}>
                      About
                  </a>
              </Link>
        </li>
      </ul>
    </nav>
  </header>
)
}
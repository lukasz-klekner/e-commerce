import { Logo } from '../icons/Logo'
import { SocialMediaItem } from './SocialMediaItem'

const socialMediaItems = [
  { name: 'facebook', href: '/' },
  { name: 'instagram', href: '/' },
  { name: 'twitter', href: '/' },
  { name: 'github', href: '/' },
]

export const Footer = () => {
  return (
    <footer className='bg-gray-100'>
      <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='flex justify-center text-teal-600'>
          <Logo />
        </div>

        <p className='mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        {/* <nav className="mt-12" aria-labelledby="footer-navigation">
          <h2 className="sr-only" id="footer-navigation">Footer navigation</h2>

          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                About
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                Careers
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                History
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                Services
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                Projects
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
                Blog
              </a>
            </li>
          </ul>
        </nav> */}

        <ul className='mt-12 flex justify-center gap-6 md:gap-8'>
          {socialMediaItems.map(({ href, name }) => (
            <li key={name} className='h-6 w-6'>
              <SocialMediaItem href={href} name={name} />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

import Link from "next/link"

interface NavLinkProps {
    href: string
    name: string
}

export const NavLink = ({ href, name }: NavLinkProps) => {
    return(
        <Link href={href}>
        <a
        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
      >
        {name}
      </a>
      </Link>
  )
    }
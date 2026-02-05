import { createNavigation } from 'next-intl/navigation'

export const locales = ['en', 'th'] as const

export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = createNavigation({ locales })

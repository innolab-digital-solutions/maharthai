// components/localization/LocaleSwitcher.tsx
'use client'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const locales = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'th', label: 'ไทย', flag: '🇹🇭' },
]

const LocaleSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChange = (newLocale: string) => {
    startTransition(() => {
      const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
      const newPath = `/${newLocale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`
      router.replace(newPath)
    })
  }

  return (
    <Select value={locale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[120px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            {locales.find(l => l.value === locale)?.flag}
            <span>{locales.find(l => l.value === locale)?.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" className="z-50 bg-white">
        {locales.map((loc) => (
          <SelectItem key={loc.value} value={loc.value}>
            <div className="flex items-center gap-2">
              <span>{loc.flag}</span>
              <span>{loc.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher
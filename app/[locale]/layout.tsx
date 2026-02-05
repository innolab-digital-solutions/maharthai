import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (

        <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>

  )
}

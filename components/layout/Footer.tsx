'use client'

import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <div className="w-full mt-20 bg-white">
      <div className="
        max-w-7xl mx-auto
        grid grid-cols-1 md:grid-cols-4
        gap-8
        px-5 md:px-10 py-16
        md:justify-items-center
        px-10 md:px-0
      ">
        <div className="md:max-w-[250px]">
              <div className='flex items-center mb-2 gap-1'>
                 <Image src="/logo.jpg" width={32} height={32} alt="logo" className='mb-1'/>

          <h2 className="font-semibold text-lg ">
            MaharThai</h2>
              </div>
          <p className='text-slate-500'>{t('tagline')}</p>
        </div>

        <div className="md:max-w-[250px]">
          <h2 className="font-semibold text-lg mb-4">{t('services')}</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>{t('babysitting')}</li>
            <li>{t('cleaning')}</li>
            <li>{t('cooking')}</li>
            <li>{t('driving')}</li>
            <li>{t('caretaking')}</li>
          </ul>
        </div>

        <div className="md:max-w-[250px]">
          <h2 className="font-semibold text-lg mb-4">{t('company')}</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>{t('aboutUs')}</li>
            <li>{t('career')}</li>
            <li>{t('privacyPolicy')}</li>
            <li>{t('termsOfService')}</li>
          </ul>
        </div>

        <div className="md:max-w-[250px]">
          <h2 className="font-semibold text-lg mb-4">{t('support')}</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>{t('helpCenter')}</li>
            <li>{t('contact')}</li>
            <li>{t('faq')}</li>
          </ul>
        </div>
      </div>

        {/* end of footer */}
<div className="max-w-7xl mx-auto px-5 md:px-10">
  <div className="
    border-t border-slate-300
    py-6
    flex flex-col md:flex-row
    items-center
    justify-between
    gap-4
  ">
    <p className="text-sm text-slate-500 text-center md:text-left">
      &copy; {new Date().getFullYear()} MaharThai. {t('rights')}
    </p>

    <div className="flex items-center gap-4">
      <Link href="#">
        <Facebook className="text-slate-500 cursor-pointer hover:text-primary transition-colors" />
      </Link>

      <Link href="#">
        <Instagram className="text-slate-500 cursor-pointer hover:text-primary transition-colors" />
      </Link>
    </div>
  </div>
</div>

    </div>
  )
}


export default Footer
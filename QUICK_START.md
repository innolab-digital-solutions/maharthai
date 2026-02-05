# Quick Start Guide - Localization

## 🚀 Getting Started

Your MaharThai app now has full English (en) and Thai (th) localization!

## Testing the Implementation

### Run the Development Server
```bash
npm run dev
# or
yarn dev
```

### Visit the App
- **English**: `http://localhost:3000/en`
- **Thai**: `http://localhost:3000/th`
- **Default**: `http://localhost:3000` → redirects to `/en`

### Test Language Switching
1. Look for the language selector in the navbar (desktop) or mobile menu
2. Click to switch between English and Thai
3. Notice the URL changes and all text updates

## File Changes Overview

### New Files Created:
```
components/localization/LocaleSwitcher.tsx  - Language switcher component
LOCALIZATION_GUIDE.md                        - Comprehensive guide
IMPLEMENTATION_SUMMARY.md                    - Summary of changes
```

### Modified Files:
```
app/layout.tsx                               - Added suppressHydrationWarning
messages/en.json                             - Comprehensive English translations
messages/th.json                             - Comprehensive Thai translations
components/layout/Navbar.tsx                 - Uses useTranslations('nav')
components/layout/Footer.tsx                 - Uses useTranslations('footer')
components/layout/MobileMenu.tsx             - Translated + LocaleSwitcher added
components/pages/home/HeroSection.tsx        - Uses useTranslations('home')
components/pages/home/FindTheWorker.tsx      - Uses useTranslations('footer')
components/pages/home/HowItWorks.tsx         - Uses useTranslations('home')
```

### Unchanged (Already Configured):
```
app/i18n.ts                                  - i18n configuration
app/middleware.ts                            - Locale routing middleware
app/[locale]/layout.tsx                      - NextIntlClientProvider wrapper
```

## 📝 Translation Keys Available

### Navigation (nav.*)
- `nav.home` - Home
- `nav.services` - Services
- `nav.about` - About Us
- `nav.login` - Log In
- `nav.signup` - Sign Up
- `nav.language` - Language

### Footer (footer.*)
- `footer.tagline` - Company tagline
- `footer.services`, `babysitting`, `cleaning`, `cooking`, `driving`, `caretaking` - Service types
- `footer.company`, `aboutUs`, `career`, `privacyPolicy`, `termsOfService` - Company links
- `footer.support`, `helpCenter`, `contact`, `faq` - Support links
- `footer.rights` - Copyright notice

### Home Page (home.*)
- `home.hero.title` - Hero section title
- `home.hero.subtitle` - Hero section subtitle
- `home.hero.cta` - Hero CTA button text
- `home.findWorker.title` - Section title
- `home.findWorker.description` - Section description
- `home.howItWorks.title` - Section title
- `home.howItWorks.step1`, `step2`, `step3` - Step titles
- `home.howItWorks.step1Desc`, `step2Desc`, `step3Desc` - Step descriptions

## 🎨 UI Components Updated

| Component | Location | Status | Notes |
|-----------|----------|--------|-------|
| Navbar | layout/ | ✓ Updated | Includes LocaleSwitcher |
| Footer | layout/ | ✓ Updated | All content translated |
| MobileMenu | layout/ | ✓ Updated | LocaleSwitcher in menu |
| HeroSection | pages/home/ | ✓ Updated | Dynamic title/subtitle |
| FindTheWorker | pages/home/ | ✓ Updated | Service names translated |
| HowItWorks | pages/home/ | ✓ Updated | Steps fully translated |

## 💡 Usage Examples

### In a Client Component
```typescript
'use client'

import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('home')
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  )
}
```

### In a Server Component
```typescript
import { getTranslations } from 'next-intl/server'

export default function MyComponent() {
  const t = getTranslations('nav')
  
  return <button>{t('login')}</button>
}
```

## ➕ Adding New Translations

### Step 1: Add to English file
```json
// messages/en.json
{
  "newSection": {
    "newKey": "English text here"
  }
}
```

### Step 2: Add to Thai file
```json
// messages/th.json
{
  "newSection": {
    "newKey": "ข้อความภาษาไทยที่นี่"
  }
}
```

### Step 3: Use in component
```typescript
const t = useTranslations('newSection')
return <div>{t('newKey')}</div>
```

## 🔧 URL Structure

- `/en/` - English version (default)
- `/en/workers` - English workers page
- `/th/` - Thai version
- `/th/workers` - Thai workers page

The locale is automatically handled by the middleware and URL structure.

## ✅ Verification Checklist

- [ ] Run `npm run dev`
- [ ] Visit `http://localhost:3000` (should redirect to `/en`)
- [ ] Check navbar has language switcher
- [ ] Try switching language - URL should change
- [ ] Check footer displays translated content
- [ ] Check mobile menu has language switcher
- [ ] Verify all page text is translated
- [ ] Test both English and Thai thoroughly

## 📚 Documentation Files

1. **LOCALIZATION_GUIDE.md** - Detailed guide with examples
2. **IMPLEMENTATION_SUMMARY.md** - Overview of all changes
3. **This file** - Quick start reference

## 🆘 Common Issues & Solutions

**Issue**: Locale switcher not working
- Solution: Ensure LocaleSwitcher is inside NextIntlClientProvider

**Issue**: Translations showing as keys (e.g., "nav.home")
- Solution: Check translation key spelling matches JSON file

**Issue**: Getting 404 on `/en` or `/th`
- Solution: Clear browser cache and restart dev server

## 🎯 Next Steps

1. ✅ Test current implementation
2. ➕ Add more translation keys as needed
3. 🎨 Customize styling (if needed)
4. 📱 Test on mobile devices
5. 🚀 Deploy to production

## 📞 Support

Refer to:
- **LOCALIZATION_GUIDE.md** - For detailed setup
- **IMPLEMENTATION_SUMMARY.md** - For what changed
- [next-intl docs](https://next-intl-docs.vercel.app/) - For advanced features

---

**Happy translating! 🌍**

Your MaharThai app now supports both English and Thai languages seamlessly!

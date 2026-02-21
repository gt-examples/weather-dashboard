# Weather Dashboard

A multilingual weather dashboard demonstrating locale-aware number formatting, date localization, and translated weather content with [gt-next](https://generaltranslation.com/docs/next) and Next.js.

**[Live Demo](https://weather-dashboard.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This app showcases how gt-next handles locale-aware formatting for temperatures, percentages, dates, and weather conditions. All numbers and dates automatically adapt when switching languages. Built with General Translation.

## GT Features Used

- `<T>` — JSX translation
- `<Num>` — Locale-aware number formatting
- `<DateTime>` — Date localization
- `getGT` — Server-side string translations
- `<LocaleSelector>` — Language picker
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)

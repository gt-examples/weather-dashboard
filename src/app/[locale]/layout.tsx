import { Geist } from "next/font/google";
import { GTProvider } from "gt-next";
import { getLocale } from "gt-next/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const locales = ["en", "es", "fr", "ja", "zh"];
const baseUrl = "https://weather-dashboard.generaltranslation.dev";

export async function generateMetadata() {
  const locale = await getLocale();
  const titles: Record<string, string> = {
    en: "Weather Dashboard | GT",
    es: "Panel del Clima | GT",
    fr: "Tableau Météo | GT",
    ja: "天気ダッシュボード | GT",
    zh: "天气仪表盘 | GT",
  };
  const descriptions: Record<string, string> = {
    en: "Multilingual weather dashboard demonstrating gt-next locale-aware formatting for temperatures, dates, and forecasts",
    es: "Panel meteorológico multilingüe que demuestra el formato de gt-next para temperaturas, fechas y pronósticos",
    fr: "Tableau de bord météo multilingue démontrant le formatage de gt-next pour les températures, dates et prévisions",
    ja: "gt-nextのロケール対応フォーマットを使用した多言語天気ダッシュボード",
    zh: "使用gt-next展示温度、日期和天气预报的多语言天气仪表盘",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased`}>
        <GTProvider>{children}</GTProvider>
      </body>
    </html>
  );
}

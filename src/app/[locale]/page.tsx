import { T, Num, DateTime } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";

type Condition = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";

interface ForecastDay {
  date: Date;
  high: number;
  low: number;
  condition: Condition;
  humidity: number;
  wind: number;
}

function getWeatherIcon(condition: Condition) {
  switch (condition) {
    case "sunny":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "cloudy":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "rainy":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16" y1="13" x2="16" y2="21" />
          <line x1="8" y1="13" x2="8" y2="21" />
          <line x1="12" y1="15" x2="12" y2="23" />
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
        </svg>
      );
    case "snowy":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <line x1="8" y1="16" x2="8.01" y2="16" />
          <line x1="8" y1="20" x2="8.01" y2="20" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
          <line x1="12" y1="22" x2="12.01" y2="22" />
          <line x1="16" y1="16" x2="16.01" y2="16" />
          <line x1="16" y1="20" x2="16.01" y2="20" />
        </svg>
      );
    case "stormy":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
          <polyline points="13 11 9 17 15 17 11 23" />
        </svg>
      );
  }
}

const conditionLabels: Record<Condition, string> = {
  sunny: "Sunny",
  cloudy: "Cloudy",
  rainy: "Rainy",
  snowy: "Snowy",
  stormy: "Stormy",
};

// Static mock data
const currentTemp = 22;
const currentCondition: Condition = "sunny";
const currentHumidity = 45;
const currentWind = 12;
const feelsLike = 24;
const uvIndex = 6;
const visibility = 16;
const pressure = 1013;

const forecast: ForecastDay[] = [
  { date: new Date(2026, 1, 19), high: 24, low: 14, condition: "sunny", humidity: 40, wind: 10 },
  { date: new Date(2026, 1, 20), high: 21, low: 13, condition: "cloudy", humidity: 55, wind: 15 },
  { date: new Date(2026, 1, 21), high: 18, low: 11, condition: "rainy", humidity: 75, wind: 22 },
  { date: new Date(2026, 1, 22), high: 15, low: 8, condition: "stormy", humidity: 85, wind: 35 },
  { date: new Date(2026, 1, 23), high: 12, low: 5, condition: "snowy", humidity: 70, wind: 18 },
  { date: new Date(2026, 1, 24), high: 17, low: 9, condition: "cloudy", humidity: 60, wind: 14 },
  { date: new Date(2026, 1, 25), high: 23, low: 15, condition: "sunny", humidity: 38, wind: 8 },
];

export default async function Home() {
  const gt = await getGT();

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <h1 className="text-sm font-semibold text-neutral-100">
              Weather Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/weather-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
            <T>Current conditions</T>
          </h2>
          <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
            <T>
              Locale-aware weather data with formatted temperatures, dates, and
              measurements. Switch languages to see how numbers and dates adapt
              to each locale.
            </T>
          </p>
        </div>

        {/* Current Weather Card */}
        <div className="border border-neutral-800 rounded-lg p-6 mb-8 bg-neutral-900/50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-neutral-500 uppercase tracking-wide mb-1">
                <T>San Francisco, CA</T>
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light text-neutral-100">
                  <Num>{currentTemp}</Num>
                </span>
                <span className="text-2xl text-neutral-500">°C</span>
              </div>
              <p className="text-sm text-neutral-400 mt-1">
                <T>
                  Feels like <Num>{feelsLike}</Num>°C
                </T>
              </p>
            </div>
            <div className="text-neutral-400">
              {getWeatherIcon(currentCondition)}
              <p className="text-sm text-center mt-1">{gt(conditionLabels[currentCondition])}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-neutral-800 rounded-md p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                <T>Humidity</T>
              </p>
              <p className="text-lg text-neutral-200">
                <Num>{currentHumidity}</Num>%
              </p>
            </div>
            <div className="border border-neutral-800 rounded-md p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                <T>Wind</T>
              </p>
              <p className="text-lg text-neutral-200">
                <Num>{currentWind}</Num> <T>km/h</T>
              </p>
            </div>
            <div className="border border-neutral-800 rounded-md p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                <T>UV Index</T>
              </p>
              <p className="text-lg text-neutral-200">
                <Num>{uvIndex}</Num>
              </p>
            </div>
            <div className="border border-neutral-800 rounded-md p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                <T>Pressure</T>
              </p>
              <p className="text-lg text-neutral-200">
                <Num>{pressure}</Num> <T>hPa</T>
              </p>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">
            <T>7-day forecast</T>
          </h3>
          <div className="space-y-2">
            {forecast.map((day, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-neutral-800 rounded-md px-4 py-3 bg-neutral-900/30"
              >
                <div className="w-28 text-sm text-neutral-300">
                  <DateTime>{day.date}</DateTime>
                </div>
                <div className="text-neutral-400 flex items-center gap-2 w-28">
                  <span className="scale-75 origin-left">{getWeatherIcon(day.condition)}</span>
                  <span className="text-xs text-neutral-500">{gt(conditionLabels[day.condition])}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-neutral-200">
                    <Num>{day.high}</Num>°
                  </span>
                  <span className="text-neutral-500">
                    <Num>{day.low}</Num>°
                  </span>
                </div>
                <div className="text-xs text-neutral-500 w-16 text-right">
                  <Num>{day.humidity}</Num>%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About section */}
        <div className="border-t border-neutral-800 pt-8">
          <h3 className="text-lg font-semibold text-neutral-100 mb-3">
            <T>About this demo</T>
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
            <T>
              This weather dashboard demonstrates locale-aware number and date
              formatting with gt-next. All temperatures, percentages, and dates
              automatically adapt to the selected language and region. The Num
              component formats numbers according to locale conventions, while
              DateTime handles date localization.
            </T>
          </p>
        </div>
      </main>
    </div>
  );
}

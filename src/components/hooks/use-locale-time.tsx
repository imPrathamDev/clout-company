import { useState, useEffect, useCallback } from "react";

export type TimeOfDayKey = "morning" | "afternoon" | "evening" | "night";

export interface TimeOfDay {
  key: TimeOfDayKey;
  text: string;
}

export interface LocaleTimeResult {
  formattedTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  period: string;
  timeOfDayKey: TimeOfDayKey;
  timeOfDayText: string;
  timeZone: string;
}

const getTimeOfDay = (hours24: number): TimeOfDay => {
  if (hours24 >= 5 && hours24 < 12) {
    return { key: "morning", text: "Good Morning" };
  } else if (hours24 >= 12 && hours24 < 17) {
    return { key: "afternoon", text: "Good Afternoon" };
  } else if (hours24 >= 17 && hours24 < 21) {
    return { key: "evening", text: "Good Evening" };
  } else {
    return { key: "night", text: "Good Night" };
  }
};

// A fixed, SSR-safe placeholder. Server and client MUST agree on this
// so there is zero hydration mismatch on first paint.
const DEFAULT_RESULT: LocaleTimeResult = {
  formattedTime: "",
  hours: "--",
  minutes: "--",
  seconds: "--",
  period: "",
  timeOfDayKey: "morning",
  timeOfDayText: "Good Morning",
  timeZone: "UTC",
};

export const useLocaleTime = (
  customLocale?: string,
  customTimeZone?: string,
): LocaleTimeResult => {
  const getTimeData = useCallback((): LocaleTimeResult => {
    // Guard: only compute the real, visitor-specific value on the client.
    if (typeof window === "undefined") {
      return DEFAULT_RESULT;
    }

    const now = new Date();
    const locale = customLocale || navigator.language;
    const timeZone =
      customTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formatter12 = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
    });

    const formatter24 = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone,
    });

    const parts12 = formatter12.formatToParts(now);
    const parts24 = formatter24.formatToParts(now);

    const getPart = (
      parts: Intl.DateTimeFormatPart[],
      type: Intl.DateTimeFormatPartTypes,
    ): string => parts.find((p) => p.type === type)?.value || "";

    const hours = getPart(parts12, "hour");
    const minutes = getPart(parts12, "minute");
    const seconds = getPart(parts12, "second");
    const period = getPart(parts12, "dayPeriod").toUpperCase();

    const hours24Raw = parseInt(getPart(parts24, "hour"), 10);
    const hours24 = hours24Raw === 24 ? 0 : hours24Raw;

    const timeOfDay = getTimeOfDay(hours24);

    return {
      formattedTime: formatter12.format(now),
      hours,
      minutes,
      seconds,
      period,
      timeOfDayKey: timeOfDay.key,
      timeOfDayText: timeOfDay.text,
      timeZone,
    };
  }, [customLocale, customTimeZone]);

  // Initialize with the fixed default — identical on server and client,
  // so React's first hydration pass matches exactly.
  const [timeData, setTimeData] = useState<LocaleTimeResult>(DEFAULT_RESULT);

  useEffect(() => {
    // Runs client-only, after hydration is already reconciled cleanly.
    setTimeData(getTimeData());

    const intervalId = setInterval(() => {
      setTimeData(getTimeData());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTimeData]);

  return timeData;
};
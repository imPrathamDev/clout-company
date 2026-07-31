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
  period: string; // 'AM' | 'PM' or localized equivalent
  timeOfDayKey: TimeOfDayKey;
  timeOfDayText: string;
  timeZone: string; // Added so you can display the visitor's exact time zone if needed
}

/**
 * Helper to compute time of day based on a 24-hour hour integer.
 */
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

/**
 * Custom React Hook to retrieve real-time components and time-of-day info.
 * Defaults to the visitor's current browser locale and time zone.
 */
export const useLocaleTime = (
  customLocale?: string,
  customTimeZone?: string,
): LocaleTimeResult => {
  const getTimeData = useCallback((): LocaleTimeResult => {
    const now = new Date();

    // 1. Get visitor defaults if no custom overrides are provided
    // SSR safe check for navigator
    const isClient = typeof window !== "undefined";
    const locale = customLocale || (isClient ? navigator.language : "en-US");

    // Automatically grabs the visitor's IANA time zone (e.g., 'America/New_York')
    const timeZone =
      customTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 2. Format parts for 12-hour breakdown
    const formatter12 = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
    });

    // 3. Format parts for 24-hour calculation (accurate time-of-day determination)
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

  const [timeData, setTimeData] = useState<LocaleTimeResult>(getTimeData);

  useEffect(() => {
    // Initial set in case of hydration mismatches
    setTimeData(getTimeData());

    const intervalId = setInterval(() => {
      setTimeData(getTimeData());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTimeData]);

  return timeData;
};

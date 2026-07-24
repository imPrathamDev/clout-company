import { useState, useEffect, useCallback } from "react";

export type TimeOfDayKey = "morning" | "afternoon" | "evening" | "night";

export interface TimeOfDay {
  key: TimeOfDayKey;
  text: string;
}

export interface UseLocaleTimeOptions {
  locale?: string;
  timeZone?: string;
}

export interface LocaleTimeResult {
  formattedTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  period: string; // 'AM' | 'PM' or localized equivalent
  timeOfDayKey: TimeOfDayKey;
  timeOfDayText: string;
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
 */
export const useLocaleTime = (
  locale: string = "en-US",
  timeZone?: string,
): LocaleTimeResult => {
  const getTimeData = useCallback((): LocaleTimeResult => {
    const now = new Date();

    // 1. Format parts for 12-hour breakdown (hours, minutes, seconds, dayPeriod)
    const formatter12 = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      ...(timeZone && { timeZone }),
    });

    // 2. Format parts for 24-hour calculation (accurate time-of-day determination)
    const formatter24 = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      ...(timeZone && { timeZone }),
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
    };
  }, [locale, timeZone]);

  const [timeData, setTimeData] = useState<LocaleTimeResult>(getTimeData);

  useEffect(() => {
    setTimeData(getTimeData());

    const intervalId = setInterval(() => {
      setTimeData(getTimeData());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTimeData]);

  return timeData;
};

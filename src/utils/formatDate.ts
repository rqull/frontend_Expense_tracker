import { DATE_FORMAT_OPTIONS, LOCALE } from "./constants";

/**
 * Format a date string (YYYY-MM-DD) to localized format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "12 Jun 2025")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(LOCALE, DATE_FORMAT_OPTIONS).format(date);
};

/**
 * Format a date to YYYY-MM-DD string
 * @param date - Date object
 * @returns Date string in YYYY-MM-DD format
 */
export const formatDateToString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date string in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  return formatDateToString(new Date());
};

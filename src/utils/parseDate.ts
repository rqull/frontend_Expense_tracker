/**
 * Parse a date string to Date object
 * @param dateString - Date string in any valid format
 * @returns Date object or null if invalid
 */
export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Check if a string is a valid date
 * @param dateString - Date string to validate
 * @returns boolean indicating if the date is valid
 */
export const isValidDate = (dateString: string): boolean => {
  return parseDate(dateString) !== null;
};

/**
 * Get month name from month number (1-12)
 * @param month - Month number (1-12)
 * @returns Month name
 */
export const getMonthName = (month: number): string => {
  const date = new Date(2025, month - 1, 1);
  return date.toLocaleString("default", { month: "long" });
};

export const formatToISODate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getCurrentMonth = (): { year: number; month: number } => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // JavaScript months are 0-based
  };
};

import { CURRENCY_FORMAT_OPTIONS, LOCALE } from "./constants";

/**
 * Format a number to localized currency string
 * @param amount - Number to format as currency
 * @returns Formatted currency string (e.g., "Rp 1.234")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(LOCALE, CURRENCY_FORMAT_OPTIONS).format(amount);
};

/**
 * Parse a currency string to number
 * @param currencyString - Currency string to parse
 * @returns Number value of the currency
 */
export const parseCurrencyString = (currencyString: string): number => {
  return Number(currencyString.replace(/[^0-9.-]+/g, ""));
};

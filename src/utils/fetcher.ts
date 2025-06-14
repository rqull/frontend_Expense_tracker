interface ErrorResponse {
  detail: string;
  [key: string]: unknown;
}

interface FetchError extends Error {
  info?: ErrorResponse;
  status?: number;
}

/**
 * Generic fetcher function for SWR
 * @param url - URL to fetch
 * @returns Promise with JSON response
 */
export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as FetchError;
    // Add extra info to the error object
    const data = (await response.json()) as ErrorResponse;
    error.info = data;
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 * Fetcher with options for SWR
 * @param url - URL to fetch
 * @param options - Fetch options
 * @returns Promise with JSON response
 */
export const fetcherWithOptions = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as FetchError;
    // Add extra info to the error object
    const data = (await response.json()) as ErrorResponse;
    error.info = data;
    error.status = response.status;
    throw error;
  }

  return response.json();
};

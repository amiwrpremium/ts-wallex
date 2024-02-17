// types/responses/response.ts

/**
 * Module containing response types for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/response
 */

/**
 * Represents information about the pagination of results.
 * @interface
 */
export interface ResultInfo {
  page: number;
  per_page: number;
  count: number;
  total_count: number;
}

/**
 * Represents a generic response from the API.
 * @interface
 * @template T - The type of the result contained in the response.
 */
export interface Response<T> {
  status?: boolean;
  code: number;
  message: string;
  result: T;
  result_info?: ResultInfo;
}

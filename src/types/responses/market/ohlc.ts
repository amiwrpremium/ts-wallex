// types/responses/market/ohlc.ts

/**
 * Module containing response types related to OHLC (Open-High-Low-Close) data for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/market/ohlc
 */

/**
 * Represents the result of an OHLC data response.
 * @interface
 */
export interface OHLCResult {
  s: "ok"; // Status indicator
  t: number[]; // Timestamps
  c: string[]; // Close prices
  o: string[]; // Open prices
  h: string[]; // High prices
  l: string[]; // Low prices
  v: string[]; // Volume
}

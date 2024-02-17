// types/base.ts

/**
 * Module containing base types used in interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/base
 */

/**
 * Represents options for making requests to the API.
 */
export type RequestOptions = Record<string, any>;

/**
 * Represents a value that can be either a number or a string.
 */
export type NumberLike = number | string;

/**
 * Represents the type of order (e.g., limit or market order).
 */
export type OrderType = "LIMIT" | "MARKET";

/**
 * Represents the side of an order (e.g., buy or sell).
 */
export type OrderSide = "BUY" | "SELL";

/**
 * Represents the resolution for a price chart (e.g., 1 minute, 1 hour, 1 day).
 */
export type Resolution = "1" | "60" | "180" | "360" | "720" | "1D";

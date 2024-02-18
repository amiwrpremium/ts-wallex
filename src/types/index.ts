// types/index.ts

/**
 * Module exporting types for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/index
 */

// Export response types
export * as response from "./responses";

// Export base types
export type { NumberLike, OrderType, OrderSide, Resolution } from "./base";

// Export params types
export type * as params from "./params";

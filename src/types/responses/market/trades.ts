// types/responses/market/trades.ts

/**
 * Module containing response types related to trades for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/market/trades
 */

import type { Response } from "../response";
import type { NumberLike } from "../../base";

/**
 * Represents the structure of a trades' response.
 * @interface
 */
export interface TradesResponse {
  latestTrades: LatestTrade[];
}

/**
 * Represents a latest trade entry.
 * @interface
 */
export interface LatestTrade {
  symbol: string;
  quantity: NumberLike;
  price: NumberLike;
  sum: NumberLike;
  isBuyOrder: boolean;
  timestamp: string;
}

/**
 * Represents the result of a trades' response.
 * @interface
 * @extends Response
 */
export interface TradesResult extends Response<TradesResponse> {}

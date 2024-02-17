// types/responses/account/fees.ts

/**
 * Module containing response types related to account fees for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/fees
 */

import type { Response } from "../response";

/**
 * Represents the structure of a fees response.
 * @interface
 */
export interface FeesResponse {
  [key: string]: TradingPairInfo | any;

  metaData: MetaData;
  default: any[];
}

/**
 * Represents information about a trading pair's fees.
 * @interface
 */
export interface TradingPairInfo {
  makerFeeRate: string;
  takerFeeRate: string;
  recent_days_sum: number;
}

/**
 * Represents metadata associated with fees.
 * @interface
 */
export interface MetaData {
  levels: number[];
  coin_levels: number[];
  latestTradesSum: number;
  latestTetherTradesSum: number;
}

/**
 * Represents the result of a fees' response.
 * @interface
 * @extends Response
 */
export interface FeesResult extends Response<FeesResponse> {
}

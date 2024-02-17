// types/responses/account/trades.ts

/**
 * Module containing response types related to user trades for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/trades
 */

import type { LatestTrade } from "../market/trades";
import type { NumberLike } from "../../base";
import type { Response } from "../response";

/**
 * Represents the structure of a user trades response.
 * @interface
 */
export interface UserTradesResponse {
  AccountLatestTrades: UserLatestTrade[];
}

/**
 * Represents a user's latest trade, extending the base LatestTrade interface with additional fee-related properties.
 * @interface
 * @extends LatestTrade
 */
export interface UserLatestTrade extends LatestTrade {
  fee: NumberLike;
  feeCoefficient: NumberLike;
  feeAsset: NumberLike;
}

/**
 * Represents the result of a user trades response.
 * @interface
 * @extends Response
 */
export interface UserTradesResult extends Response<UserTradesResponse> {}

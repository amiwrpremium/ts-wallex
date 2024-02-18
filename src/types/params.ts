/**
 * Defines the parameters and types used in interacting with the Wallex.ir cryptocurrency exchange SDK.
 * @module types/params
 */

import { type OrderType, type OrderSide } from "./base";
import type * as t from "./index";

/**
 * Defines the options for making requests to the Wallex.ir exchange.
 */
export type RequestOptions = Record<string, any>;

/**
 * Defines the parameters for initializing the Wallex.ir client.
 */
export interface ClientParams {
  /**
   * The API key required for authentication with the Wallex.ir exchange.
   */
  apiKey?: string;
  /**
   * Additional parameters to be included in the requests made to the exchange.
   */
  requestParams?: RequestOptions;
  /**
   * Indicates whether detailed errors should be raised.
   */
  raiseDetailedErrors?: boolean;
}

/**
 * Defines the parameters for placing an order on the Wallex.ir exchange.
 */
export interface PlaceOrderParams {
  /**
   * The symbol (e.g., BTC/USD) for the trading pair.
   */
  symbol: string;
  /**
   * The type of order (e.g., "limit", "market").
   */
  type: OrderType;
  /**
   * The side of the order (e.g., "buy", "sell").
   */
  side: OrderSide;
  /**
   * The quantity of the asset to be traded.
   */
  quantity: number;
  /**
   * The price at which the order should be executed (required for limit orders).
   */
  price?: number;
  /**
   * An optional client-generated identifier for the order.
   */
  clientID?: string;
}

/**
 * Defines the parameters for retrieving candlestick data from the Wallex.ir exchange.
 */
export interface GetCandlesParams {
  /**
   * The symbol (e.g., BTC/USD) for the trading pair.
   */
  symbol: string;
  /**
   * The resolution of the candlestick data (e.g., "1m", "1h", "1d").
   */
  resolution: t.Resolution;
  /**
   * The start time of the data range to retrieve.
   */
  from: Date | number;
  /**
   * The end time of the data range to retrieve.
   */
  to: Date | number;
}

/**
 * Defines the parameters for withdrawing cryptocurrency from the Wallex.ir exchange.
 */
export interface WithdrawParams {
  /**
   * The cryptocurrency to withdraw (e.g., "BTC", "ETH").
   */
  coin: string;
  /**
   * The network on which the withdrawal will occur (e.g., "BTC", "ETH").
   */
  network: string;
  /**
   * The amount of cryptocurrency to withdraw.
   */
  value: number;
  /**
   * The recipient wallet address for the withdrawal.
   */
  walletAddress: string;
  /**
   * An optional memo or description for the withdrawal.
   */
  memo: string;
}

/**
 * Defines the parameters for placing an over-the-counter (OTC) order on the Wallex.ir exchange.
 */
export interface PlaceOTCOrderParams {
  /**
   * The symbol (e.g., BTC/USD) for the trading pair.
   */
  symbol: string;
  /**
   * The side of the OTC order (e.g., "buy", "sell").
   */
  side: t.OrderSide;
  /**
   * The amount of cryptocurrency to be traded.
   */
  amount: number;
}

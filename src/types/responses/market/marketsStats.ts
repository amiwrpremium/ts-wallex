// types/responses/market/marketsStats.ts

/**
 * Module containing response types related to market statistics for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/market/marketsStats
 */

import type { Response } from "../response";

/**
 * Represents the structure of a market statistics response.
 * @interface
 */
export interface MarketStatsResponse {
  symbols: Symbols;
}

/**
 * Represents symbols in the market statistics response.
 */
export type Symbols = Record<string, SymbolInformation>;

/**
 * Represents information about a symbol in the market statistics.
 * @interface
 */
export interface SymbolInformation {
  symbol: string;
  baseAsset: string;
  baseAsset_png_icon: string;
  baseAsset_svg_icon: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quoteAsset_png_icon: string;
  quoteAsset_svg_icon: string;
  quotePrecision: number;
  faName: string;
  enName: string;
  faBaseAsset: string;
  enBaseAsset: string;
  faQuoteAsset: string;
  enQuoteAsset: string;
  stepSize: number;
  tickSize: number;
  minQty: number;
  minNotional: number;
  stats: Stats;
  createdAt: string;
  isNew: boolean;
  isZeroFee: boolean;
}

/**
 * Represents statistics for a symbol in the market statistics.
 * @interface
 */
export interface Stats {
  bidPrice: string;
  askPrice: string;
  "24h_ch": number;
  "7d_ch": number;
  "24h_volume": string | "-";
  "7d_volume": string | "-";
  "24h_quoteVolume": string | "-";
  "24h_highPrice": string | "-";
  "24h_lowPrice": string | "-";
  lastPrice: string;
  lastQty: string;
  lastTradeSide: string;
  bidVolume: string;
  askVolume: string;
  bidCount: number;
  askCount: number;
  direction: Direction;
  "24h_tmnVolume": string | "-";
}

/**
 * Represents the direction of trading.
 * @interface
 */
export interface Direction {
  SELL: number;
  BUY: number;
}

/**
 * Represents the result of a market statistics response.
 * @interface
 * @extends Response
 */
export interface MarketsStatsResult extends Response<MarketStatsResponse> {}

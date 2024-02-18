// types/responses/otc/markets.ts

/**
 * Module containing response types related to Over-The-Counter (OTC) markets for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/otc/markets
 */

import type { Response } from "../response";

/**
 * Represents the structure of an OTC markets response.
 */
export type OTCMarketsResponse = Record<string, SymbolInformation>;

/**
 * Represents information about a symbol in the OTC markets.
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
  maxNotional: number;
  stats: Stats;
  buyStatus: string;
  sellStatus: string;
  exchangeStatus: string;
  createdAt: string;
  isNew: boolean;
  isZeroFee: boolean;
}

/**
 * Represents statistics for a symbol in the OTC markets.
 */
export interface Stats {
  "24h_ch": number;
  lastPrice: number;
  "24h_highPrice": number;
  "24h_lowPrice": number;
}

/**
 * Represents the result of an OTC markets response.
 */
export interface OTCMarketsResult extends Response<OTCMarketsResponse> {}

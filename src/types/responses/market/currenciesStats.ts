// types/responses/currenciesStats.ts

/**
 * Module containing response types related to currency statistics for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/currenciesStats
 */

import type { Response } from "../response";

/**
 * Represents the structure of a currency statistics response.
 * @interface
 */
export interface CurrenciesStatsResponse {
  key: string;
  name: string;
  name_en: string;
  rank?: number;
  dominance?: number;
  volume_24h?: number;
  market_cap?: number;
  ath?: number;
  atl?: number;
  ath_change_percentage?: number;
  ath_date?: string;
  price: number;
  daily_high_price?: number;
  daily_low_price?: number;
  weekly_high_price?: number;
  monthly_high_price?: number;
  yearly_high_price?: number;
  weekly_low_price?: number;
  monthly_low_price?: number;
  yearly_low_price?: number;
  percent_change_1h?: number;
  percent_change_24h?: number;
  percent_change_7d?: number;
  percent_change_14d?: number;
  percent_change_30d?: number;
  percent_change_60d?: number;
  percent_change_200d?: number;
  percent_change_1y?: number;
  price_change_24h?: number;
  price_change_7d?: number;
  price_change_14d?: number;
  price_change_30d?: number;
  price_change_60d?: number;
  price_change_200d?: number;
  price_change_1y?: number;
  max_supply?: number;
  total_supply?: number;
  circulating_supply?: number;
  type?: string;
  created_at?: string;
  updated_at: string;
}

/**
 * Represents the result of a currency statistics response.
 * @interface
 * @extends Response
 */
export interface CurrenciesStatsResult extends Response<CurrenciesStatsResponse[]> {
}

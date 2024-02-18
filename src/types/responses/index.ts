// types/responses/index.ts

/**
 * Module exporting response types for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/index
 */

// Export response type from response.ts
export type { Response } from "./response";

// Export types related to market responses
export type {
  TradesResult,
  OHLCResult,
  OrderBookResult,
  AllOrderBooksResult,
  MarketsStatsResult,
  CurrenciesStatsResult,
} from "./market";

// Export types related to account responses
export type {
  BalanceResult,
  BalanceItem,
  CardNumbersResult,
  FeesResult,
  IBANsResult,
  ProfileResult,
  MoneyWithdrawalResult,
  CryptoWithdrawalResult,
  CryptoWithdrawalHistoryResult,
  UserTradesResult,
  CryptoDepositResult,
} from "./account";

// Export types related to order responses
export type { OrderStatus, OrderResult, OpenOrderResult } from "./order";

// Export types related to OTC (Over-The-Counter) responses
export type { OTCMarketsResult, OTCPricesResult } from "./otc";

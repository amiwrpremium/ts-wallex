// types/responses/account/index.ts

/**
 * Module containing index of response types related to account interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/index
 */

export type { BalanceResult, BalanceItem } from "./balances";
export type { CardNumbersResult } from "./cardNumbers";
export type { FeesResult } from "./fees";
export type { IBANsResult } from "./ibans";
export type { ProfileResult } from "./profile";
export type { MoneyWithdrawalResult } from "./moneyWithdrawal";
export type { UserTradesResult } from "./trades";
export type { CryptoDepositResult } from "./cryptoDeposit";
export type {
  CryptoWithdrawalHistoryResult,
  CryptoWithdrawalResult
} from "./cryptoWithdrawal";

// types/responses/account/cryptoWithdrawal.ts

/**
 * Module containing response types related to cryptocurrency withdrawals for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/cryptoWithdrawal
 */

import type { Response } from "../response";

/**
 * Represents the structure of a cryptocurrency withdrawal result.
 * @interface
 */
export interface Result {
  asset: string;
  amount: string;
  txHash: string;
  block_explorer_link: string;
  confirmations: number;
  min_confirmation: number;
  coin_type: CoinType;
  network: Network;
  status: string;
  time: string;
  wallet: Wallet;
  deposit_type: string;
}

/**
 * Represents the type of cryptocurrency coin.
 * @interface
 */
export interface CoinType {
  key: string;
  name: string;
  name_en: string;
  type: string;
  deposit_availability: string;
  withdrawal_availability: string;
  deposit_unavailability_reason: any;
  withdrawal_unavailability_reason: any;
}

/**
 * Represents the network information of a cryptocurrency.
 * @interface
 */
export interface Network {
  name: string;
  message: any;
  type: string;
  deposit_availability: string;
  withdrawal_availability: string;
}

/**
 * Represents the wallet information for a cryptocurrency withdrawal.
 * @interface
 */
export interface Wallet {
  address: string;
  memo_base: boolean;
  memo: any;
}

/**
 * Represents the result of a cryptocurrency withdrawal history response.
 */
export type CryptoWithdrawalHistoryResult = Response<Result[]>;

/**
 * Represents the result of a cryptocurrency withdrawal response.
 */
export type CryptoWithdrawalResult = Response<Result>;

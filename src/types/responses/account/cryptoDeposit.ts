// types/responses/account/cryptoDeposit.ts

/**
 * Module containing response types related to cryptocurrency deposits for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/cryptoDeposit
 */

import type { Response } from "../response";

/**
 * Represents the structure of a cryptocurrency deposit response.
 * @interface
 */
export interface CryptoDepositResponse {
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
 * Represents the wallet information for a cryptocurrency deposit.
 * @interface
 */
export interface Wallet {
  address: string;
  memo_base: boolean;
  memo: any;
}

/**
 * Represents the result of a cryptocurrency deposit response.
 * @interface
 * @extends Response
 */
export interface CryptoDepositResult extends Response<CryptoDepositResponse[]> {
}

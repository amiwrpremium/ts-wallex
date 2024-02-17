// types/responses/account/moneyWithdrawal.ts

/**
 * Module containing response types related to money withdrawals for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/moneyWithdrawal
 */

import type { IBANsResponse as Iban } from "./ibans";
import type { Response } from "../response";

/**
 * Represents the structure of a money withdrawal response.
 * @interface
 */
export interface MoneyWithdrawalResponse {
  amount: number;
  fee: number;
  tracking_code: string;
  created_at: string;
  status: string;
  iban: Iban;
  details: Detail[];
}

/**
 * Represents details of a money withdrawal.
 * @interface
 */
export interface Detail {
  value: number;
  status: string;
}

/**
 * Represents the result of a money withdrawal response.
 * @interface
 * @extends Response
 */
export interface MoneyWithdrawalResult extends Response<MoneyWithdrawalResponse> {
}


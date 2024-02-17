// types/responses/account/ibans.ts

/**
 * Module containing response types related to IBANs for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/ibans
 */

import type { Response } from "../response";

/**
 * Represents the structure of an IBANs response.
 * @interface
 */
export interface IBANsResponse {
  id: number;
  withdraw_available_amount: number;
  iban: string;
  owners: string[];
  bank_name?: string;
  status: string;
  is_default: number;
  bank_details: BankDetails;
}

/**
 * Represents bank details.
 * @interface
 */
export interface BankDetails {
  code: string;
  label: string;
}

/**
 * Represents the result of an IBANs response.
 * @interface
 * @extends Response
 */
export interface IBANsResult extends Response<IBANsResponse[]> {
}

// types/responses/account/cardNumbers.ts

/**
 * Module containing response types related to card numbers for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/cardNumbers
 */

import type { Response } from "../response";

/**
 * Represents the structure of a card numbers response.
 * @interface
 */
export interface CardNumbersResponse {
  id: number;
  card_number: string;
  owners: string[];
  status: string;
  is_default: number;
}

/**
 * Represents the result of a card numbers response.
 * @interface
 * @extends Response
 */
export interface CardNumbersResult extends Response<CardNumbersResponse> {
}

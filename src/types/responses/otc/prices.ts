// types/responses/otc/prices.ts

/**
 * Module containing response types related to Over-The-Counter (OTC) prices for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/otc/prices
 */

import type { Response } from "../response";

/**
 * Represents the structure of OTC prices response.
 * @interface
 */
export interface PricesResponse {
  price: string;
  price_expires_at: string;
}

/**
 * Represents the result of an OTC prices response.
 * @interface
 * @extends Response
 */
export interface OTCPricesResult extends Response<PricesResponse> {}

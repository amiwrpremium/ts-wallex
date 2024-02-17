// types/responses/account/balances.ts

/**
 * Module containing response types related to account balances for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/balances
 */

import type { NumberLike } from "../../base";
import type { Response } from "../response";

/**
 * Represents an item in the balance.
 * @interface
 */
export interface BalanceItem {
  asset: string;
  asset_png_icon: string;
  asset_svg_icon: string;
  faName: string;
  fiat: boolean;
  value: NumberLike;
  locked: NumberLike;
}

/**
 * Represents balances.
 */
export type Balances = Record<string, BalanceItem>;

/**
 * Represents the structure of a balance response.
 * @interface
 */
export interface BalanceResponse {
  balances: Balances;
}

/**
 * Represents the result of a balance response.
 * @interface
 * @extends Response
 */
export interface BalanceResult extends Response<BalanceResponse> {
}

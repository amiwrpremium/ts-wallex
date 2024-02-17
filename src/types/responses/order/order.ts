// types/responses/order/order.ts

/**
 * Module containing response types related to orders for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/order/order
 */

import type { Response } from "../response";

/**
 * Represents a filled order.
 * @interface
 */
export interface Fill {
  price: string;
  quantity: string;
  fee: string;
  feeCoefficient: string;
  feeAsset: string;
  timestamp: string;
  symbol: string;
  sum: string;
  makerFeeCoefficient: string;
  takerFeeCoefficient: string;
  isBuyer: boolean;
}

/**
 * Represents the status of an order.
 * @interface
 */
export interface OrderStatus {
  symbol: string;
  type: string;
  side: string;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedSum: string;
  executedQty: string;
  executedPrice: string;
  sum: string;
  executedPercent: number;
  status: string;
  active: boolean;
  fills: Fill[];
}

/**
 * Represents the result of an order response.
 * @interface
 * @extends Response
 */
export interface OrderResult extends Response<OrderStatus> {}

/**
 * Represents the result of an open orders response.
 * @interface
 * @extends Response
 */
export interface OpenOrderResult extends Response<OrderStatus[]> {}

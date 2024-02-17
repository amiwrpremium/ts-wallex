// types/responses/market/orderBook.ts

/**
 * Module containing response types related to order books for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/market/orderBook
 */

import type { Response } from "../response";

/**
 * Represents the structure of an order book response.
 * @interface
 */
export interface OrderBookResponse {
  ask: Ask[];
  bid: Bid[];
}

/**
 * Represents an ask entry in an order book.
 * @interface
 */
export interface Ask {
  price: string;
  quantity: number;
  sum: string;
}

/**
 * Represents a bid entry in an order book.
 * @interface
 */
export interface Bid {
  price: string;
  quantity: number;
  sum: string;
}

/**
 * Represents the result of an order book response.
 * @interface
 * @extends Response
 */
export interface OrderBookResult extends Response<OrderBookResponse> {
}

/**
 * Represents the result of a response containing all order books.
 * @interface
 * @extends Response
 */
export interface AllOrderBooksResult extends Response<Record<string, OrderBookResponse>> {
}

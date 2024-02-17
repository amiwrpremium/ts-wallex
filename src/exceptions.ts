// exceptions.ts

/**
 * Module containing custom exceptions for handling errors in interactions with the Wallex.ir cryptocurrency exchange API.
 * @module exceptions
 */

import type { AxiosResponse } from "axios";

/**
 * Custom exception class for representing errors that occur during requests to the API.
 * @class
 * @extends Error
 */
export class RequestException extends Error {
  /**
   * Returns a string representation of the exception.
   * @returns {string} A string describing the exception.
   */
  toString(): string {
    return `RequestException: ${this.message}`;
  }
}

/**
 * Custom exception class for representing errors returned by the Wallex.ir API.
 * @class
 * @extends Error
 */
export class APIError extends Error {
  code: number;
  message: string;
  result: any; // You might want to specify a proper type for `result`

  /**
   * Creates an instance of APIError.
   * @constructor
   * @param {number} code - The error code returned by the API.
   * @param {string} message - The error message returned by the API.
   * @param {any} result - Additional result or data associated with the error.
   */
  constructor(code: number, message: string, result: any) {
    super();
    this.code = code;
    this.message = message;
    this.result = result;
  }

  /**
   * Returns a string representation of the error.
   * @returns {string} A string describing the error.
   */
  toString(): string {
    return `APIError(code=${this.code}): ${this.message} | ${this.result}`;
  }
}

/**
 * Custom exception class for representing detailed errors returned by the Wallex.ir API.
 * @class
 * @extends Error
 */
export class APIErrorDetailed extends Error {
  code: number;
  text: string;
  message: string;
  result: any; // You might want to specify a proper type for `result`
  status_code: number;
  response: AxiosResponse<any> | undefined;
  request: any;

  /**
   * Creates an instance of APIErrorDetailed.
   * @constructor
   * @param {AxiosResponse<any>} response - The response object returned by the API.
   * @param {string} text - Additional text providing context for the error.
   */
  constructor(response: AxiosResponse<any>, text: string) {
    super();
    this.code = 0;
    this.text = text;

    try {
      this.code = response.data.code;
      this.message = response.data.message;
      this.result = response.data.result;
    } catch (error) {
      this.message = `Invalid JSON error message from Wallex: ${response.data}`;
    }

    this.status_code = response.status;
    this.response = response;
    this.request = response.request;
  }

  /**
   * Returns a string representation of the error.
   * @returns {string} A string describing the error.
   */
  toString(): string {
    return `APIError(code=${this.code}): ${this.message} | ${this.result} | ${this.text}`;
  }
}

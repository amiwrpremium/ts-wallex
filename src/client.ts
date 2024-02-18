// client.ts

/**
 * @module wallex
 */

import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

import type * as t from "./types";
import { APIError, RequestException, APIErrorDetailed } from "./exceptions";

/**
 * Represents a client for interacting with the Wallex.ir cryptocurrency exchange API.
 */
export class Client {
  /**
   * The API key for authenticating requests to the Wallex.ir API.
   */
  private readonly apiKey?: string;

  /**
   * Indicates whether to raise detailed errors or not.
   */
  private readonly raiseDetailedErrors: boolean = false;

  /**
   * The timeout duration for HTTP requests in milliseconds.
   */
  public requestTimeout: number = 5000; // 5 seconds

  /**
   * Additional request parameters to be included in API requests.
   */
  public requestParams: t.RequestOptions = {};

  /**
   * The Axios instance used for making HTTP requests.
   */
  private readonly session: AxiosInstance;

  /**
   * The base URL of the Wallex.ir API.
   */
  private readonly baseUrl = "https://api.wallex.ir";

  /**
   * API version 1.
   */
  private readonly v1 = "v1";

  /**
   * API version 2.
   */
  private readonly v2 = "v2";

  /**
   * Constructs a new Client instance.
   * @param apiKey The API key for authenticating requests (optional).
   * @param requestParams Additional request parameters (optional).
   * @param raiseDetailedErrors Indicates whether to raise detailed errors (optional, default: false).
   */
  constructor(
    apiKey?: string,
    requestParams?: any,
    raiseDetailedErrors: boolean = false
  ) {
    this.apiKey = apiKey;
    if (requestParams) {
      this.requestParams = requestParams;
    }

    // Initialize Axios instance
    this.session = axios.create({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    this.raiseDetailedErrors = raiseDetailedErrors;
  }

  /**
   * Creates a complete API URI based on the provided path and version.
   * @param path The endpoint path.
   * @param version The API version (default: v1).
   * @returns The complete API URI.
   */
  private createApiUri(path: string, version: string = this.v1): string {
    return `${this.baseUrl}/${version}/${path}`;
  }

  /**
   * Retrieves request configuration arguments for making HTTP requests.
   * @param method The HTTP request method (e.g., GET, POST, etc.).
   * @param signed Indicates whether the request requires authentication.
   * @param kwargs Additional request options (optional).
   * @returns The request configuration.
   */
  private getRequestKwargs(
    method: string,
    signed: boolean,
    kwargs: t.RequestOptions = {}
  ): AxiosRequestConfig {
    // Set default timeout if not provided
    kwargs.timeout = kwargs.timeout || this.requestTimeout;

    // Merge additional request parameters
    if (this.requestParams) {
      Object.assign(kwargs, this.requestParams);
    }

    // Ensure data is formatted correctly
    const data = kwargs?.data ?? null;
    if (data && data instanceof Object) {
      kwargs.data = data;
    }

    // Add API key to headers if request requires authentication
    if (signed) {
      const headers: t.RequestOptions = kwargs.headers || {};
      headers["x-api-key"] = this.apiKey;
      kwargs.headers = headers;
    }

    // Adjust request parameters for GET requests
    if (data && method.toLowerCase() === "get") {
      kwargs.params = kwargs.data;
      delete kwargs.data;
    }

    return kwargs;
  }

  /**
   * Performs an HTTP request to the specified URI using the provided method.
   * @param method The HTTP request method (e.g., GET, POST, etc.).
   * @param uri The complete URI of the API endpoint.
   * @param signed Indicates whether the request requires authentication (default: false).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the response data.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  private async request(
    method: string,
    uri: string,
    signed: boolean = false,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    const requestConfig = this.getRequestKwargs(method, signed, kwargs);

    try {
      return (
        await this.session.request({ method, url: uri, ...requestConfig })
      ).data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          if (this.raiseDetailedErrors) {
            throw new APIErrorDetailed(
              error.response,
              "Error making request to Wallex"
            );
          }
          throw new APIError(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            error.response.data.code,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            error.response.data.message,
            error.response.data.result
          );
        } else if (error.request) {
          throw new RequestException(`No response received from Wallex`);
        } else {
          throw new RequestException(`Error making request to Wallex`);
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Performs an API request to the specified path and version using the provided method.
   * @param method The HTTP request method (e.g., GET, POST, etc.).
   * @param path The endpoint path.
   * @param signed Indicates whether the request requires authentication (default: false).
   * @param version The API version (default: v1).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the response data.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  private async requestAPI(
    method: string,
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    const uri = this.createApiUri(path, version);
    return await this.request(method, uri, signed, kwargs);
  }

  /**
   * Sends a GET request to the specified API endpoint.
   * @param path The endpoint path.
   * @param signed Indicates whether the request requires authentication (default: false).
   * @param version The API version (default: v1).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the response data.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  private async get(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("GET", path, signed, version, kwargs);
  }

  /**
   * Sends a POST request to the specified API endpoint.
   * @param path The endpoint path.
   * @param signed Indicates whether the request requires authentication (default: false).
   * @param version The API version (default: v1).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the response data.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  private async post(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("POST", path, signed, version, kwargs);
  }

  /**
   * Sends a DELETE request to the specified API endpoint.
   * @param path The endpoint path.
   * @param signed Indicates whether the request requires authentication (default: false).
   * @param version The API version (default: v1).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the response data.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  private async delete(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("DELETE", path, signed, version, kwargs);
  }

  /**
   * Fetches market statistics.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the market statistics result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchMarkets(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.MarketsStatsResult> {
    return await this.get("markets", false, this.v1, kwargs);
  }

  /**
   * Fetches currency statistics.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the currency statistics result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchCurrenciesStats(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CurrenciesStatsResult> {
    return await this.get("currencies/stats", false, this.v1, kwargs);
  }

  /**
   * Fetches the order book for a specific symbol.
   * @param symbol The symbol for which to fetch the order book.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the order book result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOrderBook(
    symbol: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderBookResult> {
    return await this.get(`depth?symbol=${symbol}`, false, this.v1, kwargs);
  }

  /**
   * Fetches order books for all symbols.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the all order books result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchAllOrderBooks(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.AllOrderBooksResult> {
    return await this.get("depth/all", false, this.v2, kwargs);
  }

  /**
   * Fetches trades for a specific symbol.
   * @param symbol The symbol for which to fetch trades.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the trades result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchTrades(
    symbol: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.TradesResult> {
    return await this.get(`trades?symbol=${symbol}`, false, this.v1, kwargs);
  }

  /**
   * Fetches OHLC (Open, High, Low, Close) data for a specific symbol within a time range and resolution.
   * @param symbol The symbol for which to fetch OHLC data.
   * @param resolution The resolution of the OHLC data (e.g., 1, 5, 15, 30, 60 for minutes; 1D for days, etc.).
   * @param from The start of the time range (Date object or UNIX timestamp).
   * @param to The end of the time range (Date object or UNIX timestamp).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the OHLC data result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOHLC(
    symbol: string,
    resolution: t.Resolution,
    from: Date | number,
    to: Date | number,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OHLCResult> {
    if (from instanceof Date) {
      from = from.getTime() / 1000;
    }
    if (to instanceof Date) {
      to = to.getTime() / 1000;
    }

    // @ts-expect-error will return a different response than `this.get`
    return await this.get("udf/history", false, this.v1, {
      data: {
        symbol,
        resolution,
        from,
        to
      },
      ...kwargs
    });
  }

  /**
   * Fetches the profile information of the authenticated user.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the profile result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchProfile(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.ProfileResult> {
    return await this.get("account/profile", true, this.v1, kwargs);
  }

  /**
   * Fetches the account fee information of the authenticated user.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the fees result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchAccountFee(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.FeesResult> {
    return await this.get("account/fee", true, this.v1, kwargs);
  }

  /**
   * Fetches the card numbers associated with the authenticated user's account.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the card numbers result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchCardNumbers(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CardNumbersResult> {
    return await this.get("account/card-numbers", true, this.v1, kwargs);
  }

  /**
   * Fetches the IBANs associated with the authenticated user's account.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the IBANs result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchIBANs(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.IBANsResult> {
    return await this.get("account/ibans", true, this.v1, kwargs);
  }

  /**
   * Fetches the balances of the authenticated user's account.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the balance result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchBalances(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.BalanceResult> {
    return await this.get("account/balances", true, this.v1, kwargs);
  }

  /**
   * Fetches the balance of a specific asset in the authenticated user's account.
   * @param asset The asset for which to fetch the balance.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the balance item, or null if the asset does not exist in the account.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchBalance(
    asset: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.BalanceItem | null> {
    return (await this.fetchBalances(kwargs)).result.balances[asset] ?? null;
  }

  /**
   * Initiates a money withdrawal from the authenticated user's account.
   * @param iban The IBAN to withdraw money to.
   * @param value The amount of money to withdraw.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the money withdrawal result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async moneyWithdrawal(
    iban: number,
    value: number,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.MoneyWithdrawalResult> {
    return await this.post("account/money-withdrawal", true, this.v1, {
      data: {
        iban,
        value
      },
      ...kwargs
    });
  }

  /**
   * Initiates a cryptocurrency withdrawal from the authenticated user's account.
   * @param coin The cryptocurrency to withdraw.
   * @param network The network of the cryptocurrency (e.g., ERC20, BEP20, etc.).
   * @param value The amount of cryptocurrency to withdraw.
   * @param walletAddress The recipient wallet address.
   * @param memo A memo or tag for the withdrawal (if required by the network).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the cryptocurrency withdrawal result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async cryptoWithdrawal(
    coin: string,
    network: string,
    value: number,
    walletAddress: string,
    memo: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CryptoWithdrawalResult> {
    return await this.post("account/crypto-withdrawal", true, this.v1, {
      data: {
        coin,
        network,
        value,
        wallet_address: walletAddress,
        memo
      },
      ...kwargs
    });
  }

  /**
   * Fetches the cryptocurrency deposit history of the authenticated user's account.
   * @param page The page number of results to fetch (optional).
   * @param perPage The number of results per page (optional).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the cryptocurrency deposit history result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchCryptoDepositHistory(
    page?: number,
    perPage?: number,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CryptoDepositResult> {
    return await this.get("account/crypto-deposit", true, this.v1, {
      data: { page, per_page: perPage },
      ...kwargs
    });
  }

  /**
   * Fetches the cryptocurrency withdrawal history of the authenticated user's account.
   * @param page The page number of results to fetch (optional).
   * @param perPage The number of results per page (optional).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the cryptocurrency withdrawal history result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchCryptoWithdrawalHistory(
    page?: number,
    perPage?: number,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CryptoWithdrawalHistoryResult> {
    return await this.get("account/crypto-withdrawal", true, this.v1, {
      data: { page, per_page: perPage },
      ...kwargs
    });
  }

  /**
   * Creates a new order on the authenticated user's account.
   * @param symbol The trading pair symbol (e.g., BTC/USDT).
   * @param type The type of order (e.g., LIMIT, MARKET).
   * @param side The side of the order (e.g., BUY, SELL).
   * @param quantity The quantity to buy or sell.
   * @param price The price per unit (optional, required for LIMIT orders).
   * @param clientID The client ID for the order (optional).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the order result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async createOrder(
    symbol: string,
    type: t.OrderType,
    side: t.OrderSide,
    quantity: number,
    price?: number,
    clientID?: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderResult> {
    return await this.post("account/orders", true, this.v1, {
      data: {
        symbol,
        type,
        side,
        quantity,
        price,
        client_id: clientID
      },
      ...kwargs
    });
  }

  /**
   * Fetches the status of a specific order.
   * @param clientOrderId The client order ID of the order to fetch.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the order result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOrderStatus(
    clientOrderId: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderResult> {
    return await this.get(
      `account/orders/${clientOrderId}`,
      true,
      this.v1,
      kwargs
    );
  }

  /**
   * Cancels a specific order.
   * @param clientOrderId The client order ID of the order to cancel.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the order result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async cancelOrder(
    clientOrderId: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderResult> {
    return await this.delete(
      `account/orders/${clientOrderId}`,
      true,
      this.v1,
      kwargs
    );
  }

  /**
   * Fetches the open orders of the authenticated user's account.
   * @param symbol The trading pair symbol (optional).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the open order result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOpenOrders(
    symbol?: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OpenOrderResult> {
    return await this.get("account/openOrders", true, this.v1, {
      data: { symbol },
      ...kwargs
    });
  }

  /**
   * Fetches the user's trade history.
   * @param symbol The trading pair symbol (optional).
   * @param side The side of the order (optional).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the user trades result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchUserTrades(
    symbol?: string,
    side?: t.OrderSide,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.UserTradesResult> {
    return await this.get("account/trades", true, this.v1, {
      data: { symbol, side },
      ...kwargs
    });
  }

  /**
   * Fetches OTC (Over-The-Counter) markets.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the OTC markets result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOTCMarkets(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OTCMarketsResult> {
    return await this.get("otc/markets", true, this.v1, kwargs);
  }

  /**
   * Fetches the OTC price for a specific symbol and order side.
   * @param symbol The trading pair symbol.
   * @param side The side of the order (BUY or SELL).
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the OTC prices result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async fetchOTCPrice(
    symbol: string,
    side: t.OrderSide,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OTCPricesResult> {
    return await this.get("otc/price", true, this.v1, {
      data: { symbol, side },
      ...kwargs
    });
  }

  /**
   * Creates an OTC (Over-The-Counter) order.
   * @param symbol The trading pair symbol.
   * @param side The side of the order (BUY or SELL).
   * @param amount The amount of the asset to buy or sell.
   * @param kwargs Additional request options (optional).
   * @returns A Promise resolving to the order result.
   * @throws {APIError | APIErrorDetailed | RequestException} If an error occurs during the request.
   */
  public async createOTCOrder(
    symbol: string,
    side: t.OrderSide,
    amount: number,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderResult> {
    return await this.post("otc/orders", true, this.v1, {
      data: { symbol, side, amount },
      ...kwargs
    });
  }
}

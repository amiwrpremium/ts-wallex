// client.ts

import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

import type * as t from "./types";
import { APIError, RequestException, APIErrorDetailed } from "./exceptions";

export class Client {
  private readonly apiKey?: string;
  private readonly raiseDetailedErrors: boolean = false;

  public requestTimeout: number = 5000; // 5 seconds
  public requestParams: t.RequestOptions = {};

  private readonly session: AxiosInstance;

  private readonly baseUrl = "https://api.wallex.ir";
  private readonly v1 = "v1";
  private readonly v2 = "v2";

  constructor(
    apiKey?: string,
    requestParams?: any,
    raiseDetailedErrors: boolean = false
  ) {
    this.apiKey = apiKey;
    if (requestParams) {
      this.requestParams = requestParams;
    }

    this.session = axios.create({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    this.raiseDetailedErrors = raiseDetailedErrors;
  }

  private createApiUri(path: string, version: string = this.v1): string {
    return `${this.baseUrl}/${version}/${path}`;
  }

  private getRequestKwargs(
    method: string,
    signed: boolean,
    kwargs: t.RequestOptions = {}
  ): AxiosRequestConfig {
    kwargs.timeout = kwargs.timeout || this.requestTimeout;

    if (this.requestParams) {
      Object.assign(kwargs, this.requestParams);
    }

    const data = kwargs?.data ?? null;

    if (data && data instanceof Object) {
      kwargs.data = data;
    }

    if (signed) {
      const headers: t.RequestOptions = kwargs.headers || {};
      headers["x-api-key"] = this.apiKey;
      kwargs.headers = headers;
    }

    if (data && method.toLowerCase() === "get") {
      kwargs.params = kwargs.data;
      delete kwargs.data;
    }

    return kwargs;
  }

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

  private async get(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("GET", path, signed, version, kwargs);
  }

  private async post(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("POST", path, signed, version, kwargs);
  }

  private async delete(
    path: string,
    signed: boolean = false,
    version: string = this.v1,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.Response<any>> {
    return await this.requestAPI("DELETE", path, signed, version, kwargs);
  }

  public async fetchMarkets(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.MarketsStatsResult> {
    return await this.get("markets", false, this.v1, kwargs);
  }

  public async fetchCurrenciesStats(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CurrenciesStatsResult> {
    return await this.get("currencies/stats", false, this.v1, kwargs);
  }

  public async fetchOrderBook(
    symbol: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OrderBookResult> {
    return await this.get(`depth?symbol=${symbol}`, false, this.v1, kwargs);
  }

  public async fetchAllOrderBooks(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.AllOrderBooksResult> {
    return await this.get("depth/all", false, this.v2, kwargs);
  }

  public async fetchTrades(
    symbol: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.TradesResult> {
    return await this.get(`trades?symbol=${symbol}`, false, this.v1, kwargs);
  }

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

  public async fetchProfile(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.ProfileResult> {
    return await this.get("account/profile", true, this.v1, kwargs);
  }

  public async fetchAccountFee(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.FeesResult> {
    return await this.get("account/fee", true, this.v1, kwargs);
  }

  public async fetchCardNumbers(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.CardNumbersResult> {
    return await this.get("account/card-numbers", true, this.v1, kwargs);
  }

  public async fetchIBANs(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.IBANsResult> {
    return await this.get("account/ibans", true, this.v1, kwargs);
  }

  public async fetchBalances(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.BalanceResult> {
    return await this.get("account/balances", true, this.v1, kwargs);
  }

  public async fetchBalance(
    asset: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.BalanceItem | null> {
    return (await this.fetchBalances(kwargs)).result.balances[asset] ?? null;
  }

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

  public async fetchOpenOrders(
    symbol?: string,
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OpenOrderResult> {
    return await this.get("account/openOrders", true, this.v1, {
      data: { symbol },
      ...kwargs
    });
  }

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

  public async fetchOTCMarkets(
    kwargs: t.RequestOptions = {}
  ): Promise<t.response.OTCMarketsResult> {
    return await this.get("otc/markets", true, this.v1, kwargs);
  }

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

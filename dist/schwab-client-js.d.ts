/**
 * @fileoverview This file contains the SchwabAPIclient class, a
 * wrapper around the Schwab API for individual traders.
 * It includes clients for market data, trading operations, and streaming data.
 * @filename schwab-client-js.ts
 * @author Jason Levitt
 */
import "./initenv.js";
interface Credentials {
    appKey: string;
    appSecret: string;
    appRefresh: string;
    access_token: string;
    access_exp: number;
}
interface OrderObject {
    [key: string]: any;
}
interface PriceHistoryOptions {
    startDate?: string;
    endDate?: string;
    [key: string]: string | undefined;
}
interface ChainsOptions {
    contractType?: string;
    strikeCount?: number;
    includeUnderlyingQuote?: boolean;
    strategy?: string;
    interval?: number;
    strike?: number;
    range?: string;
    fromDate?: string;
    toDate?: string;
    volatility?: number;
    underlyingPrice?: number;
    interestRate?: number;
    daysToExpiration?: number;
    expMonth?: string;
    optionType?: string;
    entitlement?: string;
}
/**
 * @class SchwabAPIclient
 * @author Jason Levitt
 * @description
 * A class that wraps the Schwab API for individual traders.
 * It contains three subclasses that do all the heavy lifting:
 * MarketApiClient -- read-only market data
 * TradingApiClient -- trading capabilities and account information
 * StreamingApiClient -- real-time streaming of market data
 */
declare class SchwabAPIclient {
    constructor();
    /**
     * @method checkAccessToken
     * @description Refreshes the access token if it has expired
     * @param creds {Credentials} - The credentials object containing tokens and expiration
     * @throws {Error} - Throws an error if token refresh fails
     */
    checkAccessToken(creds: Credentials): Promise<void>;
}
/**
 * @description
 * TradingApiClient contains the Schwab methods for doing transactions
 * and getting account information.
 * It is a subclass of SchwabAPIclient which contains the constructor.
 *
 * @class TradingApiClient
 * @extends SchwabAPIclient
 *
 */
declare class TradingApiClient extends SchwabAPIclient {
    ordersByAccount(accountHash: string, fromEnteredTime: string, toEnteredTime: string, status?: string | null, maxResults?: number | null): Promise<any>;
    orderById(accountHash: string, orderId: string): Promise<any>;
    orderAll(fromEnteredTime: string, toEnteredTime: string, status?: string | null, maxResults?: number | null): Promise<any>;
    placeOrderByAcct(accountHash: string, orderObj: OrderObject): Promise<any>;
    orderDelete(accountHash: string, orderId: string): Promise<any>;
    updateOrderById(accountHash: string, orderId: string, orderObj: OrderObject): Promise<any>;
    orderPreview(accountHash: string, orderObj: OrderObject): Promise<any>;
    accountsNumbers(): Promise<any>;
    accountsDetails(accountHash: string, fields?: string | null): Promise<any>;
    accountsAll(fields?: string | null): Promise<any>;
    transactByAcct(accountHash: string, types: string, startDate: string, endDate: string, symbol?: string | null): Promise<any>;
    transactById(accountHash: string, transId: string): Promise<any>;
    prefs(): Promise<any>;
}
/**
 * @description
 * MarketApiClient contains the Schwab methods for fetching market data.
 * It is a subclass of SchwabAPIclient which contains the constructor.
 *
 * @class MarketApiClient
 * @extends SchwabAPIclient
 *
 */
declare class MarketApiClient extends SchwabAPIclient {
    markets(markets: string, date?: string | null): Promise<any>;
    marketById(market_id: string, date?: string | null): Promise<any>;
    instrumentsCusip(cusip_id: string): Promise<any>;
    instrumentsSymbol(symbol: string, projection: string): Promise<any>;
    movers(symbol_id: string, sort?: string | null, frequency?: string | null): Promise<any>;
    priceHistory(symbol_id: string, options?: PriceHistoryOptions): Promise<any>;
    expirationChain(symbol: string): Promise<any>;
    chains(symbol: string, options?: ChainsOptions): Promise<any>;
    quoteById(symbol_id: string, fields?: string | null): Promise<any>;
    quotes(symbols: string, fields?: string | null, indicative?: string | null): Promise<any>;
}
/**
 * @description
 * StreamingApiClient contains the Schwab methods for streaming
 * market data
 * It is a subclass of SchwabAPIclient which contains the constructor.
 *
 * @class StreamingApiClient
 * @extends SchwabAPIclient
 *
 */
declare class StreamingApiClient extends SchwabAPIclient {
    private streamEvents;
    private stream;
    private counterId;
    private customerId;
    private correlId;
    private channel;
    private functionId;
    private streamUrl;
    constructor();
    private generateRequestMessage;
    private generateLoginMessage;
    private generateLogoutMessage;
    streamInit(): Promise<void>;
    streamSchwabLogin(): Promise<any>;
    streamSchwabLogout(): Promise<void>;
    streamSchwabRequest(command: string, service: string, params?: Record<string, any>): void;
    streamListen(eventName: string, listener: (...args: any[]) => void): void;
    streamClose(): void;
}
export { MarketApiClient, TradingApiClient, StreamingApiClient };
//# sourceMappingURL=schwab-client-js.d.ts.map
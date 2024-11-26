/**
 * @fileoverview This file contains the SchwabAPIclient class, a
 * wrapper around the Schwab API for individual traders.
 * It includes clients for market data, trading operations, and streaming data.
 * @filename schwab-client-js.ts
 * @author Jason Levitt
 */
import "./initenv.js";
import logger from "./logger.js";
import WebSocket from "ws";
import { EventEmitter } from "events";
import endpoint from "./endpoints.js";
import fetchData from "./fetch.js";
import fetchToken from "./access.js";
// Create WeakMap for private credential storage
const _credentials = new WeakMap();
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
class SchwabAPIclient {
    constructor() {
        const credentials = {
            appKey: process.env.SCHWAB_APP_KEY || "",
            appSecret: process.env.SCHWAB_SECRET || "",
            appRefresh: process.env.SCHWAB_REFRESH_TOKEN || "",
            access_token: "", // expires every 30 minutes
            access_exp: Math.floor(Date.now() / 1000) + 29 * 60, // expiration is 29 minutes in the future
        };
        if (!credentials.appKey) {
            throw new Error("Your Api Key was not found.");
        }
        if (!credentials.appSecret) {
            throw new Error("Your Secret key was not found.");
        }
        if (!credentials.appRefresh) {
            throw new Error("Your Refresh key was not found.");
        }
        // Store credentials privately in the WeakMap
        _credentials.set(this, credentials);
    }
    /**
     * @method checkAccessToken
     * @description Refreshes the access token if it has expired
     * @param creds {Credentials} - The credentials object containing tokens and expiration
     * @throws {Error} - Throws an error if token refresh fails
     */
    async checkAccessToken(creds) {
        try {
            if (creds.access_token === "" ||
                Math.floor(Date.now() / 1000) >= creds.access_exp) {
                const tokens = await fetchToken(creds);
                creds.access_token = tokens.access_token;
                creds.access_exp = Math.floor(Date.now() / 1000) + 29 * 60;
            }
        }
        catch (error) {
            throw new Error(`Error: failed to update access token. Details: ${error.message}`);
        }
    }
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
class TradingApiClient extends SchwabAPIclient {
    async ordersByAccount(accountHash, fromEnteredTime, toEnteredTime, status = null, maxResults = null) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        const params = new URLSearchParams();
        params.append("fromEnteredTime", fromEnteredTime);
        params.append("toEnteredTime", toEnteredTime);
        if (status)
            params.append("status", status);
        if (maxResults !== null)
            params.append("maxResults", maxResults.toString());
        const url = `${endpoint.ORDS(accountHash)}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async orderById(accountHash, orderId) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        if (!orderId || orderId.trim().length === 0) {
            throw new Error("Error: Order Id parameter is not a string or is empty.");
        }
        const url = endpoint.ORDID(accountHash, orderId);
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async orderAll(fromEnteredTime, toEnteredTime, status = null, maxResults = null) {
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams();
        params.append("fromEnteredTime", fromEnteredTime);
        params.append("toEnteredTime", toEnteredTime);
        if (status)
            params.append("status", status);
        if (maxResults !== null)
            params.append("maxResults", maxResults.toString());
        const url = `${endpoint.ORDALL}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async placeOrderByAcct(accountHash, orderObj) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        if (!orderObj || Object.keys(orderObj).length === 0) {
            throw new Error("Error: Order object parameter is not an object or is empty.");
        }
        const url = endpoint.ORDS(accountHash);
        return fetchData(url, {
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
            body: JSON.stringify(orderObj),
        });
    }
    async orderDelete(accountHash, orderId) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        if (!orderId || orderId.trim().length === 0) {
            throw new Error("Error: Order Id parameter is not a string or is empty.");
        }
        const url = endpoint.ORDID(accountHash, orderId);
        return fetchData(url, {
            type: "DELETE",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async updateOrderById(accountHash, orderId, orderObj) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        if (!orderId || orderId.trim().length === 0) {
            throw new Error("Error: Order Id parameter is not a string or is empty.");
        }
        if (!orderObj || Object.keys(orderObj).length === 0) {
            throw new Error("Error: Order object parameter is not an object or is empty.");
        }
        const url = endpoint.ORDID(accountHash, orderId);
        return fetchData(url, {
            type: "PUT",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
            body: JSON.stringify(orderObj),
        });
    }
    async orderPreview(accountHash, orderObj) {
        throw new Error("NOTICE: This API call has not yet been implemented by Schwab.");
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        if (!orderObj || Object.keys(orderObj).length === 0) {
            throw new Error("Error: Order object parameter is not an object or is empty.");
        }
        const url = endpoint.ORDPREV(accountHash);
        return fetchData(url, {
            type: "POST",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
            body: JSON.stringify(orderObj),
        });
    }
    async accountsNumbers() {
        await this.checkAccessToken(_credentials.get(this));
        const url = endpoint.ACCTNUMS;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async accountsDetails(accountHash, fields = null) {
        await this.checkAccessToken(_credentials.get(this));
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        const query = fields ? `?fields=${fields}` : "";
        const url = `${endpoint.ACCTDETAILS(accountHash)}${query}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async accountsAll(fields = null) {
        await this.checkAccessToken(_credentials.get(this));
        const query = fields ? `?fields=${fields}` : "";
        const url = `${endpoint.ACCTLIST}${query}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async transactByAcct(accountHash, types, startDate, endDate, symbol = null) {
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams();
        params.append("types", types);
        params.append("startDate", startDate);
        params.append("endDate", endDate);
        if (symbol)
            params.append("symbol", symbol);
        const url = `${endpoint.TRANS(accountHash)}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async transactById(accountHash, transId) {
        if (!accountHash || accountHash.trim().length === 0) {
            throw new Error("Error: accountHash parameter is not a string or is empty.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const url = endpoint.TRANSID(accountHash, transId);
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async prefs() {
        await this.checkAccessToken(_credentials.get(this));
        const url = endpoint.PREFS;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
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
class MarketApiClient extends SchwabAPIclient {
    async markets(markets, date = null) {
        if (!markets || markets.trim().length === 0) {
            throw new Error("Error: you must specify a list of markets.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams();
        params.append("markets", markets);
        if (date)
            params.append("date", date);
        const url = `${endpoint.MARKETS}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async marketById(market_id, date = null) {
        if (!market_id || market_id.trim().length === 0) {
            throw new Error("Error: you must specify a market.");
        }
        await this.checkAccessToken(_credentials.get(this));
        let url = endpoint.MARKETSID(market_id);
        if (date) {
            const params = new URLSearchParams();
            params.append("date", date);
            url = `${url}?${params.toString()}`;
        }
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async instrumentsCusip(cusip_id) {
        if (!cusip_id || cusip_id.trim().length === 0) {
            throw new Error("Error: you must specify a cusip_id.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const url = endpoint.INSTID(cusip_id);
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async instrumentsSymbol(symbol, projection) {
        if (!symbol ||
            symbol.trim().length === 0 ||
            !projection ||
            projection.trim().length === 0) {
            throw new Error("Error: you must specify both a symbol and projection.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams({ symbol, projection });
        const url = `${endpoint.INST}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async movers(symbol_id, sort = null, frequency = null) {
        if (!symbol_id || symbol_id.trim().length === 0) {
            throw new Error("Error: symbol_id parameter is not a string or is empty.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams({ symbol_id });
        if (sort)
            params.append("sort", sort);
        if (frequency)
            params.append("frequency", frequency);
        const url = `${endpoint.MOVERS(symbol_id)}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async priceHistory(symbol_id, options = {}) {
        if (!symbol_id || symbol_id.trim().length === 0) {
            throw new Error("Error: symbol_id parameter is not a string or is empty.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams({ symbol_id });
        for (const [key, value] of Object.entries(options)) {
            if (value)
                params.append(key, value);
        }
        const url = `${endpoint.PRICEHIST}?${params.toString()}`;
        return fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
    }
    async expirationChain(symbol) {
        if (!symbol || symbol.trim().length === 0) {
            throw new Error("Error: symbol parameter is not a string or is empty.");
        }
        await this.checkAccessToken(_credentials.get(this));
        const url = `${endpoint.CHAINSEXP}?symbol=${symbol}`;
        const data = await fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
        return data;
    }
    async chains(symbol, options = {}) {
        if (typeof symbol !== "string" || symbol.trim().length === 0) {
            throw new Error("Error: symbol parameter is not a string or is empty.");
        }
        // Ensure credentials exist and check access token
        await this.checkAccessToken(_credentials.get(this));
        // Initialize query parameters
        const params = new URLSearchParams();
        params.append("symbol", symbol);
        // Add optional parameters if they are provided
        for (const [key, value] of Object.entries(options)) {
            if (value !== null && value !== undefined) {
                params.append(key, value.toString());
            }
        }
        // Construct the final query string
        const query = params.toString();
        const url = `${endpoint.CHAINS}?${query}`;
        // Fetch data and return the response
        const data = await fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
        return data;
    }
    async quoteById(symbol_id, fields = null) {
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams();
        if (fields)
            params.append("fields", fields);
        const url = `${endpoint.QUOTEID(symbol_id)}?${params.toString()}`;
        const data = await fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
        return data;
    }
    async quotes(symbols, fields = null, indicative = null) {
        await this.checkAccessToken(_credentials.get(this));
        const params = new URLSearchParams();
        params.append("symbols", symbols);
        if (fields)
            params.append("fields", fields);
        if (indicative)
            params.append("indicative", indicative);
        const url = `${endpoint.QUOTES}?${params.toString()}`;
        const data = await fetchData(url, {
            type: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${_credentials.get(this)?.access_token}`,
            },
        });
        return data;
    }
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
class StreamingApiClient extends SchwabAPIclient {
    streamEvents;
    stream;
    counterId;
    customerId;
    correlId;
    channel;
    functionId;
    streamUrl;
    constructor() {
        super();
        this.streamEvents = new EventEmitter();
        this.stream = null;
        this.counterId = 0;
        this.customerId = "";
        this.correlId = "";
        this.channel = "";
        this.functionId = "";
        this.streamUrl = "";
    }
    generateRequestMessage(command, service, params = {}) {
        return {
            requests: [
                {
                    requestid: `${++this.counterId}`,
                    service: service.toUpperCase(),
                    command: command.toUpperCase(),
                    SchwabClientCustomerId: this.customerId,
                    SchwabClientCorrelId: this.correlId,
                    ...(Object.keys(params).length > 0 && { parameters: { ...params } }),
                },
            ],
        };
    }
    async generateLoginMessage() {
        await this.checkAccessToken(_credentials.get(this));
        return {
            requests: [
                {
                    requestid: `${++this.counterId}`,
                    service: "ADMIN",
                    command: "LOGIN",
                    SchwabClientCustomerId: this.customerId,
                    SchwabClientCorrelId: this.correlId,
                    parameters: {
                        Authorization: _credentials.get(this)?.access_token,
                        SchwabClientChannel: this.channel,
                        SchwabClientFunctionId: this.functionId,
                    },
                },
            ],
        };
    }
    async generateLogoutMessage() {
        await this.checkAccessToken(_credentials.get(this));
        return {
            requests: [
                {
                    requestid: `${++this.counterId}`,
                    service: "ADMIN",
                    command: "LOGOUT",
                    SchwabClientCustomerId: this.customerId,
                    SchwabClientCorrelId: this.correlId,
                },
            ],
        };
    }
    async streamInit() {
        try {
            const trading = new TradingApiClient();
            const data = await trading.prefs();
            this.streamUrl = data.streamerInfo[0].streamerSocketUrl;
            this.customerId = data.streamerInfo[0].schwabClientCustomerId;
            this.correlId = data.streamerInfo[0].schwabClientCorrelId;
            this.channel = data.streamerInfo[0].schwabClientChannel;
            this.functionId = data.streamerInfo[0].schwabClientFunctionId;
            this.stream = new WebSocket(this.streamUrl);
            this.stream.on("open", () => this.streamEvents.emit("open"));
            this.stream.on("close", (code, reason) => this.streamEvents.emit("close", code, reason?.toString() || "No reason provided"));
            this.stream.on("error", (error) => this.streamEvents.emit("error", error));
            this.stream.on("message", (message) => {
                const strmessage = Buffer.isBuffer(message)
                    ? message.toString("utf8")
                    : message.toString();
                this.streamEvents.emit("message", strmessage);
            });
            await new Promise((resolve, reject) => {
                this.stream?.on("open", resolve);
                this.stream?.on("error", reject);
            });
            logger("streaming", "msgs", "Websocket connectiom established:", this.streamUrl);
        }
        catch (error) {
            throw new Error(`Error initializing stream: ${error.message}`);
        }
    }
    async streamSchwabLogin() {
        const loginMsg = await this.generateLoginMessage();
        if (this.stream && this.stream.readyState === WebSocket.OPEN) {
            return new Promise((resolve, reject) => {
                const messageHandler = (message) => {
                    try {
                        const strmessage = Buffer.isBuffer(message)
                            ? JSON.parse(message.toString("utf8"))
                            : JSON.parse(message.toString());
                        // Check for array
                        if (!Array.isArray(strmessage.response)) {
                            reject(new Error("Expected array in LOGIN response: 'response' is not an array"));
                        }
                        if (strmessage.response[0]?.content?.code === 0) {
                            logger("streaming", "msgs", "LOGIN to websocket succeeded: ", JSON.stringify(strmessage));
                            resolve(strmessage);
                        }
                        else {
                            reject(new Error(`Login failed with code = ${strmessage.response[0]?.content?.code}`));
                        }
                        this.stream?.removeListener("message", messageHandler);
                    }
                    catch (error) {
                        reject(error);
                    }
                };
                if (this.stream) {
                    this.stream.on("message", messageHandler);
                    logger("streaming", "msgs", "LOGIN message:", JSON.stringify(loginMsg));
                    this.stream.send(JSON.stringify(loginMsg));
                }
                else {
                    throw new Error("WebSocket stream is not initialized.");
                }
                logger("streaming", "msgs", "Sent LOGIN message:", JSON.stringify(loginMsg));
                setTimeout(() => {
                    this.stream?.removeListener("message", messageHandler);
                    reject(new Error("Timeout: No response received"));
                }, 5000);
            });
        }
        else {
            throw new Error("WebSocket is not open.");
        }
    }
    async streamSchwabLogout() {
        const logoutMsg = await this.generateLogoutMessage();
        if (this.stream && this.stream.readyState === WebSocket.OPEN) {
            this.stream.send(JSON.stringify(logoutMsg));
            logger("streaming", "msgs", "Sent LOGOUT message: ", JSON.stringify(logoutMsg));
        }
        else {
            throw new Error("No message sent. WebSocket is not open.");
        }
    }
    streamSchwabRequest(command, service, params = {}) {
        const requestMsg = this.generateRequestMessage(command, service, params);
        if (this.stream && this.stream.readyState === WebSocket.OPEN) {
            this.stream.send(JSON.stringify(requestMsg));
            logger("streaming", "msgs", "Sent request message: ", JSON.stringify(requestMsg));
        }
        else {
            throw new Error("No message sent. WebSocket is not open.");
        }
    }
    streamListen(eventName, listener) {
        this.streamEvents.on(eventName, (...args) => {
            // Log the received message
            logger("streaming", "msgs", `Received message for event: ${eventName}`, args);
            // Call the original listener with the received arguments
            listener(...args);
        });
    }
    streamClose() {
        logger("streaming", "msgs", "Closing websocket stream.");
        if (this.stream) {
            this.stream.close();
        }
        else {
            throw new Error("WebSocket is closed or does not exist.");
        }
    }
}
export { MarketApiClient, TradingApiClient, StreamingApiClient };
//# sourceMappingURL=schwab-client-js.js.map
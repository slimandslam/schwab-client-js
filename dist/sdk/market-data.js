/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
/** NBBO - realtime, NFL - Non-fee liable quote. */
export var QuoteType;
(function (QuoteType) {
    QuoteType["NBBO"] = "NBBO";
    QuoteType["NFL"] = "NFL";
})(QuoteType || (QuoteType = {}));
/** Dividend frequency 1 – once a year or annually 2 – 2x a year or semi-annualy 3 - 3x a year (ex. ARCO, EBRPF) 4 – 4x a year or quarterly 6 - 6x per yr or every other month 11 – 11x a year (ex. FBND, FCOR) 12 – 12x a year or monthly */
export var DivFreq;
(function (DivFreq) {
    DivFreq[DivFreq["Value1"] = 1] = "Value1";
    DivFreq[DivFreq["Value2"] = 2] = "Value2";
    DivFreq[DivFreq["Value3"] = 3] = "Value3";
    DivFreq[DivFreq["Value4"] = 4] = "Value4";
    DivFreq[DivFreq["Value6"] = 6] = "Value6";
    DivFreq[DivFreq["Value11"] = 11] = "Value11";
    DivFreq[DivFreq["Value12"] = 12] = "Value12";
})(DivFreq || (DivFreq = {}));
/** option contract exercise type America or European */
export var ExerciseType;
(function (ExerciseType) {
    ExerciseType["A"] = "A";
    ExerciseType["E"] = "E";
})(ExerciseType || (ExerciseType = {}));
/** FundStrategy "A" - Active "L" - Leveraged "P" - Passive "Q" - Quantitative "S" - Short */
export var FundStrategy;
(function (FundStrategy) {
    FundStrategy["A"] = "A";
    FundStrategy["L"] = "L";
    FundStrategy["P"] = "P";
    FundStrategy["Q"] = "Q";
    FundStrategy["S"] = "S";
})(FundStrategy || (FundStrategy = {}));
/** M for End Of Month Expiration Calendar Cycle. (To match the last business day of the month), Q for Quarterly expirations (last business day of the quarter month MAR/JUN/SEP/DEC), W for Weekly expiration (also called Friday Short Term Expirations) and S for Expires 3rd Friday of the month (also known as regular options). */
export var ExpirationType;
(function (ExpirationType) {
    ExpirationType["M"] = "M";
    ExpirationType["Q"] = "Q";
    ExpirationType["S"] = "S";
    ExpirationType["W"] = "W";
})(ExpirationType || (ExpirationType = {}));
/** option contract settlement type AM or PM */
export var SettlementType;
(function (SettlementType) {
    SettlementType["A"] = "A";
    SettlementType["P"] = "P";
})(SettlementType || (SettlementType = {}));
/** Indicates call or put */
export var ContractType;
(function (ContractType) {
    ContractType["P"] = "P";
    ContractType["C"] = "C";
})(ContractType || (ContractType = {}));
/** Asset Sub Type (only there if applicable) */
export var MutualFundAssetSubType;
(function (MutualFundAssetSubType) {
    MutualFundAssetSubType["OEF"] = "OEF";
    MutualFundAssetSubType["CEF"] = "CEF";
    MutualFundAssetSubType["MMF"] = "MMF";
})(MutualFundAssetSubType || (MutualFundAssetSubType = {}));
/** Asset Sub Type (only there if applicable) */
export var EquityAssetSubType;
(function (EquityAssetSubType) {
    EquityAssetSubType["COE"] = "COE";
    EquityAssetSubType["PRF"] = "PRF";
    EquityAssetSubType["ADR"] = "ADR";
    EquityAssetSubType["GDR"] = "GDR";
    EquityAssetSubType["CEF"] = "CEF";
    EquityAssetSubType["ETF"] = "ETF";
    EquityAssetSubType["ETN"] = "ETN";
    EquityAssetSubType["UIT"] = "UIT";
    EquityAssetSubType["WAR"] = "WAR";
    EquityAssetSubType["RGT"] = "RGT";
})(EquityAssetSubType || (EquityAssetSubType = {}));
/** Instrument's asset type */
export var AssetMainType;
(function (AssetMainType) {
    AssetMainType["BOND"] = "BOND";
    AssetMainType["EQUITY"] = "EQUITY";
    AssetMainType["FOREX"] = "FOREX";
    AssetMainType["FUTURE"] = "FUTURE";
    AssetMainType["FUTURE_OPTION"] = "FUTURE_OPTION";
    AssetMainType["INDEX"] = "INDEX";
    AssetMainType["MUTUAL_FUND"] = "MUTUAL_FUND";
    AssetMainType["OPTION"] = "OPTION";
})(AssetMainType || (AssetMainType = {}));
import axios from "axios";
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
    instance;
    securityData = null;
    securityWorker;
    secure;
    format;
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
        this.instance = axios.create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || "https://api.schwabapi.com/marketdata/v1",
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    setSecurityData = (data) => {
        this.securityData = data;
    };
    mergeRequestParams(params1, params2) {
        const method = params1.method || (params2 && params2.method);
        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method &&
                    this.instance.defaults.headers[method.toLowerCase()]) ||
                    {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        }
        else {
            return `${formItem}`;
        }
    }
    createFormData(input) {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [property];
            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
    request = async ({ secure, path, type, query, format, body, ...params }) => {
        const secureParams = ((typeof secure === "boolean" ? secure : this.secure) &&
            this.securityWorker &&
            (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;
        if (type === ContentType.FormData &&
            body &&
            body !== null &&
            typeof body === "object") {
            body = this.createFormData(body);
        }
        if (type === ContentType.Text &&
            body &&
            body !== null &&
            typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type ? { "Content-Type": type } : {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
        });
    };
}
/**
 * @title Market Data
 * @version 1.0.0
 * @baseUrl https://api.schwabapi.com/marketdata/v1
 * @contact Schwab Trader API team <TraderAPI@Schwab.com>
 *
 * Trader API - Market data
 */
export class MarketData extends HttpClient {
    quotes = {
        /**
         * No description
         *
         * @tags Quotes
         * @name GetQuotes
         * @summary Get Quotes by list of symbols.
         * @request GET:/quotes
         * @secure
         */
        getQuotes: (query, params = {}) => this.request({
            path: `/quotes`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    symbolId = {
        /**
         * No description
         *
         * @tags Quotes
         * @name GetQuote
         * @summary Get Quote by single symbol.
         * @request GET:/{symbol_id}/quotes
         * @secure
         */
        getQuote: (symbolId, query, params = {}) => this.request({
            path: `/${symbolId}/quotes`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    chains = {
        /**
         * @description Get Option Chain including information on options contracts associated with each expiration.
         *
         * @tags Option Chains
         * @name GetChain
         * @summary Get option chain for an optionable Symbol
         * @request GET:/chains
         * @secure
         */
        getChain: (query, params = {}) => this.request({
            path: `/chains`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    expirationchain = {
        /**
         * @description Get Option Expiration (Series) information for an optionable symbol.  Does not include individual options contracts for the underlying.
         *
         * @tags Option Expiration Chain
         * @name GetExpirationChain
         * @summary Get option expiration chain for an optionable symbol
         * @request GET:/expirationchain
         * @secure
         */
        getExpirationChain: (query, params = {}) => this.request({
            path: `/expirationchain`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    pricehistory = {
        /**
         * @description Get historical Open, High, Low, Close, and Volume for a given frequency (i.e. aggregation).  Frequency available is dependent on periodType selected.  The datetime format is in EPOCH milliseconds.
         *
         * @tags PriceHistory
         * @name GetPriceHistory
         * @summary Get PriceHistory for a single symbol and date ranges.
         * @request GET:/pricehistory
         * @secure
         */
        getPriceHistory: (query, params = {}) => this.request({
            path: `/pricehistory`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    movers = {
        /**
         * @description Get a list of top 10 securities movement for a specific index.
         *
         * @tags Movers
         * @name GetMovers
         * @summary Get Movers for a specific index.
         * @request GET:/movers/{symbol_id}
         * @secure
         */
        getMovers: (symbolId, query, params = {}) => this.request({
            path: `/movers/${symbolId}`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    markets = {
        /**
         * @description Get Market Hours for dates in the future across different markets.
         *
         * @tags MarketHours
         * @name GetMarketHours
         * @summary Get Market Hours for different markets.
         * @request GET:/markets
         * @secure
         */
        getMarketHours: (query, params = {}) => this.request({
            path: `/markets`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Get Market Hours for dates in the future for a single market.
         *
         * @tags MarketHours
         * @name GetMarketHour
         * @summary Get Market Hours for a single market.
         * @request GET:/markets/{market_id}
         * @secure
         */
        getMarketHour: (marketId, query, params = {}) => this.request({
            path: `/markets/${marketId}`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    instruments = {
        /**
         * @description Get Instruments details by using different projections.  Get more specific fundamental instrument data by using fundamental as the projection.
         *
         * @tags Instruments
         * @name GetInstruments
         * @summary Get Instruments by symbols and projections.
         * @request GET:/instruments
         * @secure
         */
        getInstruments: (query, params = {}) => this.request({
            path: `/instruments`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Get basic instrument details by cusip
         *
         * @tags Instruments
         * @name GetInstrumentsByCusip
         * @summary Get Instrument by specific cusip
         * @request GET:/instruments/{cusip_id}
         * @secure
         */
        getInstrumentsByCusip: (cusipId, params = {}) => this.request({
            path: `/instruments/${cusipId}`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        }),
    };
}
//# sourceMappingURL=market-data.js.map
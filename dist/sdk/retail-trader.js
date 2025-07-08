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
export var TransactionType;
(function (TransactionType) {
    TransactionType["TRADE"] = "TRADE";
    TransactionType["RECEIVE_AND_DELIVER"] = "RECEIVE_AND_DELIVER";
    TransactionType["DIVIDEND_OR_INTEREST"] = "DIVIDEND_OR_INTEREST";
    TransactionType["ACH_RECEIPT"] = "ACH_RECEIPT";
    TransactionType["ACH_DISBURSEMENT"] = "ACH_DISBURSEMENT";
    TransactionType["CASH_RECEIPT"] = "CASH_RECEIPT";
    TransactionType["CASH_DISBURSEMENT"] = "CASH_DISBURSEMENT";
    TransactionType["ELECTRONIC_FUND"] = "ELECTRONIC_FUND";
    TransactionType["WIRE_OUT"] = "WIRE_OUT";
    TransactionType["WIRE_IN"] = "WIRE_IN";
    TransactionType["JOURNAL"] = "JOURNAL";
    TransactionType["MEMORANDUM"] = "MEMORANDUM";
    TransactionType["MARGIN_CALL"] = "MARGIN_CALL";
    TransactionType["MONEY_MARKET"] = "MONEY_MARKET";
    TransactionType["SMA_ADJUSTMENT"] = "SMA_ADJUSTMENT";
})(TransactionType || (TransactionType = {}));
export var ApiOrderStatus;
(function (ApiOrderStatus) {
    ApiOrderStatus["AWAITING_PARENT_ORDER"] = "AWAITING_PARENT_ORDER";
    ApiOrderStatus["AWAITING_CONDITION"] = "AWAITING_CONDITION";
    ApiOrderStatus["AWAITING_STOP_CONDITION"] = "AWAITING_STOP_CONDITION";
    ApiOrderStatus["AWAITING_MANUAL_REVIEW"] = "AWAITING_MANUAL_REVIEW";
    ApiOrderStatus["ACCEPTED"] = "ACCEPTED";
    ApiOrderStatus["AWAITING_UR_OUT"] = "AWAITING_UR_OUT";
    ApiOrderStatus["PENDING_ACTIVATION"] = "PENDING_ACTIVATION";
    ApiOrderStatus["QUEUED"] = "QUEUED";
    ApiOrderStatus["WORKING"] = "WORKING";
    ApiOrderStatus["REJECTED"] = "REJECTED";
    ApiOrderStatus["PENDING_CANCEL"] = "PENDING_CANCEL";
    ApiOrderStatus["CANCELED"] = "CANCELED";
    ApiOrderStatus["PENDING_REPLACE"] = "PENDING_REPLACE";
    ApiOrderStatus["REPLACED"] = "REPLACED";
    ApiOrderStatus["FILLED"] = "FILLED";
    ApiOrderStatus["EXPIRED"] = "EXPIRED";
    ApiOrderStatus["NEW"] = "NEW";
    ApiOrderStatus["AWAITING_RELEASE_TIME"] = "AWAITING_RELEASE_TIME";
    ApiOrderStatus["PENDING_ACKNOWLEDGEMENT"] = "PENDING_ACKNOWLEDGEMENT";
    ApiOrderStatus["PENDING_RECALL"] = "PENDING_RECALL";
    ApiOrderStatus["UNKNOWN"] = "UNKNOWN";
})(ApiOrderStatus || (ApiOrderStatus = {}));
export var AssetType;
(function (AssetType) {
    AssetType["EQUITY"] = "EQUITY";
    AssetType["MUTUAL_FUND"] = "MUTUAL_FUND";
    AssetType["OPTION"] = "OPTION";
    AssetType["FUTURE"] = "FUTURE";
    AssetType["FOREX"] = "FOREX";
    AssetType["INDEX"] = "INDEX";
    AssetType["CASH_EQUIVALENT"] = "CASH_EQUIVALENT";
    AssetType["FIXED_INCOME"] = "FIXED_INCOME";
    AssetType["PRODUCT"] = "PRODUCT";
    AssetType["CURRENCY"] = "CURRENCY";
    AssetType["COLLECTIVE_INVESTMENT"] = "COLLECTIVE_INVESTMENT";
})(AssetType || (AssetType = {}));
export var Instruction;
(function (Instruction) {
    Instruction["BUY"] = "BUY";
    Instruction["SELL"] = "SELL";
    Instruction["BUY_TO_COVER"] = "BUY_TO_COVER";
    Instruction["SELL_SHORT"] = "SELL_SHORT";
    Instruction["BUY_TO_OPEN"] = "BUY_TO_OPEN";
    Instruction["BUY_TO_CLOSE"] = "BUY_TO_CLOSE";
    Instruction["SELL_TO_OPEN"] = "SELL_TO_OPEN";
    Instruction["SELL_TO_CLOSE"] = "SELL_TO_CLOSE";
    Instruction["EXCHANGE"] = "EXCHANGE";
    Instruction["SELL_SHORT_EXEMPT"] = "SELL_SHORT_EXEMPT";
})(Instruction || (Instruction = {}));
export var FeeType;
(function (FeeType) {
    FeeType["COMMISSION"] = "COMMISSION";
    FeeType["SEC_FEE"] = "SEC_FEE";
    FeeType["STR_FEE"] = "STR_FEE";
    FeeType["R_FEE"] = "R_FEE";
    FeeType["CDSC_FEE"] = "CDSC_FEE";
    FeeType["OPT_REG_FEE"] = "OPT_REG_FEE";
    FeeType["ADDITIONAL_FEE"] = "ADDITIONAL_FEE";
    FeeType["MISCELLANEOUS_FEE"] = "MISCELLANEOUS_FEE";
    FeeType["FTT"] = "FTT";
    FeeType["FUTURES_CLEARING_FEE"] = "FUTURES_CLEARING_FEE";
    FeeType["FUTURES_DESK_OFFICE_FEE"] = "FUTURES_DESK_OFFICE_FEE";
    FeeType["FUTURES_EXCHANGE_FEE"] = "FUTURES_EXCHANGE_FEE";
    FeeType["FUTURES_GLOBEX_FEE"] = "FUTURES_GLOBEX_FEE";
    FeeType["FUTURES_NFA_FEE"] = "FUTURES_NFA_FEE";
    FeeType["FUTURES_PIT_BROKERAGE_FEE"] = "FUTURES_PIT_BROKERAGE_FEE";
    FeeType["FUTURES_TRANSACTION_FEE"] = "FUTURES_TRANSACTION_FEE";
    FeeType["LOW_PROCEEDS_COMMISSION"] = "LOW_PROCEEDS_COMMISSION";
    FeeType["BASE_CHARGE"] = "BASE_CHARGE";
    FeeType["GENERAL_CHARGE"] = "GENERAL_CHARGE";
    FeeType["GST_FEE"] = "GST_FEE";
    FeeType["TAF_FEE"] = "TAF_FEE";
    FeeType["INDEX_OPTION_FEE"] = "INDEX_OPTION_FEE";
    FeeType["TEFRA_TAX"] = "TEFRA_TAX";
    FeeType["STATE_TAX"] = "STATE_TAX";
    FeeType["UNKNOWN"] = "UNKNOWN";
})(FeeType || (FeeType = {}));
export var APIRuleAction;
(function (APIRuleAction) {
    APIRuleAction["ACCEPT"] = "ACCEPT";
    APIRuleAction["ALERT"] = "ALERT";
    APIRuleAction["REJECT"] = "REJECT";
    APIRuleAction["REVIEW"] = "REVIEW";
    APIRuleAction["UNKNOWN"] = "UNKNOWN";
})(APIRuleAction || (APIRuleAction = {}));
export var SettlementInstruction;
(function (SettlementInstruction) {
    SettlementInstruction["REGULAR"] = "REGULAR";
    SettlementInstruction["CASH"] = "CASH";
    SettlementInstruction["NEXT_DAY"] = "NEXT_DAY";
    SettlementInstruction["UNKNOWN"] = "UNKNOWN";
})(SettlementInstruction || (SettlementInstruction = {}));
export var AmountIndicator;
(function (AmountIndicator) {
    AmountIndicator["DOLLARS"] = "DOLLARS";
    AmountIndicator["SHARES"] = "SHARES";
    AmountIndicator["ALL_SHARES"] = "ALL_SHARES";
    AmountIndicator["PERCENTAGE"] = "PERCENTAGE";
    AmountIndicator["UNKNOWN"] = "UNKNOWN";
})(AmountIndicator || (AmountIndicator = {}));
export var Status;
(function (Status) {
    Status["AWAITING_PARENT_ORDER"] = "AWAITING_PARENT_ORDER";
    Status["AWAITING_CONDITION"] = "AWAITING_CONDITION";
    Status["AWAITING_STOP_CONDITION"] = "AWAITING_STOP_CONDITION";
    Status["AWAITING_MANUAL_REVIEW"] = "AWAITING_MANUAL_REVIEW";
    Status["ACCEPTED"] = "ACCEPTED";
    Status["AWAITING_UR_OUT"] = "AWAITING_UR_OUT";
    Status["PENDING_ACTIVATION"] = "PENDING_ACTIVATION";
    Status["QUEUED"] = "QUEUED";
    Status["WORKING"] = "WORKING";
    Status["REJECTED"] = "REJECTED";
    Status["PENDING_CANCEL"] = "PENDING_CANCEL";
    Status["CANCELED"] = "CANCELED";
    Status["PENDING_REPLACE"] = "PENDING_REPLACE";
    Status["REPLACED"] = "REPLACED";
    Status["FILLED"] = "FILLED";
    Status["EXPIRED"] = "EXPIRED";
    Status["NEW"] = "NEW";
    Status["AWAITING_RELEASE_TIME"] = "AWAITING_RELEASE_TIME";
    Status["PENDING_ACKNOWLEDGEMENT"] = "PENDING_ACKNOWLEDGEMENT";
    Status["PENDING_RECALL"] = "PENDING_RECALL";
    Status["UNKNOWN"] = "UNKNOWN";
})(Status || (Status = {}));
export var OrderStrategyType;
(function (OrderStrategyType) {
    OrderStrategyType["SINGLE"] = "SINGLE";
    OrderStrategyType["CANCEL"] = "CANCEL";
    OrderStrategyType["RECALL"] = "RECALL";
    OrderStrategyType["PAIR"] = "PAIR";
    OrderStrategyType["FLATTEN"] = "FLATTEN";
    OrderStrategyType["TWO_DAY_SWAP"] = "TWO_DAY_SWAP";
    OrderStrategyType["BLAST_ALL"] = "BLAST_ALL";
    OrderStrategyType["OCO"] = "OCO";
    OrderStrategyType["TRIGGER"] = "TRIGGER";
})(OrderStrategyType || (OrderStrategyType = {}));
export var SpecialInstruction;
(function (SpecialInstruction) {
    SpecialInstruction["ALL_OR_NONE"] = "ALL_OR_NONE";
    SpecialInstruction["DO_NOT_REDUCE"] = "DO_NOT_REDUCE";
    SpecialInstruction["ALL_OR_NONE_DO_NOT_REDUCE"] = "ALL_OR_NONE_DO_NOT_REDUCE";
})(SpecialInstruction || (SpecialInstruction = {}));
export var TaxLotMethod;
(function (TaxLotMethod) {
    TaxLotMethod["FIFO"] = "FIFO";
    TaxLotMethod["LIFO"] = "LIFO";
    TaxLotMethod["HIGH_COST"] = "HIGH_COST";
    TaxLotMethod["LOW_COST"] = "LOW_COST";
    TaxLotMethod["AVERAGE_COST"] = "AVERAGE_COST";
    TaxLotMethod["SPECIFIC_LOT"] = "SPECIFIC_LOT";
    TaxLotMethod["LOSS_HARVESTER"] = "LOSS_HARVESTER";
})(TaxLotMethod || (TaxLotMethod = {}));
export var PriceLinkType;
(function (PriceLinkType) {
    PriceLinkType["VALUE"] = "VALUE";
    PriceLinkType["PERCENT"] = "PERCENT";
    PriceLinkType["TICK"] = "TICK";
})(PriceLinkType || (PriceLinkType = {}));
export var PriceLinkBasis;
(function (PriceLinkBasis) {
    PriceLinkBasis["MANUAL"] = "MANUAL";
    PriceLinkBasis["BASE"] = "BASE";
    PriceLinkBasis["TRIGGER"] = "TRIGGER";
    PriceLinkBasis["LAST"] = "LAST";
    PriceLinkBasis["BID"] = "BID";
    PriceLinkBasis["ASK"] = "ASK";
    PriceLinkBasis["ASK_BID"] = "ASK_BID";
    PriceLinkBasis["MARK"] = "MARK";
    PriceLinkBasis["AVERAGE"] = "AVERAGE";
})(PriceLinkBasis || (PriceLinkBasis = {}));
export var StopType;
(function (StopType) {
    StopType["STANDARD"] = "STANDARD";
    StopType["BID"] = "BID";
    StopType["ASK"] = "ASK";
    StopType["LAST"] = "LAST";
    StopType["MARK"] = "MARK";
})(StopType || (StopType = {}));
export var StopPriceLinkType;
(function (StopPriceLinkType) {
    StopPriceLinkType["VALUE"] = "VALUE";
    StopPriceLinkType["PERCENT"] = "PERCENT";
    StopPriceLinkType["TICK"] = "TICK";
})(StopPriceLinkType || (StopPriceLinkType = {}));
export var StopPriceLinkBasis;
(function (StopPriceLinkBasis) {
    StopPriceLinkBasis["MANUAL"] = "MANUAL";
    StopPriceLinkBasis["BASE"] = "BASE";
    StopPriceLinkBasis["TRIGGER"] = "TRIGGER";
    StopPriceLinkBasis["LAST"] = "LAST";
    StopPriceLinkBasis["BID"] = "BID";
    StopPriceLinkBasis["ASK"] = "ASK";
    StopPriceLinkBasis["ASK_BID"] = "ASK_BID";
    StopPriceLinkBasis["MARK"] = "MARK";
    StopPriceLinkBasis["AVERAGE"] = "AVERAGE";
})(StopPriceLinkBasis || (StopPriceLinkBasis = {}));
export var RequestedDestination;
(function (RequestedDestination) {
    RequestedDestination["INET"] = "INET";
    RequestedDestination["ECN_ARCA"] = "ECN_ARCA";
    RequestedDestination["CBOE"] = "CBOE";
    RequestedDestination["AMEX"] = "AMEX";
    RequestedDestination["PHLX"] = "PHLX";
    RequestedDestination["ISE"] = "ISE";
    RequestedDestination["BOX"] = "BOX";
    RequestedDestination["NYSE"] = "NYSE";
    RequestedDestination["NASDAQ"] = "NASDAQ";
    RequestedDestination["BATS"] = "BATS";
    RequestedDestination["C2"] = "C2";
    RequestedDestination["AUTO"] = "AUTO";
})(RequestedDestination || (RequestedDestination = {}));
export var ComplexOrderStrategyType;
(function (ComplexOrderStrategyType) {
    ComplexOrderStrategyType["NONE"] = "NONE";
    ComplexOrderStrategyType["COVERED"] = "COVERED";
    ComplexOrderStrategyType["VERTICAL"] = "VERTICAL";
    ComplexOrderStrategyType["BACK_RATIO"] = "BACK_RATIO";
    ComplexOrderStrategyType["CALENDAR"] = "CALENDAR";
    ComplexOrderStrategyType["DIAGONAL"] = "DIAGONAL";
    ComplexOrderStrategyType["STRADDLE"] = "STRADDLE";
    ComplexOrderStrategyType["STRANGLE"] = "STRANGLE";
    ComplexOrderStrategyType["COLLAR_SYNTHETIC"] = "COLLAR_SYNTHETIC";
    ComplexOrderStrategyType["BUTTERFLY"] = "BUTTERFLY";
    ComplexOrderStrategyType["CONDOR"] = "CONDOR";
    ComplexOrderStrategyType["IRON_CONDOR"] = "IRON_CONDOR";
    ComplexOrderStrategyType["VERTICAL_ROLL"] = "VERTICAL_ROLL";
    ComplexOrderStrategyType["COLLAR_WITH_STOCK"] = "COLLAR_WITH_STOCK";
    ComplexOrderStrategyType["DOUBLE_DIAGONAL"] = "DOUBLE_DIAGONAL";
    ComplexOrderStrategyType["UNBALANCED_BUTTERFLY"] = "UNBALANCED_BUTTERFLY";
    ComplexOrderStrategyType["UNBALANCED_CONDOR"] = "UNBALANCED_CONDOR";
    ComplexOrderStrategyType["UNBALANCED_IRON_CONDOR"] = "UNBALANCED_IRON_CONDOR";
    ComplexOrderStrategyType["UNBALANCED_VERTICAL_ROLL"] = "UNBALANCED_VERTICAL_ROLL";
    ComplexOrderStrategyType["MUTUAL_FUND_SWAP"] = "MUTUAL_FUND_SWAP";
    ComplexOrderStrategyType["CUSTOM"] = "CUSTOM";
})(ComplexOrderStrategyType || (ComplexOrderStrategyType = {}));
/** Same as orderType, but does not have UNKNOWN since this type is not allowed as an input */
export var OrderTypeRequest;
(function (OrderTypeRequest) {
    OrderTypeRequest["MARKET"] = "MARKET";
    OrderTypeRequest["LIMIT"] = "LIMIT";
    OrderTypeRequest["STOP"] = "STOP";
    OrderTypeRequest["STOP_LIMIT"] = "STOP_LIMIT";
    OrderTypeRequest["TRAILING_STOP"] = "TRAILING_STOP";
    OrderTypeRequest["CABINET"] = "CABINET";
    OrderTypeRequest["NON_MARKETABLE"] = "NON_MARKETABLE";
    OrderTypeRequest["MARKET_ON_CLOSE"] = "MARKET_ON_CLOSE";
    OrderTypeRequest["EXERCISE"] = "EXERCISE";
    OrderTypeRequest["TRAILING_STOP_LIMIT"] = "TRAILING_STOP_LIMIT";
    OrderTypeRequest["NET_DEBIT"] = "NET_DEBIT";
    OrderTypeRequest["NET_CREDIT"] = "NET_CREDIT";
    OrderTypeRequest["NET_ZERO"] = "NET_ZERO";
    OrderTypeRequest["LIMIT_ON_CLOSE"] = "LIMIT_ON_CLOSE";
})(OrderTypeRequest || (OrderTypeRequest = {}));
export var OrderType;
(function (OrderType) {
    OrderType["MARKET"] = "MARKET";
    OrderType["LIMIT"] = "LIMIT";
    OrderType["STOP"] = "STOP";
    OrderType["STOP_LIMIT"] = "STOP_LIMIT";
    OrderType["TRAILING_STOP"] = "TRAILING_STOP";
    OrderType["CABINET"] = "CABINET";
    OrderType["NON_MARKETABLE"] = "NON_MARKETABLE";
    OrderType["MARKET_ON_CLOSE"] = "MARKET_ON_CLOSE";
    OrderType["EXERCISE"] = "EXERCISE";
    OrderType["TRAILING_STOP_LIMIT"] = "TRAILING_STOP_LIMIT";
    OrderType["NET_DEBIT"] = "NET_DEBIT";
    OrderType["NET_CREDIT"] = "NET_CREDIT";
    OrderType["NET_ZERO"] = "NET_ZERO";
    OrderType["LIMIT_ON_CLOSE"] = "LIMIT_ON_CLOSE";
    OrderType["UNKNOWN"] = "UNKNOWN";
})(OrderType || (OrderType = {}));
export var Duration;
(function (Duration) {
    Duration["DAY"] = "DAY";
    Duration["GOOD_TILL_CANCEL"] = "GOOD_TILL_CANCEL";
    Duration["FILL_OR_KILL"] = "FILL_OR_KILL";
    Duration["IMMEDIATE_OR_CANCEL"] = "IMMEDIATE_OR_CANCEL";
    Duration["END_OF_WEEK"] = "END_OF_WEEK";
    Duration["END_OF_MONTH"] = "END_OF_MONTH";
    Duration["NEXT_END_OF_MONTH"] = "NEXT_END_OF_MONTH";
    Duration["UNKNOWN"] = "UNKNOWN";
})(Duration || (Duration = {}));
export var Session;
(function (Session) {
    Session["NORMAL"] = "NORMAL";
    Session["AM"] = "AM";
    Session["PM"] = "PM";
    Session["SEAMLESS"] = "SEAMLESS";
})(Session || (Session = {}));
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
            baseURL: axiosConfig.baseURL || "https://api.schwabapi.com/trader/v1",
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
 * @title Trader API - Account Access and User Preferences
 * @version 1.0.0
 * @baseUrl https://api.schwabapi.com/trader/v1
 * @contact Schwab Trader API team <TraderAPI@Schwab.com>
 *
 * Schwab Trader API access to Account, Order entry and User Preferences
 */
export class RetailTrader extends HttpClient {
    accounts = {
        /**
         * @description Account numbers in plain text cannot be used outside of headers or request/response bodies. As the first step consumers must invoke this service to retrieve the list of plain text/encrypted value pairs, and use encrypted account values for all subsequent calls for any accountNumber request.
         *
         * @tags Accounts
         * @name GetAccountNumbers
         * @summary Get list of account numbers and their encrypted values
         * @request GET:/accounts/accountNumbers
         * @secure
         */
        getAccountNumbers: (params = {}) => this.request({
            path: `/accounts/accountNumbers`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description All the linked account information for the user logged in. The balances on these accounts are displayed by default however the positions on these accounts will be displayed based on the "positions" flag.
         *
         * @tags Accounts
         * @name GetAccounts
         * @summary Get linked account(s) balances and positions for the logged in user.
         * @request GET:/accounts
         * @secure
         */
        getAccounts: (query, params = {}) => this.request({
            path: `/accounts`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Specific account information with balances and positions. The balance information on these accounts is displayed by default but Positions will be returned based on the "positions" flag.
         *
         * @tags Accounts
         * @name GetAccount
         * @summary Get a specific account balance and positions for the logged in user.
         * @request GET:/accounts/{accountNumber}
         * @secure
         */
        getAccount: (accountNumber, query, params = {}) => this.request({
            path: `/accounts/${accountNumber}`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description All orders for a specific account. Orders retrieved can be filtered based on input parameters below. Maximum date range is 1 year.
         *
         * @tags Orders
         * @name GetOrdersByPathParam
         * @summary Get all orders for a specific account.
         * @request GET:/accounts/{accountNumber}/orders
         * @secure
         */
        getOrdersByPathParam: (accountNumber, query, params = {}) => this.request({
            path: `/accounts/${accountNumber}/orders`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Place an order for a specific account.
         *
         * @tags Orders
         * @name PlaceOrder
         * @summary Place order for a specific account.
         * @request POST:/accounts/{accountNumber}/orders
         * @secure
         */
        placeOrder: (accountNumber, data, params = {}) => this.request({
            path: `/accounts/${accountNumber}/orders`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        }),
        /**
         * @description Get a specific order by its ID, for a specific account
         *
         * @tags Orders
         * @name GetOrder
         * @summary Get a specific order by its ID, for a specific account
         * @request GET:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        getOrder: (accountNumber, orderId, params = {}) => this.request({
            path: `/accounts/${accountNumber}/orders/${orderId}`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Cancel a specific order for a specific account<br>
         *
         * @tags Orders
         * @name CancelOrder
         * @summary Cancel an order for a specific account
         * @request DELETE:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        cancelOrder: (accountNumber, orderId, params = {}) => this.request({
            path: `/accounts/${accountNumber}/orders/${orderId}`,
            method: "DELETE",
            secure: true,
            ...params,
        }),
        /**
         * @description Replace an existing order for an account. The existing order will be replaced by the new               order. Once replaced, the old order will be canceled and a new order will be created.
         *
         * @tags Orders
         * @name ReplaceOrder
         * @summary Replace order for a specific account
         * @request PUT:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        replaceOrder: (accountNumber, orderId, data, params = {}) => this.request({
            path: `/accounts/${accountNumber}/orders/${orderId}`,
            method: "PUT",
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        }),
        /**
         * @description Preview an order for a specific account.
         *
         * @tags Orders
         * @name PreviewOrder
         * @summary Preview order for a specific account. **Coming Soon**.
         * @request POST:/accounts/{accountNumber}/previewOrder
         * @secure
         */
        previewOrder: (accountNumber, data, params = {}) => this.request({
            path: `/accounts/${accountNumber}/previewOrder`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        }),
        /**
         * @description All transactions for a specific account. Maximum number of transactions in response is 3000. Maximum date range is 1 year.
         *
         * @tags Transactions
         * @name GetTransactionsByPathParam
         * @summary Get all transactions information for a specific account.
         * @request GET:/accounts/{accountNumber}/transactions
         * @secure
         */
        getTransactionsByPathParam: (accountNumber, query, params = {}) => this.request({
            path: `/accounts/${accountNumber}/transactions`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
        /**
         * @description Get specific transaction information for a specific account
         *
         * @tags Transactions
         * @name GetTransactionsById
         * @summary Get specific transaction information for a specific account
         * @request GET:/accounts/{accountNumber}/transactions/{transactionId}
         * @secure
         */
        getTransactionsById: (accountNumber, transactionId, params = {}) => this.request({
            path: `/accounts/${accountNumber}/transactions/${transactionId}`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        }),
    };
    orders = {
        /**
         * @description Get all orders for all accounts<br>
         *
         * @tags Orders
         * @name GetOrdersByQueryParam
         * @summary Get all orders for all accounts
         * @request GET:/orders
         * @secure
         */
        getOrdersByQueryParam: (query, params = {}) => this.request({
            path: `/orders`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        }),
    };
    userPreference = {
        /**
         * @description Get user preference information for the logged in user.
         *
         * @tags UserPreference
         * @name GetUserPreference
         * @summary Get user preference information for the logged in user.
         * @request GET:/userPreference
         * @secure
         */
        getUserPreference: (params = {}) => this.request({
            path: `/userPreference`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        }),
    };
}
//# sourceMappingURL=retail-trader.js.map
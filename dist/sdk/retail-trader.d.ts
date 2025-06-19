export declare enum TransactionType {
    TRADE = "TRADE",
    RECEIVE_AND_DELIVER = "RECEIVE_AND_DELIVER",
    DIVIDEND_OR_INTEREST = "DIVIDEND_OR_INTEREST",
    ACH_RECEIPT = "ACH_RECEIPT",
    ACH_DISBURSEMENT = "ACH_DISBURSEMENT",
    CASH_RECEIPT = "CASH_RECEIPT",
    CASH_DISBURSEMENT = "CASH_DISBURSEMENT",
    ELECTRONIC_FUND = "ELECTRONIC_FUND",
    WIRE_OUT = "WIRE_OUT",
    WIRE_IN = "WIRE_IN",
    JOURNAL = "JOURNAL",
    MEMORANDUM = "MEMORANDUM",
    MARGIN_CALL = "MARGIN_CALL",
    MONEY_MARKET = "MONEY_MARKET",
    SMA_ADJUSTMENT = "SMA_ADJUSTMENT"
}
export declare enum ApiOrderStatus {
    AWAITING_PARENT_ORDER = "AWAITING_PARENT_ORDER",
    AWAITING_CONDITION = "AWAITING_CONDITION",
    AWAITING_STOP_CONDITION = "AWAITING_STOP_CONDITION",
    AWAITING_MANUAL_REVIEW = "AWAITING_MANUAL_REVIEW",
    ACCEPTED = "ACCEPTED",
    AWAITING_UR_OUT = "AWAITING_UR_OUT",
    PENDING_ACTIVATION = "PENDING_ACTIVATION",
    QUEUED = "QUEUED",
    WORKING = "WORKING",
    REJECTED = "REJECTED",
    PENDING_CANCEL = "PENDING_CANCEL",
    CANCELED = "CANCELED",
    PENDING_REPLACE = "PENDING_REPLACE",
    REPLACED = "REPLACED",
    FILLED = "FILLED",
    EXPIRED = "EXPIRED",
    NEW = "NEW",
    AWAITING_RELEASE_TIME = "AWAITING_RELEASE_TIME",
    PENDING_ACKNOWLEDGEMENT = "PENDING_ACKNOWLEDGEMENT",
    PENDING_RECALL = "PENDING_RECALL",
    UNKNOWN = "UNKNOWN"
}
export declare enum AssetType {
    EQUITY = "EQUITY",
    MUTUAL_FUND = "MUTUAL_FUND",
    OPTION = "OPTION",
    FUTURE = "FUTURE",
    FOREX = "FOREX",
    INDEX = "INDEX",
    CASH_EQUIVALENT = "CASH_EQUIVALENT",
    FIXED_INCOME = "FIXED_INCOME",
    PRODUCT = "PRODUCT",
    CURRENCY = "CURRENCY",
    COLLECTIVE_INVESTMENT = "COLLECTIVE_INVESTMENT"
}
export declare enum Instruction {
    BUY = "BUY",
    SELL = "SELL",
    BUY_TO_COVER = "BUY_TO_COVER",
    SELL_SHORT = "SELL_SHORT",
    BUY_TO_OPEN = "BUY_TO_OPEN",
    BUY_TO_CLOSE = "BUY_TO_CLOSE",
    SELL_TO_OPEN = "SELL_TO_OPEN",
    SELL_TO_CLOSE = "SELL_TO_CLOSE",
    EXCHANGE = "EXCHANGE",
    SELL_SHORT_EXEMPT = "SELL_SHORT_EXEMPT"
}
export declare enum FeeType {
    COMMISSION = "COMMISSION",
    SEC_FEE = "SEC_FEE",
    STR_FEE = "STR_FEE",
    R_FEE = "R_FEE",
    CDSC_FEE = "CDSC_FEE",
    OPT_REG_FEE = "OPT_REG_FEE",
    ADDITIONAL_FEE = "ADDITIONAL_FEE",
    MISCELLANEOUS_FEE = "MISCELLANEOUS_FEE",
    FTT = "FTT",
    FUTURES_CLEARING_FEE = "FUTURES_CLEARING_FEE",
    FUTURES_DESK_OFFICE_FEE = "FUTURES_DESK_OFFICE_FEE",
    FUTURES_EXCHANGE_FEE = "FUTURES_EXCHANGE_FEE",
    FUTURES_GLOBEX_FEE = "FUTURES_GLOBEX_FEE",
    FUTURES_NFA_FEE = "FUTURES_NFA_FEE",
    FUTURES_PIT_BROKERAGE_FEE = "FUTURES_PIT_BROKERAGE_FEE",
    FUTURES_TRANSACTION_FEE = "FUTURES_TRANSACTION_FEE",
    LOW_PROCEEDS_COMMISSION = "LOW_PROCEEDS_COMMISSION",
    BASE_CHARGE = "BASE_CHARGE",
    GENERAL_CHARGE = "GENERAL_CHARGE",
    GST_FEE = "GST_FEE",
    TAF_FEE = "TAF_FEE",
    INDEX_OPTION_FEE = "INDEX_OPTION_FEE",
    TEFRA_TAX = "TEFRA_TAX",
    STATE_TAX = "STATE_TAX",
    UNKNOWN = "UNKNOWN"
}
export declare enum APIRuleAction {
    ACCEPT = "ACCEPT",
    ALERT = "ALERT",
    REJECT = "REJECT",
    REVIEW = "REVIEW",
    UNKNOWN = "UNKNOWN"
}
export declare enum SettlementInstruction {
    REGULAR = "REGULAR",
    CASH = "CASH",
    NEXT_DAY = "NEXT_DAY",
    UNKNOWN = "UNKNOWN"
}
export declare enum AmountIndicator {
    DOLLARS = "DOLLARS",
    SHARES = "SHARES",
    ALL_SHARES = "ALL_SHARES",
    PERCENTAGE = "PERCENTAGE",
    UNKNOWN = "UNKNOWN"
}
export declare enum Status {
    AWAITING_PARENT_ORDER = "AWAITING_PARENT_ORDER",
    AWAITING_CONDITION = "AWAITING_CONDITION",
    AWAITING_STOP_CONDITION = "AWAITING_STOP_CONDITION",
    AWAITING_MANUAL_REVIEW = "AWAITING_MANUAL_REVIEW",
    ACCEPTED = "ACCEPTED",
    AWAITING_UR_OUT = "AWAITING_UR_OUT",
    PENDING_ACTIVATION = "PENDING_ACTIVATION",
    QUEUED = "QUEUED",
    WORKING = "WORKING",
    REJECTED = "REJECTED",
    PENDING_CANCEL = "PENDING_CANCEL",
    CANCELED = "CANCELED",
    PENDING_REPLACE = "PENDING_REPLACE",
    REPLACED = "REPLACED",
    FILLED = "FILLED",
    EXPIRED = "EXPIRED",
    NEW = "NEW",
    AWAITING_RELEASE_TIME = "AWAITING_RELEASE_TIME",
    PENDING_ACKNOWLEDGEMENT = "PENDING_ACKNOWLEDGEMENT",
    PENDING_RECALL = "PENDING_RECALL",
    UNKNOWN = "UNKNOWN"
}
export declare enum OrderStrategyType {
    SINGLE = "SINGLE",
    CANCEL = "CANCEL",
    RECALL = "RECALL",
    PAIR = "PAIR",
    FLATTEN = "FLATTEN",
    TWO_DAY_SWAP = "TWO_DAY_SWAP",
    BLAST_ALL = "BLAST_ALL",
    OCO = "OCO",
    TRIGGER = "TRIGGER"
}
export declare enum SpecialInstruction {
    ALL_OR_NONE = "ALL_OR_NONE",
    DO_NOT_REDUCE = "DO_NOT_REDUCE",
    ALL_OR_NONE_DO_NOT_REDUCE = "ALL_OR_NONE_DO_NOT_REDUCE"
}
export declare enum TaxLotMethod {
    FIFO = "FIFO",
    LIFO = "LIFO",
    HIGH_COST = "HIGH_COST",
    LOW_COST = "LOW_COST",
    AVERAGE_COST = "AVERAGE_COST",
    SPECIFIC_LOT = "SPECIFIC_LOT",
    LOSS_HARVESTER = "LOSS_HARVESTER"
}
export declare enum PriceLinkType {
    VALUE = "VALUE",
    PERCENT = "PERCENT",
    TICK = "TICK"
}
export declare enum PriceLinkBasis {
    MANUAL = "MANUAL",
    BASE = "BASE",
    TRIGGER = "TRIGGER",
    LAST = "LAST",
    BID = "BID",
    ASK = "ASK",
    ASK_BID = "ASK_BID",
    MARK = "MARK",
    AVERAGE = "AVERAGE"
}
export declare enum StopType {
    STANDARD = "STANDARD",
    BID = "BID",
    ASK = "ASK",
    LAST = "LAST",
    MARK = "MARK"
}
export declare enum StopPriceLinkType {
    VALUE = "VALUE",
    PERCENT = "PERCENT",
    TICK = "TICK"
}
export declare enum StopPriceLinkBasis {
    MANUAL = "MANUAL",
    BASE = "BASE",
    TRIGGER = "TRIGGER",
    LAST = "LAST",
    BID = "BID",
    ASK = "ASK",
    ASK_BID = "ASK_BID",
    MARK = "MARK",
    AVERAGE = "AVERAGE"
}
export declare enum RequestedDestination {
    INET = "INET",
    ECN_ARCA = "ECN_ARCA",
    CBOE = "CBOE",
    AMEX = "AMEX",
    PHLX = "PHLX",
    ISE = "ISE",
    BOX = "BOX",
    NYSE = "NYSE",
    NASDAQ = "NASDAQ",
    BATS = "BATS",
    C2 = "C2",
    AUTO = "AUTO"
}
export declare enum ComplexOrderStrategyType {
    NONE = "NONE",
    COVERED = "COVERED",
    VERTICAL = "VERTICAL",
    BACK_RATIO = "BACK_RATIO",
    CALENDAR = "CALENDAR",
    DIAGONAL = "DIAGONAL",
    STRADDLE = "STRADDLE",
    STRANGLE = "STRANGLE",
    COLLAR_SYNTHETIC = "COLLAR_SYNTHETIC",
    BUTTERFLY = "BUTTERFLY",
    CONDOR = "CONDOR",
    IRON_CONDOR = "IRON_CONDOR",
    VERTICAL_ROLL = "VERTICAL_ROLL",
    COLLAR_WITH_STOCK = "COLLAR_WITH_STOCK",
    DOUBLE_DIAGONAL = "DOUBLE_DIAGONAL",
    UNBALANCED_BUTTERFLY = "UNBALANCED_BUTTERFLY",
    UNBALANCED_CONDOR = "UNBALANCED_CONDOR",
    UNBALANCED_IRON_CONDOR = "UNBALANCED_IRON_CONDOR",
    UNBALANCED_VERTICAL_ROLL = "UNBALANCED_VERTICAL_ROLL",
    MUTUAL_FUND_SWAP = "MUTUAL_FUND_SWAP",
    CUSTOM = "CUSTOM"
}
/** Same as orderType, but does not have UNKNOWN since this type is not allowed as an input */
export declare enum OrderTypeRequest {
    MARKET = "MARKET",
    LIMIT = "LIMIT",
    STOP = "STOP",
    STOP_LIMIT = "STOP_LIMIT",
    TRAILING_STOP = "TRAILING_STOP",
    CABINET = "CABINET",
    NON_MARKETABLE = "NON_MARKETABLE",
    MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
    EXERCISE = "EXERCISE",
    TRAILING_STOP_LIMIT = "TRAILING_STOP_LIMIT",
    NET_DEBIT = "NET_DEBIT",
    NET_CREDIT = "NET_CREDIT",
    NET_ZERO = "NET_ZERO",
    LIMIT_ON_CLOSE = "LIMIT_ON_CLOSE"
}
export declare enum OrderType {
    MARKET = "MARKET",
    LIMIT = "LIMIT",
    STOP = "STOP",
    STOP_LIMIT = "STOP_LIMIT",
    TRAILING_STOP = "TRAILING_STOP",
    CABINET = "CABINET",
    NON_MARKETABLE = "NON_MARKETABLE",
    MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
    EXERCISE = "EXERCISE",
    TRAILING_STOP_LIMIT = "TRAILING_STOP_LIMIT",
    NET_DEBIT = "NET_DEBIT",
    NET_CREDIT = "NET_CREDIT",
    NET_ZERO = "NET_ZERO",
    LIMIT_ON_CLOSE = "LIMIT_ON_CLOSE",
    UNKNOWN = "UNKNOWN"
}
export declare enum Duration {
    DAY = "DAY",
    GOOD_TILL_CANCEL = "GOOD_TILL_CANCEL",
    FILL_OR_KILL = "FILL_OR_KILL",
    IMMEDIATE_OR_CANCEL = "IMMEDIATE_OR_CANCEL",
    END_OF_WEEK = "END_OF_WEEK",
    END_OF_MONTH = "END_OF_MONTH",
    NEXT_END_OF_MONTH = "NEXT_END_OF_MONTH",
    UNKNOWN = "UNKNOWN"
}
export declare enum Session {
    NORMAL = "NORMAL",
    AM = "AM",
    PM = "PM",
    SEAMLESS = "SEAMLESS"
}
export interface AccountNumberHash {
    accountNumber?: string;
    hashValue?: string;
}
/** @format double */
export type StopPriceOffset = number;
export interface OrderStrategy {
    accountNumber?: string;
    advancedOrderType?: "NONE" | "OTO" | "OCO" | "OTOCO" | "OT2OCO" | "OT3OCO" | "BLAST_ALL" | "OTA" | "PAIR";
    /** @format date-time */
    closeTime?: string;
    /** @format date-time */
    enteredTime?: string;
    orderBalance?: OrderBalance;
    orderStrategyType?: OrderStrategyType;
    orderVersion?: number;
    session?: Session;
    status?: ApiOrderStatus;
    allOrNone?: boolean;
    discretionary?: boolean;
    duration?: Duration;
    /** @format double */
    filledQuantity?: number;
    orderType?: OrderType;
    /** @format double */
    orderValue?: number;
    /** @format double */
    price?: number;
    /** @format double */
    quantity?: number;
    /** @format double */
    remainingQuantity?: number;
    sellNonMarginableFirst?: boolean;
    settlementInstruction?: SettlementInstruction;
    strategy?: ComplexOrderStrategyType;
    amountIndicator?: AmountIndicator;
    orderLegs?: OrderLeg[];
}
export interface OrderLeg {
    /** @format double */
    askPrice?: number;
    /** @format double */
    bidPrice?: number;
    /** @format double */
    lastPrice?: number;
    /** @format double */
    markPrice?: number;
    /** @format double */
    projectedCommission?: number;
    /** @format double */
    quantity?: number;
    finalSymbol?: string;
    /** @format long */
    legId?: number;
    assetType?: AssetType;
    instruction?: Instruction;
}
export interface OrderBalance {
    /** @format double */
    orderValue?: number;
    /** @format double */
    projectedAvailableFund?: number;
    /** @format double */
    projectedBuyingPower?: number;
    /** @format double */
    projectedCommission?: number;
}
export interface OrderValidationResult {
    alerts?: OrderValidationDetail[];
    accepts?: OrderValidationDetail[];
    rejects?: OrderValidationDetail[];
    reviews?: OrderValidationDetail[];
    warns?: OrderValidationDetail[];
}
export interface OrderValidationDetail {
    validationRuleName?: string;
    message?: string;
    activityMessage?: string;
    originalSeverity?: APIRuleAction;
    overrideName?: string;
    overrideSeverity?: APIRuleAction;
}
export interface CommissionAndFee {
    commission?: Commission;
    fee?: Fees;
    trueCommission?: Commission;
}
export interface Commission {
    commissionLegs?: CommissionLeg[];
}
export interface CommissionLeg {
    commissionValues?: CommissionValue[];
}
export interface CommissionValue {
    /** @format double */
    value?: number;
    type?: FeeType;
}
export interface Fees {
    feeLegs?: FeeLeg[];
}
export interface FeeLeg {
    feeValues?: FeeValue[];
}
export interface FeeValue {
    /** @format double */
    value?: number;
    type?: FeeType;
}
export interface Account {
    securitiesAccount?: SecuritiesAccount;
}
export interface DateParam {
    /** Valid ISO-8601 format is :<br> <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code> */
    date?: string;
}
export interface Order {
    session?: Session;
    duration?: Duration;
    orderType?: OrderType;
    /** @format date-time */
    cancelTime?: string;
    complexOrderStrategyType?: ComplexOrderStrategyType;
    /** @format double */
    quantity?: number;
    /** @format double */
    filledQuantity?: number;
    /** @format double */
    remainingQuantity?: number;
    requestedDestination?: RequestedDestination;
    destinationLinkName?: string;
    /** @format date-time */
    releaseTime?: string;
    /** @format double */
    stopPrice?: number;
    stopPriceLinkBasis?: StopPriceLinkBasis;
    stopPriceLinkType?: StopPriceLinkType;
    /** @format double */
    stopPriceOffset?: number;
    stopType?: StopType;
    priceLinkBasis?: PriceLinkBasis;
    priceLinkType?: PriceLinkType;
    /** @format double */
    price?: number;
    taxLotMethod?: TaxLotMethod;
    orderLegCollection?: OrderLegCollection[];
    /** @format double */
    activationPrice?: number;
    specialInstruction?: SpecialInstruction;
    orderStrategyType?: OrderStrategyType;
    /** @format int64 */
    orderId?: number;
    /** @default false */
    cancelable?: boolean;
    /** @default false */
    editable?: boolean;
    status?: Status;
    /** @format date-time */
    enteredTime?: string;
    /** @format date-time */
    closeTime?: string;
    tag?: string;
    /** @format int64 */
    accountNumber?: number;
    orderActivityCollection?: OrderActivity[];
    replacingOrderCollection?: Order[];
    childOrderStrategies?: Order[];
    statusDescription?: string;
}
export interface OrderRequest {
    session?: Session;
    duration?: Duration;
    /** Same as orderType, but does not have UNKNOWN since this type is not allowed as an input */
    orderType?: OrderTypeRequest;
    /** @format date-time */
    cancelTime?: string;
    complexOrderStrategyType?: ComplexOrderStrategyType;
    /** @format double */
    quantity?: number;
    /** @format double */
    filledQuantity?: number;
    /** @format double */
    remainingQuantity?: number;
    destinationLinkName?: string;
    /** @format date-time */
    releaseTime?: string;
    /** @format double */
    stopPrice?: number;
    stopPriceLinkBasis?: StopPriceLinkBasis;
    stopPriceLinkType?: StopPriceLinkType;
    /** @format double */
    stopPriceOffset?: number;
    stopType?: StopType;
    priceLinkBasis?: PriceLinkBasis;
    priceLinkType?: PriceLinkType;
    /** @format double */
    price?: number;
    taxLotMethod?: TaxLotMethod;
    orderLegCollection?: OrderLegCollection[];
    /** @format double */
    activationPrice?: number;
    specialInstruction?: SpecialInstruction;
    orderStrategyType?: OrderStrategyType;
    /** @format int64 */
    orderId?: number;
    /** @default false */
    cancelable?: boolean;
    /** @default false */
    editable?: boolean;
    status?: Status;
    /** @format date-time */
    enteredTime?: string;
    /** @format date-time */
    closeTime?: string;
    /** @format int64 */
    accountNumber?: number;
    orderActivityCollection?: OrderActivity[];
    replacingOrderCollection?: OrderRequest[];
    childOrderStrategies?: OrderRequest[];
    statusDescription?: string;
}
export interface PreviewOrder {
    /** @format int64 */
    orderId?: number;
    orderStrategy?: OrderStrategy;
    orderValidationResult?: OrderValidationResult;
    commissionAndFee?: CommissionAndFee;
}
export interface OrderActivity {
    activityType?: "EXECUTION" | "ORDER_ACTION";
    executionType?: "FILL";
    /** @format double */
    quantity?: number;
    /** @format double */
    orderRemainingQuantity?: number;
    executionLegs?: ExecutionLeg[];
}
export interface ExecutionLeg {
    /** @format int64 */
    legId?: number;
    /** @format double */
    price?: number;
    /** @format double */
    quantity?: number;
    /** @format double */
    mismarkedQuantity?: number;
    /** @format int64 */
    instrumentId?: number;
    /** @format date-time */
    time?: string;
}
export interface Position {
    /** @format double */
    shortQuantity?: number;
    /** @format double */
    averagePrice?: number;
    /** @format double */
    currentDayProfitLoss?: number;
    /** @format double */
    currentDayProfitLossPercentage?: number;
    /** @format double */
    longQuantity?: number;
    /** @format double */
    settledLongQuantity?: number;
    /** @format double */
    settledShortQuantity?: number;
    /** @format double */
    agedQuantity?: number;
    instrument?: AccountsInstrument;
    /** @format double */
    marketValue?: number;
    /** @format double */
    maintenanceRequirement?: number;
    /** @format double */
    averageLongPrice?: number;
    /** @format double */
    averageShortPrice?: number;
    /** @format double */
    taxLotAverageLongPrice?: number;
    /** @format double */
    taxLotAverageShortPrice?: number;
    /** @format double */
    longOpenProfitLoss?: number;
    /** @format double */
    shortOpenProfitLoss?: number;
    /** @format double */
    previousSessionLongQuantity?: number;
    /** @format double */
    previousSessionShortQuantity?: number;
    /** @format double */
    currentDayCost?: number;
}
export interface ServiceError {
    message?: string;
    errors?: string[];
}
export interface OrderLegCollection {
    orderLegType?: "EQUITY" | "OPTION" | "INDEX" | "MUTUAL_FUND" | "CASH_EQUIVALENT" | "FIXED_INCOME" | "CURRENCY" | "COLLECTIVE_INVESTMENT";
    /** @format int64 */
    legId?: number;
    instrument?: AccountsInstrument;
    instruction?: Instruction;
    positionEffect?: "OPENING" | "CLOSING" | "AUTOMATIC";
    /** @format double */
    quantity?: number;
    quantityType?: "ALL_SHARES" | "DOLLARS" | "SHARES";
    divCapGains?: "REINVEST" | "PAYOUT";
    toSymbol?: string;
}
export type SecuritiesAccount = ({
    type: "MARGIN";
} & MarginAccount) | ({
    type: "CASH";
} & CashAccount);
export interface SecuritiesAccountBase {
    type?: "CASH" | "MARGIN";
    accountNumber?: string;
    /** @format int32 */
    roundTrips?: number;
    /** @default false */
    isDayTrader?: boolean;
    /** @default false */
    isClosingOnlyRestricted?: boolean;
    /** @default false */
    pfcbFlag?: boolean;
    positions?: Position[];
}
export type MarginAccount = SecuritiesAccountBase & {
    initialBalances?: MarginInitialBalance;
    currentBalances?: MarginBalance;
    projectedBalances?: MarginBalance;
};
export interface MarginInitialBalance {
    /** @format double */
    accruedInterest?: number;
    /** @format double */
    availableFundsNonMarginableTrade?: number;
    /** @format double */
    bondValue?: number;
    /** @format double */
    buyingPower?: number;
    /** @format double */
    cashBalance?: number;
    /** @format double */
    cashAvailableForTrading?: number;
    /** @format double */
    cashReceipts?: number;
    /** @format double */
    dayTradingBuyingPower?: number;
    /** @format double */
    dayTradingBuyingPowerCall?: number;
    /** @format double */
    dayTradingEquityCall?: number;
    /** @format double */
    equity?: number;
    /** @format double */
    equityPercentage?: number;
    /** @format double */
    liquidationValue?: number;
    /** @format double */
    longMarginValue?: number;
    /** @format double */
    longOptionMarketValue?: number;
    /** @format double */
    longStockValue?: number;
    /** @format double */
    maintenanceCall?: number;
    /** @format double */
    maintenanceRequirement?: number;
    /** @format double */
    margin?: number;
    /** @format double */
    marginEquity?: number;
    /** @format double */
    moneyMarketFund?: number;
    /** @format double */
    mutualFundValue?: number;
    /** @format double */
    regTCall?: number;
    /** @format double */
    shortMarginValue?: number;
    /** @format double */
    shortOptionMarketValue?: number;
    /** @format double */
    shortStockValue?: number;
    /** @format double */
    totalCash?: number;
    /** @format double */
    isInCall?: number;
    /** @format double */
    unsettledCash?: number;
    /** @format double */
    pendingDeposits?: number;
    /** @format double */
    marginBalance?: number;
    /** @format double */
    shortBalance?: number;
    /** @format double */
    accountValue?: number;
}
export interface MarginBalance {
    /** @format double */
    availableFunds?: number;
    /** @format double */
    availableFundsNonMarginableTrade?: number;
    /** @format double */
    buyingPower?: number;
    /** @format double */
    buyingPowerNonMarginableTrade?: number;
    /** @format double */
    dayTradingBuyingPower?: number;
    /** @format double */
    dayTradingBuyingPowerCall?: number;
    /** @format double */
    equity?: number;
    /** @format double */
    equityPercentage?: number;
    /** @format double */
    longMarginValue?: number;
    /** @format double */
    maintenanceCall?: number;
    /** @format double */
    maintenanceRequirement?: number;
    /** @format double */
    marginBalance?: number;
    /** @format double */
    regTCall?: number;
    /** @format double */
    shortBalance?: number;
    /** @format double */
    shortMarginValue?: number;
    /** @format double */
    sma?: number;
    /** @format double */
    isInCall?: number;
    /** @format double */
    stockBuyingPower?: number;
    /** @format double */
    optionBuyingPower?: number;
}
export type CashAccount = SecuritiesAccountBase & {
    initialBalances?: CashInitialBalance;
    currentBalances?: CashBalance;
    projectedBalances?: CashBalance;
};
export interface CashInitialBalance {
    /** @format double */
    accruedInterest?: number;
    /** @format double */
    cashAvailableForTrading?: number;
    /** @format double */
    cashAvailableForWithdrawal?: number;
    /** @format double */
    cashBalance?: number;
    /** @format double */
    bondValue?: number;
    /** @format double */
    cashReceipts?: number;
    /** @format double */
    liquidationValue?: number;
    /** @format double */
    longOptionMarketValue?: number;
    /** @format double */
    longStockValue?: number;
    /** @format double */
    moneyMarketFund?: number;
    /** @format double */
    mutualFundValue?: number;
    /** @format double */
    shortOptionMarketValue?: number;
    /** @format double */
    shortStockValue?: number;
    /** @format double */
    isInCall?: number;
    /** @format double */
    unsettledCash?: number;
    /** @format double */
    cashDebitCallValue?: number;
    /** @format double */
    pendingDeposits?: number;
    /** @format double */
    accountValue?: number;
}
export interface CashBalance {
    /** @format double */
    cashAvailableForTrading?: number;
    /** @format double */
    cashAvailableForWithdrawal?: number;
    /** @format double */
    cashCall?: number;
    /** @format double */
    longNonMarginableMarketValue?: number;
    /** @format double */
    totalCash?: number;
    /** @format double */
    cashDebitCallValue?: number;
    /** @format double */
    unsettledCash?: number;
}
export interface TransactionBaseInstrument {
    assetType: "EQUITY" | "OPTION" | "INDEX" | "MUTUAL_FUND" | "CASH_EQUIVALENT" | "FIXED_INCOME" | "CURRENCY" | "COLLECTIVE_INVESTMENT";
    cusip?: string;
    symbol?: string;
    description?: string;
    /** @format int64 */
    instrumentId?: number;
    /** @format double */
    netChange?: number;
}
export interface AccountsBaseInstrument {
    assetType: "EQUITY" | "OPTION" | "INDEX" | "MUTUAL_FUND" | "CASH_EQUIVALENT" | "FIXED_INCOME" | "CURRENCY" | "COLLECTIVE_INVESTMENT";
    cusip?: string;
    symbol?: string;
    description?: string;
    /** @format int64 */
    instrumentId?: number;
    /** @format double */
    netChange?: number;
}
export type AccountsInstrument = ({
    assetType: "CASH_EQUIVALENT";
} & AccountCashEquivalent) | ({
    assetType: "EQUITY";
} & AccountEquity) | ({
    assetType: "FIXED_INCOME";
} & AccountFixedIncome) | ({
    assetType: "MUTUAL_FUND";
} & AccountMutualFund) | ({
    assetType: "OPTION";
} & AccountOption);
export type TransactionInstrument = ({
    assetType: "CASH_EQUIVALENT";
} & TransactionCashEquivalent) | ({
    assetType: "COLLECTIVE_INVESTMENT";
} & CollectiveInvestment) | ({
    assetType: "CURRENCY";
} & Currency) | ({
    assetType: "EQUITY";
} & TransactionEquity) | ({
    assetType: "FIXED_INCOME";
} & TransactionFixedIncome) | ({
    assetType: "FOREX";
} & Forex) | ({
    assetType: "FUTURE";
} & Future) | ({
    assetType: "INDEX";
} & Index) | ({
    assetType: "MUTUAL_FUND";
} & TransactionMutualFund) | ({
    assetType: "OPTION";
} & TransactionOption) | ({
    assetType: "PRODUCT";
} & Product);
export type TransactionCashEquivalent = TransactionBaseInstrument & {
    type?: "SWEEP_VEHICLE" | "SAVINGS" | "MONEY_MARKET_FUND" | "UNKNOWN";
};
export type CollectiveInvestment = TransactionBaseInstrument & {
    type?: "UNIT_INVESTMENT_TRUST" | "EXCHANGE_TRADED_FUND" | "CLOSED_END_FUND" | "INDEX" | "UNITS";
};
export type Currency = TransactionBaseInstrument;
export type TransactionEquity = TransactionBaseInstrument & {
    type?: "COMMON_STOCK" | "PREFERRED_STOCK" | "DEPOSITORY_RECEIPT" | "PREFERRED_DEPOSITORY_RECEIPT" | "RESTRICTED_STOCK" | "COMPONENT_UNIT" | "RIGHT" | "WARRANT" | "CONVERTIBLE_PREFERRED_STOCK" | "CONVERTIBLE_STOCK" | "LIMITED_PARTNERSHIP" | "WHEN_ISSUED" | "UNKNOWN";
};
export type TransactionFixedIncome = TransactionBaseInstrument & {
    type?: "BOND_UNIT" | "CERTIFICATE_OF_DEPOSIT" | "CONVERTIBLE_BOND" | "COLLATERALIZED_MORTGAGE_OBLIGATION" | "CORPORATE_BOND" | "GOVERNMENT_MORTGAGE" | "GNMA_BONDS" | "MUNICIPAL_ASSESSMENT_DISTRICT" | "MUNICIPAL_BOND" | "OTHER_GOVERNMENT" | "SHORT_TERM_PAPER" | "US_TREASURY_BOND" | "US_TREASURY_BILL" | "US_TREASURY_NOTE" | "US_TREASURY_ZERO_COUPON" | "AGENCY_BOND" | "WHEN_AS_AND_IF_ISSUED_BOND" | "ASSET_BACKED_SECURITY" | "UNKNOWN";
    /** @format date-time */
    maturityDate?: string;
    /** @format double */
    factor?: number;
    /** @format double */
    multiplier?: number;
    /** @format double */
    variableRate?: number;
};
export type Forex = TransactionBaseInstrument & {
    type?: "STANDARD" | "NBBO" | "UNKNOWN";
    baseCurrency?: Currency;
    counterCurrency?: Currency;
};
export type Future = TransactionInstrument & {
    /** @default false */
    activeContract?: boolean;
    type?: "STANDARD" | "UNKNOWN";
    /** @format date-time */
    expirationDate?: string;
    /** @format date-time */
    lastTradingDate?: string;
    /** @format date-time */
    firstNoticeDate?: string;
    /** @format double */
    multiplier?: number;
};
export type Index = TransactionInstrument & {
    /** @default false */
    activeContract?: boolean;
    type?: "BROAD_BASED" | "NARROW_BASED" | "UNKNOWN";
};
export type TransactionMutualFund = TransactionBaseInstrument & {
    fundFamilyName?: string;
    fundFamilySymbol?: string;
    fundGroup?: string;
    type?: "NOT_APPLICABLE" | "OPEN_END_NON_TAXABLE" | "OPEN_END_TAXABLE" | "NO_LOAD_NON_TAXABLE" | "NO_LOAD_TAXABLE" | "UNKNOWN";
    /** @format date-time */
    exchangeCutoffTime?: string;
    /** @format date-time */
    purchaseCutoffTime?: string;
    /** @format date-time */
    redemptionCutoffTime?: string;
};
export type TransactionOption = TransactionBaseInstrument & {
    /** @format date-time */
    expirationDate?: string;
    optionDeliverables?: TransactionAPIOptionDeliverable[];
    /** @format int64 */
    optionPremiumMultiplier?: number;
    putCall?: "PUT" | "CALL" | "UNKNOWN";
    /** @format double */
    strikePrice?: number;
    type?: "VANILLA" | "BINARY" | "BARRIER" | "UNKNOWN";
    underlyingSymbol?: string;
    underlyingCusip?: string;
    deliverable?: TransactionInstrument;
};
export type Product = TransactionBaseInstrument & {
    type?: "TBD" | "UNKNOWN";
};
export type AccountCashEquivalent = AccountsBaseInstrument & {
    type?: "SWEEP_VEHICLE" | "SAVINGS" | "MONEY_MARKET_FUND" | "UNKNOWN";
};
export type AccountEquity = AccountsBaseInstrument;
export type AccountFixedIncome = AccountsBaseInstrument & {
    /** @format date-time */
    maturityDate?: string;
    /** @format double */
    factor?: number;
    /** @format double */
    variableRate?: number;
};
export type AccountMutualFund = AccountsBaseInstrument;
export type AccountOption = AccountsBaseInstrument & {
    optionDeliverables?: AccountAPIOptionDeliverable[];
    putCall?: "PUT" | "CALL" | "UNKNOWN";
    /** @format int32 */
    optionMultiplier?: number;
    type?: "VANILLA" | "BINARY" | "BARRIER" | "UNKNOWN";
    underlyingSymbol?: string;
};
export interface AccountAPIOptionDeliverable {
    /** @format int64 */
    symbol?: string;
    /** @format double */
    deliverableUnits?: number;
    apiCurrencyType?: "USD" | "CAD" | "EUR" | "JPY";
    assetType?: AssetType;
}
export interface TransactionAPIOptionDeliverable {
    rootSymbol?: string;
    /** @format int64 */
    strikePercent?: number;
    /** @format int64 */
    deliverableNumber?: number;
    /** @format double */
    deliverableUnits?: number;
    deliverable?: TransactionInstrument;
    assetType?: AssetType;
}
export interface Transaction {
    /** @format int64 */
    activityId?: number;
    /** @format date-time */
    time?: string;
    user?: UserDetails;
    description?: string;
    accountNumber?: string;
    type?: TransactionType;
    status?: "VALID" | "INVALID" | "PENDING" | "UNKNOWN";
    subAccount?: "CASH" | "MARGIN" | "SHORT" | "DIV" | "INCOME" | "UNKNOWN";
    /** @format date-time */
    tradeDate?: string;
    /** @format date-time */
    settlementDate?: string;
    /** @format int64 */
    positionId?: number;
    /** @format int64 */
    orderId?: number;
    /** @format double */
    netAmount?: number;
    activityType?: "ACTIVITY_CORRECTION" | "EXECUTION" | "ORDER_ACTION" | "TRANSFER" | "UNKNOWN";
    transferItems?: TransferItem[];
}
export interface UserDetails {
    cdDomainId?: string;
    login?: string;
    type?: "ADVISOR_USER" | "BROKER_USER" | "CLIENT_USER" | "SYSTEM_USER" | "UNKNOWN";
    /** @format int64 */
    userId?: number;
    systemUserName?: string;
    firstName?: string;
    lastName?: string;
    brokerRepCode?: string;
}
export interface TransferItem {
    instrument?: TransactionInstrument;
    /** @format double */
    amount?: number;
    /** @format double */
    cost?: number;
    /** @format double */
    price?: number;
    feeType?: "COMMISSION" | "SEC_FEE" | "STR_FEE" | "R_FEE" | "CDSC_FEE" | "OPT_REG_FEE" | "ADDITIONAL_FEE" | "MISCELLANEOUS_FEE" | "FUTURES_EXCHANGE_FEE" | "LOW_PROCEEDS_COMMISSION" | "BASE_CHARGE" | "GENERAL_CHARGE" | "GST_FEE" | "TAF_FEE" | "INDEX_OPTION_FEE" | "UNKNOWN";
    positionEffect?: "OPENING" | "CLOSING" | "AUTOMATIC" | "UNKNOWN";
}
export interface UserPreference {
    accounts?: UserPreferenceAccount[];
    streamerInfo?: StreamerInfo[];
    offers?: Offer[];
}
export interface UserPreferenceAccount {
    accountNumber?: string;
    /** @default false */
    primaryAccount?: boolean;
    type?: string;
    nickName?: string;
    /** Green | Blue */
    accountColor?: string;
    displayAcctId?: string;
    /** @default false */
    autoPositionEffect?: boolean;
}
export interface StreamerInfo {
    streamerSocketUrl?: string;
    schwabClientCustomerId?: string;
    schwabClientCorrelId?: string;
    schwabClientChannel?: string;
    schwabClientFunctionId?: string;
}
export interface Offer {
    /** @default false */
    level2Permissions?: boolean;
    mktDataPermission?: string;
}
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
    protected stringifyFormItem(formItem: unknown): string;
    protected createFormData(input: Record<string, unknown>): FormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title Trader API - Account Access and User Preferences
 * @version 1.0.0
 * @baseUrl https://api.schwabapi.com/trader/v1
 * @contact Schwab Trader API team <TraderAPI@Schwab.com>
 *
 * Schwab Trader API access to Account, Order entry and User Preferences
 */
export declare class RetailTrader<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    accounts: {
        /**
         * @description Account numbers in plain text cannot be used outside of headers or request/response bodies. As the first step consumers must invoke this service to retrieve the list of plain text/encrypted value pairs, and use encrypted account values for all subsequent calls for any accountNumber request.
         *
         * @tags Accounts
         * @name GetAccountNumbers
         * @summary Get list of account numbers and their encrypted values
         * @request GET:/accounts/accountNumbers
         * @secure
         */
        getAccountNumbers: (params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description All the linked account information for the user logged in. The balances on these accounts are displayed by default however the positions on these accounts will be displayed based on the "positions" flag.
         *
         * @tags Accounts
         * @name GetAccounts
         * @summary Get linked account(s) balances and positions for the logged in user.
         * @request GET:/accounts
         * @secure
         */
        getAccounts: (query?: {
            /**
             * This allows one to determine which fields they want returned. Possible value in this String can be:
             * <br><code>positions</code><br> Example:<br><code>fields=positions</code>
             */
            fields?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Specific account information with balances and positions. The balance information on these accounts is displayed by default but Positions will be returned based on the "positions" flag.
         *
         * @tags Accounts
         * @name GetAccount
         * @summary Get a specific account balance and positions for the logged in user.
         * @request GET:/accounts/{accountNumber}
         * @secure
         */
        getAccount: (accountNumber: string, query?: {
            /**
             * This allows one to determine
             * which fields they want returned. Possible values in this String can be:
             * <br><code>positions</code><br> Example:<br><code>fields=positions</code>
             */
            fields?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description All orders for a specific account. Orders retrieved can be filtered based on input parameters below. Maximum date range is 1 year.
         *
         * @tags Orders
         * @name GetOrdersByPathParam
         * @summary Get all orders for a specific account.
         * @request GET:/accounts/{accountNumber}/orders
         * @secure
         */
        getOrdersByPathParam: (accountNumber: string, query: {
            /**
             * The max number of orders to retrieve. Default is 3000.
             * @format int64
             */
            maxResults?: number;
            /**
             * Specifies that no orders entered before this time should be returned.
             * Valid ISO-8601 formats are :<br> <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>  Example fromEnteredTime is '2024-03-29T00:00:00.000Z'.
             * 'toEnteredTime' must also be set.
             */
            fromEnteredTime: string;
            /**
             * Specifies that no orders entered after this time should be returned.Valid
             * ISO-8601 formats are :<br> <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.  Example toEnteredTime is '2024-04-28T23:59:59.000Z'.
             * 'fromEnteredTime' must also be set.
             */
            toEnteredTime: string;
            /** Specifies that only orders of this status should be returned. */
            status?: ApiOrderStatus;
        }, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Place an order for a specific account.
         *
         * @tags Orders
         * @name PlaceOrder
         * @summary Place order for a specific account.
         * @request POST:/accounts/{accountNumber}/orders
         * @secure
         */
        placeOrder: (accountNumber: string, data: OrderRequest, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Get a specific order by its ID, for a specific account
         *
         * @tags Orders
         * @name GetOrder
         * @summary Get a specific order by its ID, for a specific account
         * @request GET:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        getOrder: (accountNumber: string, orderId: number, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Cancel a specific order for a specific account<br>
         *
         * @tags Orders
         * @name CancelOrder
         * @summary Cancel an order for a specific account
         * @request DELETE:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        cancelOrder: (accountNumber: string, orderId: number, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Replace an existing order for an account. The existing order will be replaced by the new               order. Once replaced, the old order will be canceled and a new order will be created.
         *
         * @tags Orders
         * @name ReplaceOrder
         * @summary Replace order for a specific account
         * @request PUT:/accounts/{accountNumber}/orders/{orderId}
         * @secure
         */
        replaceOrder: (accountNumber: string, orderId: number, data: OrderRequest, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Preview an order for a specific account.
         *
         * @tags Orders
         * @name PreviewOrder
         * @summary Preview order for a specific account. **Coming Soon**.
         * @request POST:/accounts/{accountNumber}/previewOrder
         * @secure
         */
        previewOrder: (accountNumber: string, data: PreviewOrder, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description All transactions for a specific account. Maximum number of transactions in response is 3000. Maximum date range is 1 year.
         *
         * @tags Transactions
         * @name GetTransactionsByPathParam
         * @summary Get all transactions information for a specific account.
         * @request GET:/accounts/{accountNumber}/transactions
         * @secure
         */
        getTransactionsByPathParam: (accountNumber: string, query: {
            /**
             * Specifies that no transactions entered before this time should be returned.
             * Valid ISO-8601 formats are :<br> <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code> .  Example start date is '2024-03-28T21:10:42.000Z'. The 'endDate' must also be set.
             */
            startDate: string;
            /**
             * Specifies that no transactions entered after this time should be returned.Valid
             * ISO-8601 formats are :<br> <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>. Example start date is '2024-05-10T21:10:42.000Z'.
             * The 'startDate' must also be set.
             */
            endDate: string;
            /** It filters all the transaction activities based on the symbol specified. <u>NOTE:</u> If there is any special character in the symbol, please send th encoded value. */
            symbol?: string;
            /** Specifies that only transactions of this status should be returned. */
            types: TransactionType;
        }, params?: RequestParams) => Promise<AxiosResponse<T>>;
        /**
         * @description Get specific transaction information for a specific account
         *
         * @tags Transactions
         * @name GetTransactionsById
         * @summary Get specific transaction information for a specific account
         * @request GET:/accounts/{accountNumber}/transactions/{transactionId}
         * @secure
         */
        getTransactionsById: (accountNumber: string, transactionId: number, params?: RequestParams) => Promise<AxiosResponse<T>>;
    };
    orders: {
        /**
         * @description Get all orders for all accounts<br>
         *
         * @tags Orders
         * @name GetOrdersByQueryParam
         * @summary Get all orders for all accounts
         * @request GET:/orders
         * @secure
         */
        getOrdersByQueryParam: (query: {
            /**
             * The max number of orders to retrieve. Default is 3000.
             * @format int64
             */
            maxResults?: number;
            /**
             * Specifies that no orders entered before this time should be returned. Valid ISO-8601 formats are-
             * yyyy-MM-dd'T'HH:mm:ss.SSSZ Date must be within 60 days from today's date.
             * 'toEnteredTime' must also be set.
             */
            fromEnteredTime: string;
            /**
             * Specifies that no orders entered after this time should be returned.Valid ISO-8601 formats are -
             * yyyy-MM-dd'T'HH:mm:ss.SSSZ. 'fromEnteredTime' must also be set.
             */
            toEnteredTime: string;
            /** Specifies that only orders of this status should be returned. */
            status?: ApiOrderStatus;
        }, params?: RequestParams) => Promise<AxiosResponse<T>>;
    };
    userPreference: {
        /**
         * @description Get user preference information for the logged in user.
         *
         * @tags UserPreference
         * @name GetUserPreference
         * @summary Get user preference information for the logged in user.
         * @request GET:/userPreference
         * @secure
         */
        getUserPreference: (params?: RequestParams) => Promise<AxiosResponse<T>>;
    };
}
//# sourceMappingURL=retail-trader.d.ts.map
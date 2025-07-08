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
export enum QuoteType {
  NBBO = "NBBO",
  NFL = "NFL",
}

/** Dividend frequency 1 – once a year or annually 2 – 2x a year or semi-annualy 3 - 3x a year (ex. ARCO, EBRPF) 4 – 4x a year or quarterly 6 - 6x per yr or every other month 11 – 11x a year (ex. FBND, FCOR) 12 – 12x a year or monthly */
export enum DivFreq {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value6 = 6,
  Value11 = 11,
  Value12 = 12,
}

/** option contract exercise type America or European */
export enum ExerciseType {
  A = "A",
  E = "E",
}

/** FundStrategy "A" - Active "L" - Leveraged "P" - Passive "Q" - Quantitative "S" - Short */
export enum FundStrategy {
  A = "A",
  L = "L",
  P = "P",
  Q = "Q",
  S = "S",
}

/** M for End Of Month Expiration Calendar Cycle. (To match the last business day of the month), Q for Quarterly expirations (last business day of the quarter month MAR/JUN/SEP/DEC), W for Weekly expiration (also called Friday Short Term Expirations) and S for Expires 3rd Friday of the month (also known as regular options). */
export enum ExpirationType {
  M = "M",
  Q = "Q",
  S = "S",
  W = "W",
}

/** option contract settlement type AM or PM */
export enum SettlementType {
  A = "A",
  P = "P",
}

/** Indicates call or put */
export enum ContractType {
  P = "P",
  C = "C",
}

/** Asset Sub Type (only there if applicable) */
export enum MutualFundAssetSubType {
  OEF = "OEF",
  CEF = "CEF",
  MMF = "MMF",
}

/** Asset Sub Type (only there if applicable) */
export enum EquityAssetSubType {
  COE = "COE",
  PRF = "PRF",
  ADR = "ADR",
  GDR = "GDR",
  CEF = "CEF",
  ETF = "ETF",
  ETN = "ETN",
  UIT = "UIT",
  WAR = "WAR",
  RGT = "RGT",
}

/** Instrument's asset type */
export enum AssetMainType {
  BOND = "BOND",
  EQUITY = "EQUITY",
  FOREX = "FOREX",
  FUTURE = "FUTURE",
  FUTURE_OPTION = "FUTURE_OPTION",
  INDEX = "INDEX",
  MUTUAL_FUND = "MUTUAL_FUND",
  OPTION = "OPTION",
}

export interface Bond {
  cusip?: string;
  symbol?: string;
  description?: string;
  exchange?: string;
  assetType?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
  bondFactor?: string;
  bondMultiplier?: string;
  bondPrice?: number;
  type?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
}

export interface FundamentalInst {
  symbol?: string;
  /** @format double */
  high52?: number;
  /** @format double */
  low52?: number;
  /** @format double */
  dividendAmount?: number;
  /** @format double */
  dividendYield?: number;
  dividendDate?: string;
  /** @format double */
  peRatio?: number;
  /** @format double */
  pegRatio?: number;
  /** @format double */
  pbRatio?: number;
  /** @format double */
  prRatio?: number;
  /** @format double */
  pcfRatio?: number;
  /** @format double */
  grossMarginTTM?: number;
  /** @format double */
  grossMarginMRQ?: number;
  /** @format double */
  netProfitMarginTTM?: number;
  /** @format double */
  netProfitMarginMRQ?: number;
  /** @format double */
  operatingMarginTTM?: number;
  /** @format double */
  operatingMarginMRQ?: number;
  /** @format double */
  returnOnEquity?: number;
  /** @format double */
  returnOnAssets?: number;
  /** @format double */
  returnOnInvestment?: number;
  /** @format double */
  quickRatio?: number;
  /** @format double */
  currentRatio?: number;
  /** @format double */
  interestCoverage?: number;
  /** @format double */
  totalDebtToCapital?: number;
  /** @format double */
  ltDebtToEquity?: number;
  /** @format double */
  totalDebtToEquity?: number;
  /** @format double */
  epsTTM?: number;
  /** @format double */
  epsChangePercentTTM?: number;
  /** @format double */
  epsChangeYear?: number;
  /** @format double */
  epsChange?: number;
  /** @format double */
  revChangeYear?: number;
  /** @format double */
  revChangeTTM?: number;
  /** @format double */
  revChangeIn?: number;
  /** @format double */
  sharesOutstanding?: number;
  /** @format double */
  marketCapFloat?: number;
  /** @format double */
  marketCap?: number;
  /** @format double */
  bookValuePerShare?: number;
  /** @format double */
  shortIntToFloat?: number;
  /** @format double */
  shortIntDayToCover?: number;
  /** @format double */
  divGrowthRate3Year?: number;
  /** @format double */
  dividendPayAmount?: number;
  dividendPayDate?: string;
  /** @format double */
  beta?: number;
  /** @format double */
  vol1DayAvg?: number;
  /** @format double */
  vol10DayAvg?: number;
  /** @format double */
  vol3MonthAvg?: number;
  /** @format int64 */
  avg10DaysVolume?: number;
  /** @format int64 */
  avg1DayVolume?: number;
  /** @format int64 */
  avg3MonthVolume?: number;
  declarationDate?: string;
  /** @format int32 */
  dividendFreq?: number;
  /** @format double */
  eps?: number;
  corpactionDate?: string;
  /** @format int64 */
  dtnVolume?: number;
  nextDividendPayDate?: string;
  nextDividendDate?: string;
  /** @format double */
  fundLeverageFactor?: number;
  fundStrategy?: string;
}

export interface Instrument {
  cusip?: string;
  symbol?: string;
  description?: string;
  exchange?: string;
  assetType?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
  type?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
}

export interface InstrumentResponse {
  cusip?: string;
  symbol?: string;
  description?: string;
  exchange?: string;
  assetType?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
  bondFactor?: string;
  bondMultiplier?: string;
  bondPrice?: number;
  fundamental?: FundamentalInst;
  instrumentInfo?: Instrument;
  bondInstrumentInfo?: Bond;
  type?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
}

export interface Hours {
  date?: string;
  marketType?:
    | "BOND"
    | "EQUITY"
    | "ETF"
    | "EXTENDED"
    | "FOREX"
    | "FUTURE"
    | "FUTURE_OPTION"
    | "FUNDAMENTAL"
    | "INDEX"
    | "INDICATOR"
    | "MUTUAL_FUND"
    | "OPTION"
    | "UNKNOWN";
  exchange?: string;
  category?: string;
  product?: string;
  productName?: string;
  isOpen?: boolean;
  sessionHours?: Record<string, Interval[]>;
}

export interface Interval {
  start?: string;
  end?: string;
}

/** Security info of most moved with in an index */
export interface Screener {
  /**
   * percent or value changed, by default its percent changed
   * @format double
   */
  change?: number;
  /** Name of security */
  description?: string;
  direction?: "up" | "down";
  /**
   * what was last quoted price
   * @format double
   */
  last?: number;
  /** schwab security symbol */
  symbol?: string;
  /** @format int64 */
  totalVolume?: number;
}

export interface Candle {
  /** @format double */
  close?: number;
  /** @format int64 */
  datetime?: number;
  /** @format yyyy-MM-dd */
  datetimeISO8601?: string;
  /** @format double */
  high?: number;
  /** @format double */
  low?: number;
  /** @format double */
  open?: number;
  /** @format int64 */
  volume?: number;
}

export interface CandleList {
  candles?: Candle[];
  empty?: boolean;
  /** @format double */
  previousClose?: number;
  /** @format int64 */
  previousCloseDate?: number;
  /** @format yyyy-MM-dd */
  previousCloseDateISO8601?: string;
  symbol?: string;
}

/** Quote info of Equity security */
export interface EquityResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /** Asset Sub Type (only there if applicable) */
  assetSubType?: EquityAssetSubType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** NBBO - realtime, NFL - Non-fee liable quote. */
  quoteType?: QuoteType;
  /** Quote data for extended hours */
  extended?: ExtendedMarket;
  /** Fundamentals of a security */
  fundamental?: Fundamental;
  /** Quote data of Equity security */
  quote?: QuoteEquity;
  /** Reference data of Equity security */
  reference?: ReferenceEquity;
  /** Market info of security */
  regular?: RegularMarket;
}

/** Partial or Custom errors per request */
export interface QuoteError {
  /** list of invalid cusips from request */
  invalidCusips?: string[];
  /** list of invalid SSIDs from request */
  invalidSSIDs?: number[];
  /** list of invalid symbols from request */
  invalidSymbols?: string[];
}

/** Quote data for extended hours */
export interface ExtendedMarket {
  /**
   * Extended market ask price
   * @format double
   * @example 124.85
   */
  askPrice?: number;
  /**
   * Extended market ask size
   * @format int32
   * @example 51771
   */
  askSize?: number;
  /**
   * Extended market bid price
   * @format double
   * @example 124.85
   */
  bidPrice?: number;
  /**
   * Extended market bid size
   * @format int32
   * @example 51771
   */
  bidSize?: number;
  /**
   * Extended market last price
   * @format double
   * @example 124.85
   */
  lastPrice?: number;
  /**
   * Regular market last size
   * @format int32
   * @example 51771
   */
  lastSize?: number;
  /**
   * mark price
   * @format double
   * @example 1.1246
   */
  mark?: number;
  /**
   * Extended market quote time in milliseconds since Epoch
   * @format int64
   * @example 1621368000400
   */
  quoteTime?: number;
  /**
   * Total volume
   * @format int64
   * @example 12345
   */
  totalVolume?: number;
  /**
   * Extended market trade time in milliseconds since Epoch
   * @format int64
   * @example 1621368000400
   */
  tradeTime?: number;
}

/** Quote info of Forex security */
export interface ForexResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Quote data of Forex security */
  quote?: QuoteForex;
  /** Reference data of Forex security */
  reference?: ReferenceForex;
}

/** Fundamentals of a security */
export interface Fundamental {
  /**
   * Average 10 day volume
   * @format double
   */
  avg10DaysVolume?: number;
  /**
   * Average 1 day volume
   * @format double
   */
  avg1YearVolume?: number;
  /**
   * Declaration date in yyyy-mm-ddThh:mm:ssZ
   * @format date-time
   * @pattern yyyy-MM-dd'T'HH:mm:ssZ
   * @example "2021-04-28T00:00:00Z"
   */
  declarationDate?: string;
  /**
   * Dividend Amount
   * @format double
   * @example 0.88
   */
  divAmount?: number;
  /**
   * Dividend date in yyyy-mm-ddThh:mm:ssZ
   * @format yyyy-MM-dd'T'HH:mm:ssZ
   * @example "2021-05-07T00:00:00Z"
   */
  divExDate?: string;
  /** Dividend frequency 1 – once a year or annually 2 – 2x a year or semi-annualy 3 - 3x a year (ex. ARCO, EBRPF) 4 – 4x a year or quarterly 6 - 6x per yr or every other month 11 – 11x a year (ex. FBND, FCOR) 12 – 12x a year or monthly */
  divFreq?: DivFreq;
  /**
   * Dividend Pay Amount
   * @format double
   * @example 0.22
   */
  divPayAmount?: number;
  /**
   * Dividend pay date in yyyy-mm-ddThh:mm:ssZ
   * @format date-time
   * @pattern yyyy-MM-dd'T'HH:mm:ssZ
   * @example "2021-05-13T00:00:00Z"
   */
  divPayDate?: string;
  /**
   * Dividend yield
   * @format double
   * @example 0.7
   */
  divYield?: number;
  /**
   * Earnings per Share
   * @format double
   * @example 4.45645
   */
  eps?: number;
  /**
   * Fund Leverage Factor + > 0 <-
   * @format double
   * @example -1
   */
  fundLeverageFactor?: number;
  /** FundStrategy "A" - Active "L" - Leveraged "P" - Passive "Q" - Quantitative "S" - Short */
  fundStrategy?: FundStrategy;
  /**
   * Next Dividend date
   * @format date-time
   * @pattern yyyy-MM-dd'T'HH:mm:ssZ
   * @example "2021-02-12T00:00:00Z"
   */
  nextDivExDate?: string;
  /**
   * Next Dividend pay date
   * @format date-time
   * @pattern yyyy-MM-dd'T'HH:mm:ssZ
   * @example "2021-02-12T00:00:00Z"
   */
  nextDivPayDate?: string;
  /**
   * P/E Ratio
   * @format double
   * @example 28.599
   */
  peRatio?: number;
}

/** Quote info of Future Option security */
export interface FutureOptionResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Quote data of Option security */
  quote?: QuoteFutureOption;
  /** Reference data of Future Option security */
  reference?: ReferenceFutureOption;
}

/** Quote info of Future security */
export interface FutureResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Quote data of Future security */
  quote?: QuoteFuture;
  /** Reference data of Future security */
  reference?: ReferenceFuture;
}

/** Quote info of Index security */
export interface IndexResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Quote data of Index security */
  quote?: QuoteIndex;
  /** Reference data of Index security */
  reference?: ReferenceIndex;
}

/** Quote info of MutualFund security */
export interface MutualFundResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /** Asset Sub Type (only there if applicable) */
  assetSubType?: MutualFundAssetSubType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Fundamentals of a security */
  fundamental?: Fundamental;
  /** Quote data of Mutual Fund security */
  quote?: QuoteMutualFund;
  /** Reference data of MutualFund security */
  reference?: ReferenceMutualFund;
}

/** Quote info of Option security */
export interface OptionResponse {
  /** Instrument's asset type */
  assetMainType?: AssetMainType;
  /**
   * SSID of instrument
   * @format int64
   * @example 1234567890
   */
  ssid?: number;
  /**
   * Symbol of instrument
   * @example "AAPL"
   */
  symbol?: string;
  /**
   * is quote realtime
   * @example true
   */
  realtime?: boolean;
  /** Quote data of Option security */
  quote?: QuoteOption;
  /** Reference data of Option security */
  reference?: ReferenceOption;
}

/** Quote data of Equity security */
export interface QuoteEquity {
  /**
   * Higest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 145.09
   */
  "52WeekHigh"?: number;
  /**
   * Lowest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 77.581
   */
  "52WeekLow"?: number;
  /**
   * ask MIC code
   * @example "XNYS"
   */
  askMICId?: string;
  /**
   * Current Best Ask Price
   * @format double
   * @example 124.63
   */
  askPrice?: number;
  /**
   * Number of shares for ask
   * @format int32
   * @example 700
   */
  askSize?: number;
  /**
   * Last ask time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  askTime?: number;
  /**
   * bid MIC code
   * @example "XNYS"
   */
  bidMICId?: string;
  /**
   * Current Best Bid Price
   * @format double
   * @example 124.6
   */
  bidPrice?: number;
  /**
   * Number of shares for bid
   * @format int32
   * @example 300
   */
  bidSize?: number;
  /**
   * Last bid time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  bidTime?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 126.99
   */
  highPrice?: number;
  /**
   * Last MIC Code
   * @example "XNYS"
   */
  lastMICId?: string;
  /**
   * @format double
   * @example 122.3
   */
  lastPrice?: number;
  /**
   * Number of shares traded with last trade
   * @format int32
   * @example 100
   */
  lastSize?: number;
  /**
   * Day's low trade price
   * @format double
   */
  lowPrice?: number;
  /**
   * Mark price
   * @format double
   * @example 52.93
   */
  mark?: number;
  /**
   * Mark Price change
   * @format double
   * @example -0.01
   */
  markChange?: number;
  /**
   * Mark Price percent change
   * @format double
   * @example -0.0189
   */
  markPercentChange?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  openPrice?: number;
  /**
   * Last quote time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  quoteTime?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
  /**
   * Option Risk/Volatility Measurement
   * @format double
   * @example 0.0094
   */
  volatility?: number;
}

/** Quote data of Forex security */
export interface QuoteForex {
  /**
   * Higest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 145.09
   */
  "52WeekHigh"?: number;
  /**
   * Lowest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 77.581
   */
  "52WeekLow"?: number;
  /**
   * Current Best Ask Price
   * @format double
   * @example 124.63
   */
  askPrice?: number;
  /**
   * Number of shares for ask
   * @format int32
   * @example 700
   */
  askSize?: number;
  /**
   * Current Best Bid Price
   * @format double
   * @example 124.6
   */
  bidPrice?: number;
  /**
   * Number of shares for bid
   * @format int32
   * @example 300
   */
  bidSize?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 126.99
   */
  highPrice?: number;
  /**
   * @format double
   * @example 122.3
   */
  lastPrice?: number;
  /**
   * Number of shares traded with last trade
   * @format int32
   * @example 100
   */
  lastSize?: number;
  /**
   * Day's low trade price
   * @format double
   * @example 52.74
   */
  lowPrice?: number;
  /**
   * Mark price
   * @format double
   * @example 52.93
   */
  mark?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  openPrice?: number;
  /**
   * Last quote time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  quoteTime?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Tick Price
   * @format double
   * @example 0
   */
  tick?: number;
  /**
   * Tick Amount
   * @format double
   * @example 0
   */
  tickAmount?: number;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
}

/** Quote data of Future security */
export interface QuoteFuture {
  /**
   * ask MIC code
   * @example "XNYS"
   */
  askMICId?: string;
  /**
   * Current Best Ask Price
   * @format double
   * @example 4083.25
   */
  askPrice?: number;
  /**
   * Number of shares for ask
   * @format int32
   * @example 36
   */
  askSize?: number;
  /**
   * Last ask time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  askTime?: number;
  /**
   * bid MIC code
   * @example "XNYS"
   */
  bidMICId?: string;
  /**
   * Current Best Bid Price
   * @format double
   * @example 4083
   */
  bidPrice?: number;
  /**
   * Number of shares for bid
   * @format int32
   * @example 18
   */
  bidSize?: number;
  /**
   * Last bid time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  bidTime?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 4123
   */
  closePrice?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  futurePercentChange?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 4123
   */
  highPrice?: number;
  /**
   * Last MIC Code
   * @example "XNYS"
   */
  lastMICId?: string;
  /**
   * @format double
   * @example 4083
   */
  lastPrice?: number;
  /**
   * Number of shares traded with last trade
   * @format int32
   * @example 7
   */
  lastSize?: number;
  /**
   * Day's low trade price
   * @format double
   * @example 4075.5
   */
  lowPrice?: number;
  /**
   * Mark price
   * @format double
   * @example 4083
   */
  mark?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -40
   */
  netChange?: number;
  /**
   * Open interest
   * @format int32
   * @example 2517139
   */
  openInterest?: number;
  /**
   * Price at market open
   * @format double
   * @example 4114
   */
  openPrice?: number;
  /**
   * Last quote time in milliseconds since Epoch
   * @format int64
   * @example 1621427004585
   */
  quoteTime?: number;
  /**
   * quoted during trading session
   * @example false
   */
  quotedInSession?: boolean;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * settlement time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  settleTime?: number;
  /**
   * Tick Price
   * @format double
   * @example 0.25
   */
  tick?: number;
  /**
   * Tick Amount
   * @format double
   * @example 12.5
   */
  tickAmount?: number;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
}

/** Quote data of Option security */
export interface QuoteFutureOption {
  /**
   * ask MIC code
   * @example "XNYS"
   */
  askMICId?: string;
  /**
   * Current Best Ask Price
   * @format double
   * @example 124.63
   */
  askPrice?: number;
  /**
   * Number of shares for ask
   * @format int32
   * @example 700
   */
  askSize?: number;
  /**
   * bid MIC code
   * @example "XNYS"
   */
  bidMICId?: string;
  /**
   * Current Best Bid Price
   * @format double
   * @example 124.6
   */
  bidPrice?: number;
  /**
   * Number of shares for bid
   * @format int32
   * @example 300
   */
  bidSize?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 126.99
   */
  highPrice?: number;
  /**
   * Last MIC Code
   * @example "XNYS"
   */
  lastMICId?: string;
  /**
   * @format double
   * @example 122.3
   */
  lastPrice?: number;
  /**
   * Number of shares traded with last trade
   * @format int32
   * @example 100
   */
  lastSize?: number;
  /**
   * Day's low trade price
   * @format double
   * @example 52.74
   */
  lowPrice?: number;
  /**
   * Mark price
   * @format double
   * @example 52.93
   */
  mark?: number;
  /**
   * Mark Price change
   * @format double
   * @example -0.04
   */
  markChange?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Open Interest
   * @format int32
   * @example 317
   */
  openInterest?: number;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  openPrice?: number;
  /**
   * Last quote time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  quoteTime?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  settlemetPrice?: number;
  /**
   * Tick Price
   * @format double
   * @example 0
   */
  tick?: number;
  /**
   * Tick Amount
   * @format double
   * @example 0
   */
  tickAmount?: number;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
}

/** Quote data of Index security */
export interface QuoteIndex {
  /**
   * Higest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 145.09
   */
  "52WeekHigh"?: number;
  /**
   * Lowest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 77.581
   */
  "52WeekLow"?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 126.99
   */
  highPrice?: number;
  /**
   * @format double
   * @example 122.3
   */
  lastPrice?: number;
  /**
   * Day's low trade price
   * @format double
   * @example 52.74
   */
  lowPrice?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  openPrice?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
}

/** Quote data of Mutual Fund security */
export interface QuoteMutualFund {
  /**
   * Higest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 145.09
   */
  "52WeekHigh"?: number;
  /**
   * Lowest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 77.581
   */
  "52WeekLow"?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Net Asset Value
   * @format double
   * @example 126.99
   */
  nAV?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
}

/** Quote data of Option security */
export interface QuoteOption {
  /**
   * Higest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 145.09
   */
  "52WeekHigh"?: number;
  /**
   * Lowest price traded in the past 12 months, or 52 weeks
   * @format double
   * @example 77.581
   */
  "52WeekLow"?: number;
  /**
   * Current Best Ask Price
   * @format double
   * @example 124.63
   */
  askPrice?: number;
  /**
   * Number of shares for ask
   * @format int32
   * @example 700
   */
  askSize?: number;
  /**
   * Current Best Bid Price
   * @format double
   * @example 124.6
   */
  bidPrice?: number;
  /**
   * Number of shares for bid
   * @format int32
   * @example 300
   */
  bidSize?: number;
  /**
   * Previous day's closing price
   * @format double
   * @example 126.27
   */
  closePrice?: number;
  /**
   * Delta Value
   * @format double
   * @example -0.0407
   */
  delta?: number;
  /**
   * Gamma Value
   * @format double
   * @example 0.0001
   */
  gamma?: number;
  /**
   * Day's high trade price
   * @format double
   * @example 126.99
   */
  highPrice?: number;
  /**
   * Indicative Ask Price applicable only for Indicative Option Symbols
   * @format double
   * @example 126.99
   */
  indAskPrice?: number;
  /**
   * Indicative Bid Price applicable only for Indicative Option Symbols
   * @format double
   * @example 126.99
   */
  indBidPrice?: number;
  /**
   * Indicative Quote Time in milliseconds since Epoch applicable only for Indicative Option Symbols
   * @format int64
   * @example 126.99
   */
  indQuoteTime?: number;
  /**
   * Implied Yield
   * @format double
   * @example -0.0067
   */
  impliedYield?: number;
  /**
   * @format double
   * @example 122.3
   */
  lastPrice?: number;
  /**
   * Number of shares traded with last trade
   * @format int32
   * @example 100
   */
  lastSize?: number;
  /**
   * Day's low trade price
   * @format double
   * @example 52.74
   */
  lowPrice?: number;
  /**
   * Mark price
   * @format double
   * @example 52.93
   */
  mark?: number;
  /**
   * Mark Price change
   * @format double
   * @example -0.01
   */
  markChange?: number;
  /**
   * Mark Price percent change
   * @format double
   * @example -0.0189
   */
  markPercentChange?: number;
  /**
   * Money Intrinsic Value
   * @format double
   * @example -947.96
   */
  moneyIntrinsicValue?: number;
  /**
   * Current Last-Prev Close
   * @format double
   * @example -0.04
   */
  netChange?: number;
  /**
   * Net Percentage Change
   * @format double
   * @example -0.0756
   */
  netPercentChange?: number;
  /**
   * Open Interest
   * @format double
   * @example 317
   */
  openInterest?: number;
  /**
   * Price at market open
   * @format double
   * @example 52.8
   */
  openPrice?: number;
  /**
   * Last quote time in milliseconds since Epoch
   * @format int64
   * @example 1621376892336
   */
  quoteTime?: number;
  /**
   * Rho Value
   * @format double
   * @example -0.3732
   */
  rho?: number;
  /**
   * Status of security
   * @example "Normal"
   */
  securityStatus?: string;
  /**
   * Theoretical option Value
   * @format double
   * @example 12.275
   */
  theoreticalOptionValue?: number;
  /**
   * Theta Value
   * @format double
   * @example -0.315
   */
  theta?: number;
  /**
   * Time Value
   * @format double
   * @example 12.22
   */
  timeValue?: number;
  /**
   * Aggregated shares traded throughout the day, including pre/post market hours.
   * @format int64
   * @example 20171188
   */
  totalVolume?: number;
  /**
   * Last trade time in milliseconds since Epoch
   * @format int64
   * @example 1621376731304
   */
  tradeTime?: number;
  /**
   * Underlying Price
   * @format double
   * @example 3247.96
   */
  underlyingPrice?: number;
  /**
   * Vega Value
   * @format double
   * @example 1.4455
   */
  vega?: number;
  /**
   * Option Risk/Volatility Measurement
   * @format double
   * @example 0.0094
   */
  volatility?: number;
}

/** Request one or more quote data in POST body */
export interface QuoteRequest {
  /**
   * List of cusip, max of 500 of symbols+cusip+ssids
   * @example [808524680,594918104]
   */
  cusips?: string[];
  /**
   * comma separated list of nodes in each quote<br/> possible values are quote,fundamental,reference,extended,regular. Dont send this attribute for full response.
   * @example "quote,reference"
   */
  fields?: string;
  /**
   * List of Schwab securityid[SSID], max of 500 of symbols+cusip+ssids
   * @example [1516105793,34621523]
   */
  ssids?: number[];
  /**
   * List of symbols, max of 500 of symbols+cusip+ssids
   * @example ["MRAD","EATOF","EBIZ","AAPL","BAC","AAAHX","AAAIX","$DJI","$SPX","MVEN","SOBS","TOITF","CNSWF","AMZN  230317C01360000","DJX   231215C00290000","/ESH23","./ADUF23C0.55","AUD/CAD"]
   */
  symbols?: string[];
  /**
   * Get realtime quotes and skip entitlement check
   * @example true
   */
  realtime?: true | false;
  /**
   * Include indicative symbol quotes for all ETF symbols in request. If ETF symbol ABC is in request and indicative=true API will return quotes for ABC and its corresponding indicative quote for $ABC.IV
   * @example true
   */
  indicative?: true | false;
}

/** a (symbol, QuoteResponse) map. `SCHW`is an example key */
export type QuoteResponse = Record<string, QuoteResponseObject>;

export type QuoteResponseObject =
  | EquityResponse
  | OptionResponse
  | ForexResponse
  | FutureResponse
  | FutureOptionResponse
  | IndexResponse
  | MutualFundResponse
  | QuoteError;

/** Reference data of Equity security */
export interface ReferenceEquity {
  /**
   * CUSIP of Instrument
   * @example "A23456789"
   */
  cusip?: string;
  /**
   * Description of Instrument
   * @example "Apple Inc. - Common Stock"
   */
  description?: string;
  /**
   * Exchange Code
   * @example "q"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
  /**
   * FSI Desc
   * @maxLength 50
   */
  fsiDesc?: string;
  /**
   * Hard to borrow quantity.
   * @format int32
   * @example 100
   */
  htbQuantity?: number;
  /**
   * Hard to borrow rate.
   * @format double
   * @example 4.5
   */
  htbRate?: number;
  /**
   * is Hard to borrow security.
   * @example false
   */
  isHardToBorrow?: boolean;
  /**
   * is shortable security.
   * @example false
   */
  isShortable?: boolean;
  /**
   * OTC Market Tier
   * @maxLength 10
   */
  otcMarketTier?: string;
}

/** Reference data of Forex security */
export interface ReferenceForex {
  /**
   * Description of Instrument
   * @example "Euro/USDollar Spot"
   */
  description?: string;
  /**
   * Exchange Code
   * @example "q"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
  /**
   * is FOREX tradable
   * @example true
   */
  isTradable?: boolean;
  /** Market marker */
  marketMaker?: string;
  /**
   * Product name
   * @example null
   */
  product?: string;
  /** Trading hours */
  tradingHours?: string;
}

/** Reference data of Future security */
export interface ReferenceFuture {
  /**
   * Description of Instrument
   * @example "E-mini S&P 500 Index Futures,Jun-2021,ETH"
   */
  description?: string;
  /**
   * Exchange Code
   * @example "q"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
  /**
   * Active symbol
   * @example "/ESM21"
   */
  futureActiveSymbol?: string;
  /**
   * Future expiration date in milliseconds since epoch
   * @format int64
   * @example 1623988800000
   */
  futureExpirationDate?: number;
  /**
   * Future is active
   * @example true
   */
  futureIsActive?: boolean;
  /**
   * Future multiplier
   * @format double
   * @example 50
   */
  futureMultiplier?: number;
  /**
   * Price format
   * @example "D,D"
   */
  futurePriceFormat?: string;
  /**
   * Future Settlement Price
   * @format double
   * @example 4123
   */
  futureSettlementPrice?: number;
  /**
   * Trading Hours
   * @example "GLBX(de=1640;0=-1700151515301600;1=r-17001515r15301600d-15551640;7=d-16401555)"
   */
  futureTradingHours?: string;
  /**
   * Futures product symbol
   * @example "/ES"
   */
  product?: string;
}

/** Reference data of Future Option security */
export interface ReferenceFutureOption {
  /** Indicates call or put */
  contractType?: ContractType;
  /**
   * Description of Instrument
   * @example "AMZN Aug 20 2021 2300 Put"
   */
  description?: string;
  /**
   * Exchange Code
   * @example "q"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
  /**
   * Option multiplier
   * @format double
   * @example 100
   */
  multiplier?: number;
  /**
   * date of expiration in long
   * @format int64
   */
  expirationDate?: number;
  /** Style of expiration */
  expirationStyle?: string;
  /**
   * Strike Price
   * @format double
   * @example 2300
   */
  strikePrice?: number;
  /**
   * A company, index or fund name
   * @example "AMZN Aug 20 2021 2300 Put"
   */
  underlying?: string;
}

/** Reference data of Index security */
export interface ReferenceIndex {
  /**
   * Description of Instrument
   * @example "DOW JONES 30 INDUSTRIALS"
   */
  description?: string;
  /**
   * Exchange Code
   * @example "q"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
}

/** Reference data of MutualFund security */
export interface ReferenceMutualFund {
  /**
   * CUSIP of Instrument
   * @example "A23456789"
   */
  cusip?: string;
  /**
   * Description of Instrument
   * @example "Apple Inc. - Common Stock"
   */
  description?: string;
  /**
   * Exchange Code
   * @default "m"
   */
  exchange?: string;
  /**
   * Exchange Name
   * @default "MUTUAL_FUND"
   */
  exchangeName?: string;
}

/** Reference data of Option security */
export interface ReferenceOption {
  /** Indicates call or put */
  contractType?: ContractType;
  /**
   * CUSIP of Instrument
   * @example "0AMZN.TK12300000"
   */
  cusip?: string;
  /**
   * Days to Expiration
   * @format int32
   * @example 94
   */
  daysToExpiration?: number;
  /**
   * Unit of trade
   * @example "$6024.37 cash in lieu of shares, 212 shares of AZN"
   */
  deliverables?: string;
  /**
   * Description of Instrument
   * @example "AMZN Aug 20 2021 2300 Put"
   */
  description?: string;
  /**
   * Exchange Code
   * @default "o"
   */
  exchange?: string;
  /** Exchange Name */
  exchangeName?: string;
  /** option contract exercise type America or European */
  exerciseType?: ExerciseType;
  /**
   * Expiration Day
   * @format int32
   * @min 1
   * @max 31
   * @example 20
   */
  expirationDay?: number;
  /**
   * Expiration Month
   * @format int32
   * @min 1
   * @max 12
   * @example 8
   */
  expirationMonth?: number;
  /** M for End Of Month Expiration Calendar Cycle. (To match the last business day of the month), Q for Quarterly expirations (last business day of the quarter month MAR/JUN/SEP/DEC), W for Weekly expiration (also called Friday Short Term Expirations) and S for Expires 3rd Friday of the month (also known as regular options). */
  expirationType?: ExpirationType;
  /**
   * Expiration Year
   * @format int32
   * @example 2021
   */
  expirationYear?: number;
  /**
   * Is this contract part of the Penny Pilot program
   * @example true
   */
  isPennyPilot?: boolean;
  /**
   * milliseconds since epoch
   * @format int64
   * @example 1629504000000
   */
  lastTradingDay?: number;
  /**
   * Option multiplier
   * @format double
   * @example 100
   */
  multiplier?: number;
  /** option contract settlement type AM or PM */
  settlementType?: SettlementType;
  /**
   * Strike Price
   * @format double
   * @example 2300
   */
  strikePrice?: number;
  /**
   * A company, index or fund name
   * @example "AMZN Aug 20 2021 2300 Put"
   */
  underlying?: string;
}

/** Market info of security */
export interface RegularMarket {
  /**
   * Regular market last price
   * @format double
   * @example 124.85
   */
  regularMarketLastPrice?: number;
  /**
   * Regular market last size
   * @format int32
   * @example 51771
   */
  regularMarketLastSize?: number;
  /**
   * Regular market net change
   * @format double
   * @example -1.42
   */
  regularMarketNetChange?: number;
  /**
   * Regular market percent change
   * @format double
   * @example -1.1246
   */
  regularMarketPercentChange?: number;
  /**
   * Regular market trade time in milliseconds since Epoch
   * @format int64
   * @example 1621368000400
   */
  regularMarketTradeTime?: number;
}

export interface ErrorResponse {
  errors?: Error[];
}

export interface Error {
  /**
   * Unique error id.
   * @format uuid
   * @example "9821320c-8500-4edf-bd46-a9299c13d2e0"
   */
  id?: string;
  /**
   * The HTTP status code .
   * @example "400"
   */
  status?: "400" | "401" | "404" | "500";
  /**
   * Short error description.
   * @example "Missing header"
   */
  title?: string;
  /**
   * Detailed error description.
   * @example "Search combination should not exceed 500."
   */
  detail?: string;
  /** Who is responsible for triggering these errors. */
  source?: ErrorSource;
}

/** Who is responsible for triggering these errors. */
export interface ErrorSource {
  /**
   * list of attributes which lead to this error message.
   * @example ["/data/attributes/symbols","/data/attributes/cusips","/data/attributes/ssids"]
   */
  pointer?: string[];
  /**
   * parameter name which lead to this error message.
   * @example "fields"
   */
  parameter?: string;
  /**
   * header name which lead to this error message.
   * @example "Schwab-Client-CorrelId"
   */
  header?: string;
}

export interface OptionChain {
  symbol?: string;
  status?: string;
  underlying?: Underlying;
  strategy?:
    | "SINGLE"
    | "ANALYTICAL"
    | "COVERED"
    | "VERTICAL"
    | "CALENDAR"
    | "STRANGLE"
    | "STRADDLE"
    | "BUTTERFLY"
    | "CONDOR"
    | "DIAGONAL"
    | "COLLAR"
    | "ROLL";
  /** @format double */
  interval?: number;
  isDelayed?: boolean;
  isIndex?: boolean;
  /** @format double */
  daysToExpiration?: number;
  /** @format double */
  interestRate?: number;
  /** @format double */
  underlyingPrice?: number;
  /** @format double */
  volatility?: number;
  callExpDateMap?: Record<string, OptionContractMap>;
  putExpDateMap?: Record<string, OptionContractMap>;
}

export type OptionContractMap = Record<string, OptionContract>;

export interface Underlying {
  /** @format double */
  ask?: number;
  /** @format int32 */
  askSize?: number;
  /** @format double */
  bid?: number;
  /** @format int32 */
  bidSize?: number;
  /** @format double */
  change?: number;
  /** @format double */
  close?: number;
  delayed?: boolean;
  description?: string;
  exchangeName?: "IND" | "ASE" | "NYS" | "NAS" | "NAP" | "PAC" | "OPR" | "BATS";
  /** @format double */
  fiftyTwoWeekHigh?: number;
  /** @format double */
  fiftyTwoWeekLow?: number;
  /** @format double */
  highPrice?: number;
  /** @format double */
  last?: number;
  /** @format double */
  lowPrice?: number;
  /** @format double */
  mark?: number;
  /** @format double */
  markChange?: number;
  /** @format double */
  markPercentChange?: number;
  /** @format double */
  openPrice?: number;
  /** @format double */
  percentChange?: number;
  /** @format int64 */
  quoteTime?: number;
  symbol?: string;
  /** @format int64 */
  totalVolume?: number;
  /** @format int64 */
  tradeTime?: number;
}

export interface OptionDeliverables {
  symbol?: string;
  assetType?: string;
  deliverableUnits?: string;
  currencyType?: string;
}

export interface OptionContract {
  putCall?: "PUT" | "CALL";
  symbol?: string;
  description?: string;
  exchangeName?: string;
  /** @format double */
  bidPrice?: number;
  /** @format double */
  askPrice?: number;
  /** @format double */
  lastPrice?: number;
  /** @format double */
  markPrice?: number;
  /** @format int32 */
  bidSize?: number;
  /** @format int32 */
  askSize?: number;
  /** @format int32 */
  lastSize?: number;
  /** @format double */
  highPrice?: number;
  /** @format double */
  lowPrice?: number;
  /** @format double */
  openPrice?: number;
  /** @format double */
  closePrice?: number;
  /** @format int32 */
  totalVolume?: number;
  /** @format integer */
  tradeDate?: number;
  /** @format int32 */
  quoteTimeInLong?: number;
  /** @format int32 */
  tradeTimeInLong?: number;
  /** @format double */
  netChange?: number;
  /** @format double */
  volatility?: number;
  /** @format double */
  delta?: number;
  /** @format double */
  gamma?: number;
  /** @format double */
  theta?: number;
  /** @format double */
  vega?: number;
  /** @format double */
  rho?: number;
  /** @format double */
  timeValue?: number;
  /** @format double */
  openInterest?: number;
  isInTheMoney?: boolean;
  /** @format double */
  theoreticalOptionValue?: number;
  /** @format double */
  theoreticalVolatility?: number;
  isMini?: boolean;
  isNonStandard?: boolean;
  optionDeliverablesList?: OptionDeliverables[];
  /** @format double */
  strikePrice?: number;
  expirationDate?: string;
  /** @format int */
  daysToExpiration?: number;
  /** M for End Of Month Expiration Calendar Cycle. (To match the last business day of the month), Q for Quarterly expirations (last business day of the quarter month MAR/JUN/SEP/DEC), W for Weekly expiration (also called Friday Short Term Expirations) and S for Expires 3rd Friday of the month (also known as regular options). */
  expirationType?: ExpirationType;
  /** @format long */
  lastTradingDay?: number;
  /** @format double */
  multiplier?: number;
  /** option contract settlement type AM or PM */
  settlementType?: SettlementType;
  deliverableNote?: string;
  isIndexOption?: boolean;
  /** @format double */
  percentChange?: number;
  /** @format double */
  markChange?: number;
  /** @format double */
  markPercentChange?: number;
  isPennyPilot?: boolean;
  /** @format double */
  intrinsicValue?: number;
  optionRoot?: string;
}

export interface ExpirationChain {
  status?: string;
  expirationList?: Expiration[];
}

/** expiration type */
export interface Expiration {
  /** @format int32 */
  daysToExpiration?: number;
  expiration?: string;
  /** M for End Of Month Expiration Calendar Cycle. (To match the last business day of the month), Q for Quarterly expirations (last business day of the quarter month MAR/JUN/SEP/DEC), W for Weekly expiration (also called Friday Short Term Expirations) and S for Expires 3rd Friday of the month (also known as regular options). */
  expirationType?: ExpirationType;
  standard?: boolean;
  /** option contract settlement type AM or PM */
  settlementType?: SettlementType;
  optionRoots?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://api.schwabapi.com/marketdata/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
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
export class MarketData<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
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
    getQuotes: (
      query?: {
        /**
         * Comma separated list of symbol(s) to look up a quote
         * @example "MRAD,EATOF,EBIZ,AAPL,BAC,AAAHX,AAAIX,$DJI,$SPX,MVEN,SOBS,TOITF,CNSWF,AMZN  230317C01360000,DJX   231215C00290000,/ESH23,./ADUF23C0.55,AUD/CAD"
         */
        symbols?: string;
        /**
         * Request for subset of data by passing coma separated list of root nodes, possible root nodes are quote, fundamental, extended, reference, regular. Sending `quote, fundamental` in request will return quote and fundamental data in response. Dont send this attribute for full response.
         * @default "all"
         * @example "quote,reference"
         */
        fields?: string;
        /**
         * Include indicative symbol quotes for all ETF symbols in request. If ETF symbol ABC is in request and indicative=true API will return quotes for ABC and its corresponding indicative quote for $ABC.IV
         * @example false
         */
        indicative?: true | false;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuoteResponse, ErrorResponse>({
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
    getQuote: (
      symbolId: string,
      query?: {
        /**
         * Request for subset of data by passing coma separated list of root nodes, possible root nodes are quote, fundamental, extended, reference, regular. Sending `quote, fundamental` in request will return quote and fundamental data in response. Dont send this attribute for full response.
         * @default "all"
         * @example "quote,reference"
         */
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuoteResponse, ErrorResponse>({
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
    getChain: (
      query: {
        /**
         * Enter one symbol
         * @example "AAPL"
         */
        symbol: string;
        /** Contract Type */
        contractType?: "CALL" | "PUT" | "ALL";
        /** The Number of strikes to return above or below the at-the-money price */
        strikeCount?: number;
        /** Underlying quotes to be included */
        includeUnderlyingQuote?: boolean;
        /** OptionChain strategy. Default is SINGLE. ANALYTICAL allows the use of volatility, underlyingPrice, interestRate, and daysToExpiration params to calculate theoretical values. */
        strategy?:
          | "SINGLE"
          | "ANALYTICAL"
          | "COVERED"
          | "VERTICAL"
          | "CALENDAR"
          | "STRANGLE"
          | "STRADDLE"
          | "BUTTERFLY"
          | "CONDOR"
          | "DIAGONAL"
          | "COLLAR"
          | "ROLL";
        /**
         * Strike interval for spread strategy chains (see strategy param)
         * @format double
         */
        interval?: number;
        /**
         * Strike Price
         * @format double
         */
        strike?: number;
        /** Range(ITM/NTM/OTM etc.) */
        range?: string;
        /**
         * From date(pattern: yyyy-MM-dd)
         * @format date
         * @pattern ^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$
         */
        fromDate?: string;
        /**
         * To date (pattern: yyyy-MM-dd)
         * @format date
         * @pattern ^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$
         */
        toDate?: string;
        /**
         * Volatility to use in calculations.  Applies only to ANALYTICAL strategy chains (see strategy param)
         * @format double
         */
        volatility?: number;
        /**
         * Underlying price to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param)
         * @format double
         */
        underlyingPrice?: number;
        /**
         * Interest rate to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param)
         * @format double
         */
        interestRate?: number;
        /**
         * Days to expiration to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param)
         * @format int32
         */
        daysToExpiration?: number;
        /** Expiration month */
        expMonth?:
          | "JAN"
          | "FEB"
          | "MAR"
          | "APR"
          | "MAY"
          | "JUN"
          | "JUL"
          | "AUG"
          | "SEP"
          | "OCT"
          | "NOV"
          | "DEC"
          | "ALL";
        /** Option Type */
        optionType?: string;
        /** Applicable only if its retail token, entitlement of client PP-PayingPro, NP-NonPro and PN-NonPayingPro */
        entitlement?: "PN" | "NP" | "PP" | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<OptionChain, ErrorResponse>({
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
    getExpirationChain: (
      query: {
        /**
         * Enter one symbol
         * @example "AAPL"
         */
        symbol: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ExpirationChain, ErrorResponse>({
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
    getPriceHistory: (
      query: {
        /**
         * The Equity symbol used to look up price history
         * @example "AAPL"
         */
        symbol: string;
        /** The chart period being requested. */
        periodType?: "day" | "month" | "year" | "ytd";
        /**
         * The number of chart period types.<br><br> If the periodType is <br> &#8226; <b>day</b> - valid values are 1, 2, 3, 4, 5, 10<br> &#8226; <b>month</b> - valid values are 1, 2, 3, 6<br> &#8226; <b>year</b> - valid values are 1, 2, 3, 5, 10, 15, 20<br> &#8226; <b>ytd</b> - valid values are 1<br><br> If   the period is not specified and the periodType is<br> &#8226; <b>day</b> - default period is 10.<br> &#8226; <b>month</b> - default period is 1.<br> &#8226; <b>year</b> - default period is 1.<br> &#8226; <b>ytd</b> - default period is 1.<br>
         * @format int32
         */
        period?: number;
        /** The time frequencyType<br><br> If the periodType is <br> &#8226; <b>day</b> - valid value is minute<br> &#8226; <b>month</b> - valid values are daily, weekly<br> &#8226; <b>year</b> - valid values are daily, weekly, monthly<br> &#8226; <b>ytd</b> - valid values are daily, weekly<br><br> If frequencyType  is not specified, default value depends on the periodType<br> &#8226; <b>day</b> - defaulted to minute.<br> &#8226; <b>month</b> - defaulted to weekly.<br> &#8226; <b>year</b> - defaulted to monthly.<br> &#8226; <b>ytd</b> - defaulted to weekly.<br> */
        frequencyType?: "minute" | "daily" | "weekly" | "monthly";
        /**
         * The time frequency duration<br><br> If the frequencyType is <br> &#8226; <b>minute</b> - valid values are 1, 5, 10, 15, 30<br> &#8226; <b>daily</b> - valid value is 1<br> &#8226; <b>weekly</b> - valid value is 1<br> &#8226; <b>monthly</b> - valid value is 1<br><br> If frequency  is not specified, default value is <b>1</b><br>
         * @format int32
         */
        frequency?: number;
        /**
         * The start date, Time   in milliseconds since the UNIX epoch eg 1451624400000<br>If not   specified startDate will be (endDate - period) excluding weekends and holidays.
         * @format int64
         */
        startDate?: number;
        /**
         * The end date, Time   in milliseconds since the UNIX epoch eg 1451624400000<br> If not   specified, the endDate will default to the market close of previous business day.
         * @format int64
         */
        endDate?: number;
        /** Need extended hours data */
        needExtendedHoursData?: boolean;
        /** Need previous close price/date */
        needPreviousClose?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<CandleList, ErrorResponse>({
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
    getMovers: (
      symbolId:
        | "$DJI"
        | "$COMPX"
        | "$SPX"
        | "NYSE"
        | "NASDAQ"
        | "OTCBB"
        | "INDEX_ALL"
        | "EQUITY_ALL"
        | "OPTION_ALL"
        | "OPTION_PUT"
        | "OPTION_CALL",
      query?: {
        /**
         * Sort by a particular attribute
         * @example "VOLUME"
         */
        sort?:
          | "VOLUME"
          | "TRADES"
          | "PERCENT_CHANGE_UP"
          | "PERCENT_CHANGE_DOWN";
        /**
         * To return movers with the specified directions of up or down
         * @format int32
         * @default 0
         */
        frequency?: 0 | 1 | 5 | 10 | 30 | 60;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          screeners?: Screener[];
        },
        ErrorResponse
      >({
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
    getMarketHours: (
      query: {
        /**
         * List of markets
         * @uniqueItems true
         */
        markets: ("equity" | "option" | "bond" | "future" | "forex")[];
        /**
         * Valid date range is from currentdate to 1 year from today. It will default to current day if not entered. Date format:YYYY-MM-DD
         * @format date
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, Record<string, Hours>>, ErrorResponse>({
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
    getMarketHour: (
      marketId: "equity" | "option" | "bond" | "future" | "forex",
      query?: {
        /**
         * Valid date range is from currentdate to 1 year from today. It will default to current day if not entered. Date format:YYYY-MM-DD
         * @format date
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, Record<string, Hours>>, ErrorResponse>({
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
    getInstruments: (
      query: {
        /** symbol of a security */
        symbol: string;
        /** search by */
        projection:
          | "symbol-search"
          | "symbol-regex"
          | "desc-search"
          | "desc-regex"
          | "search"
          | "fundamental";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          instruments?: InstrumentResponse[];
        },
        ErrorResponse
      >({
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
    getInstrumentsByCusip: (cusipId: string, params: RequestParams = {}) =>
      this.request<InstrumentResponse, ErrorResponse>({
        path: `/instruments/${cusipId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}

# schwab-client-js Developer Reference

### This document is an overview of the classes, methods, and functions implemented in schwab-client-js. You may still need to look at the Schwab API documentation on developer.schwab.com to see what elements are returned by API calls, details of error messages, and various structures such as streaming subscription parameters.

## Contents

* [Debugging](#debugging)
* [The Classes](#the-classes)
* [Subclasses and Methods for Class SchwabAPIclient](#subclasses-and-methods-for-class-schwabapiclient)
    + [Two Minor Changes To The API That I Made](#two-minor-changes-to-the-api-that-i-made)
    + [Using Dates In Methods](#using-dates-in-methods)
    + [MarketApiClient() Usage](#marketapiclient-usage)
    + [TradingApiClient() Usage](#tradingapiclient-usage)
    + [StreamingApiClient() Usage](#streamingapiclient-usage)
    + [Table 1: Table Of Classes And Methods](#table-1-table-of-classes-and-methods)
* [Helper Functions For Making Orders](#helper-functions-for-making-orders)
    + [Creating Option Symbols](#creating-option-symbols)
    + [Creating Order Objects](#creating-order-objects)
    + [Table 2: Table Of Helper Functions](#table-2-table-of-helper-functions)

## Debugging

schwab-client-js uses the [debug](https://www.npmjs.com/package/debug) package for quick and easy
debugging. Simply add the `DEBUG` environment var to your `.env` file or as an environment variable, and debugging info will show up on the console. <br />

**Available DEBUG namespaces**

- `DEBUG=streaming:msgs` Displays all streaming messages and events
- `DEBUG=fetch:args` Displays arguments to fetch() calls
- `DEBUG=fetch:raw-response` Displays raw response object from fetch() calls

**Other ways to use DEBUG**

- `DEBUG=streaming:msgs,fetch:raw-response` Display both of these
- `DEBUG=fetch:*` Display both `fetch:args` and `fetch:raw-response`
- `DEBUG=*` Display everything

When fetch() calls throw an exception, the error is printed on the console.


## The Classes

schwab-client-js defines a class ` SchwabAPIclient` and three subclasses

- `TradingApiClient()` - make/delete orders and get your order and account data
- `MarketApiClient()` - retrieve all sorts of market data
- `StreamingApiClient()` - real-time streaming of market data

Once your `.env` file is setup (see the [Readme](../Readme.md) for setup details), running any of the methods associated with these classes is straightforward.

[Note: For situtations where using a ```.env```file or environment variables may not be optimal (possibly AWS Lambda, for example), schwab-client-js also supports injecting your security tokens directly e.g. ```const mktclient = new MarketApiClient(appKey,appSecret,appRefresh);```]

### See the [examples directory](examples) for usage examples

## Subclasses and Methods for Class SchwabAPIclient

### One Minor Change To An API Call That I Made

In general, I pass through anything that Schwab API calls return without modifying anything. There is one exception. In one method, **when the call succeeds**, I return a slightly different thing than what the Schwab documentation says:

- `placeOrderByAcct()` - This is the method for placing trades. When you place an order, I return a JSON object containing the orderId (the underlying Schwab API call puts the orderID in a header and returns null).

### Using Dates In Methods

In various methods, you may have to specify day/time in order to retrieve data from within a certain period of time. Two types of date/time formats are used, depending on the call. Check the Schwab developer docs to see which one you need. The two types:

- **ISO 8601 format:** for example "2024-11-28T12:17:41-05:00" or just "2024-11-28".
- **Milliseconds since the Epoch:** for example 1730432440000 (decoded, that's 2024-10-31T22:40:40-05:00 in CST)

### MarketApiClient() Usage

All of the `MarketApiClient()` calls are HTTP GET calls, so they are simply fetching market data for you. There is a wide range of data you can fetch. The calls are listed in Table 1 below.

Here's an example of getting the price history for the stock ticker "AMD". The call `priceHistory()` uses millseconds since the epoch to represent date/time. 

```
import { MarketApiClient } from "schwab-client-js";
const mktclient = new MarketApiClient();
// Let's get the price history of "AMD", sampled once a day from November 4-8
// startDate is Nov 4, 2024 -- milliseconds since the epoch: 1730738221000
// startDate is Nov 8, 2024  -- milliseconds since the epoch: 1731083821000
const params = { periodType : "month", period : 1, frequencyType: "daily", startDate : 1730738221000, endDate : 1731083821000 };
const data = await mktclient.priceHistory("AMD", params);
console.log(JSON.stringify(data, null, 2));
```

Output is:

```
{
  "candles": [
    {
      "open": 141.7,
      "high": 143.64,
      "low": 139.72,
      "close": 140.71,
      "volume": 29117421,
      "datetime": 1730700000000
    },
    {
      "open": 141.94,
      "high": 143.08,
      "low": 140.8,
      "close": 141.66,
      "volume": 27067330,
      "datetime": 1730786400000
    },
    {
      "open": 144.95,
      "high": 145.625,
      "low": 141.52,
      "close": 145.1,
      "volume": 32911499,
      "datetime": 1730872800000
    },
    {
      "open": 146.68,
      "high": 150.12,
      "low": 145.66,
      "close": 149.82,
      "volume": 30326430,
      "datetime": 1730959200000
    },
    {
      "open": 149.39,
      "high": 150.71,
      "low": 147.525,
      "close": 147.95,
      "volume": 27560342,
      "datetime": 1731045600000
    }
  ],
  "symbol": "AMD",
  "empty": false
}
```

Here's another example of getting option chains for a stock symbol. Note that you may have to adjust the parameters to get this call to work for you.

```
import { MarketApiClient } from "schwab-client-js";
const mktclient = new MarketApiClient();
// Get the options chain for "TSLA" with a strike price of $380,
// OTM = Out-Of-The-Money, and call options only.
// Note that day/time is in ISO 8601 format.
const chainOptions = { strike: 380, strikeCount: 1, range: "OTM", contractType: "CALL", fromDate: "2025-02-06", toDate: "2025-02-07" };
const data = await mktclient.chains("TSLA", chainOptions);
console.log(JSON.stringify(data, null, 2));
```

Partial output:

```
{
	"symbol": "TSLA",
	"status": "SUCCESS",
	"strategy": "SINGLE",
	"interval": 0,
	"isDelayed": false,
	"isIndex": false,
	"interestRate": 4.738,
	"underlyingPrice": 383.24,
	"volatility": 29,
	"daysToExpiration": 0,
	"dividendYield": 0,
	"numberOfContracts": 1,
	"assetMainType": "EQUITY",
	"assetSubType": "COE",
	"isChainTruncated": false,
	"callExpDateMap": {
		"2025-02-07:36": {
			"380.0": [
				{
					"putCall": "CALL",
					"symbol": "TSLA	 250207C00380000",
					...
					...
					...
```

#### See the [examples directory](examples) for further usage examples. See the Schwab documentation on developer.schwab.com for detailed parameter descriptions.

### TradingApiClient() Usage

The `TradingApiClient()` is where you can make equity and options orders of various styles as well as access your personal current and historical trading data and account information.

If you are going to make orders or look at your historical transaction data, you probably need to specify your hashed account number. Use `accountNumbers()` to retrieve all authorized Schwab account numbers and their hashes (you may have more than one Schwab account):

```
import { TradingApiClient } from  "schwab-client-js";
const trdclient = new TradingApiClient();
const accounts = await trdclient.accountsNumbers();
// If you have authorized two accounts, as shown here, 
// you'll need to do a test to make sure you're using the
// correct hashValue. With only one account, it will
// be the first array value: accounts[0].hashValue
console.log(JSON.stringify(accounts, null, 2));
```

Output:

```
[
	{
		"accountNumber": "34567890",
		"hashValue": "9313A0737VVVV6C0B13DDCDF6962015FC0"
	},
	{
		"accountNumber": "45678901",
		"hashValue": "F0A8B4B9AXXB9AF35484EC919D1CAB54F3"
	}
]
```

I might want to see if any of my orders were rejected within a certain time frame. In this case, one of my orders was rejected:

```
import { TradingApiClient } from  "schwab-client-js";
const trdclient = new TradingApiClient();
const orders = await trdclient.ordersByAccount(acctHash, "2024-11-25T12:17:41-05:00", "2024-11-29T10:35:41-05:00", "REJECTED");
console.log(JSON.stringify(orders, null, 2));
```

One rejected order was found. The output (edited for brevity):

```
[
	{
		"session": "NORMAL",
		"duration": "DAY",
		"orderType": "LIMIT",
		...
		...
		... [edited for brevity]
		...
		"price": 1,
		"orderLegCollection": [
			...
			...
			...
					"symbol": "CTRN",
					"instrumentId": 668354
				},
				"instruction": "BUY",
				"positionEffect": "OPENING",
				"quantity": 1
		...
		...
		"status": "REJECTED",
		...
		...
		"statusDescription": "Your limit price is significantly away from the current market price. Please adjust your order."
	}
]
```

We need to create an order object (JSON structure) in order to submit an order. I'll use one of the helper functions to create a JSON structure that opens an equity limit sell order, `equitySellLimit()`

```
import { equitySellLimit } from "schwab-client-js/orderhelp";

// Submit a limit sell order
let tradeObj = equitySellLimit("IBM", 10, "55.25");
console.log(JSON.stringify(tradeObj, null, 2));
```

Output:

```
{
  "orderType": "LIMIT",
  "session": "NORMAL",
  "duration": "DAY",
  "orderStrategyType": "SINGLE",
  "orderLegCollection": [
    {
      "instruction": "SELL",
      "quantity": 10,
      "instrument": {
        "symbol": "IBM",
        "assetType": "EQUITY"
      }
    }
  ],
  "price": "55.25"
}
```

Taking the account hash from the previous code above, as well as the trading object just created, we can execute an equity limit sell order:

```
import { TradingApiClient } from  "schwab-client-js";
const acctHash = accounts[0].hashValue;
// Submit your order
const orderId = await trdclient.placeOrderByAcct(acctHash, tradeObj);
console.log(JSON.stringify(orderId, null, 2));
```

Output:

```
{
"orderId" : "XXXXXXXXX"
}
```

The `orderId` can then be used in the `orderById()` call to check the status of the order, or with `orderDelete()` to delete the order.

#### See the [examples directory](examples) for further usage examples. See the Schwab documentation on developer.schwab.com for detailed parameter descriptions.

### StreamingApiClient() Usage

The `StreamingApiClient()` streams various types of data that you specify. You can specify up to 500 stock symbols to stream at one time and specify various types of data that you want to stream for each symbol.

Scwhab uses websockets to stream market data and schwab-client-js uses the [ws](https://www.npmjs.com/package/ws) library to manage the websocket. The first section of code below sets up the listeners for the websocket and logs you into the Schwab websocket.

```
import { StreamingApiClient } from "schwab-client-js";

// Create your streaming client object
const streamclient = new StreamingApiClient();

// You should create listeners for the four types of messages
// sent via websockets: open, message, close, and error. The method
// streamListen simplifies this.

// Listen for the "open" request. Display any received messages on the console
streamclient.streamListen("open", () => {
  console.log("Received open message: webSocket connection opened.");
});

// Listen for messages from Schwab. This is where your data arreves. Display any messages on the console.
streamclient.streamListen("message", (message) => {
  console.log("Received data message:", message);
});

// Listen for close messages and display on the console.
streamclient.streamListen("close", (code, reason) => {
  console.log(`Connection closed: Code=${code}, Reason=${reason}`);
});

// Listen for error messages and display on the console
streamclient.streamListen("error", (error) => {
  console.error("Received error message:", error);
});

// Initialize the stream
await streamclient.streamInit();

// Login to the Schwab stream. A message should appear on the console if this succeeds (or not)
await streamclient.streamSchwabLogin();
```

At this point, you're ready to tell Schwab what equities, options, futures, or forex data that you want to stream. The choices are fairly large and are beyond the scope of this document, but you can see the choices on developer.schwab.com [in this section](https://developer.schwab.com/products/trader-api--individual/details/documentation/Market%20Data%20Production)

As illustrated below, the `streamSchwabRequest()` takes three parameters:

- a **command**, one of: SUBS | UNSUBS | ADD | VIEW - ADD adds symbols to a feed without disturbing existing streaming. SUBS replaces existing streaming data with the new ones you designate. VIEW changes `fields` for a specific service. UNSUBS removes symbols and their data from a stream.
- a **service name**, one of: LEVELONE_EQUITIES | LEVELONE_OPTIONS | LEVELONE_FUTURES | LEVELONE_FUTURES_OPTIONS | LEVELONE_FOREX | NYSE_BOOK | NASDAQ_BOOK | OPTIONS_BOOK | CHART_EQUITY | CHART_FUTURES | SCREENER_EQUITY | SCREENER_OPTION | ACCT_ACTIVITY
- a **list of `keys` and `fields`**. The `keys` are symbols for equities, options, forex, or futures. The `fields` are the specific data points you want returned for each symbol.

```
// The ADD command adds symbols to your stream
let params = { keys: "AMD,TSLA,GOOG", fields: "0,1,2,3,4,5" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_EQUITIES", params);

// The ADD command adds symbols to your stream. In this case, for forex data
params = { keys: "EUR/USD,USD/JPY,AUD/CAD", fields: "0,1,2,6,14" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_FOREX", params);

// ADD some chart futures
params = { keys: "/MNQ,/M2K", fields: "0,2,3" };
await streamclient.streamSchwabRequest("ADD", "CHART_FUTURES", params);

// ADD more forex data
params = { keys: "USD/EUR,USD/JPY,USD/CAD", fields: "0,1,2,6,14" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_FOREX", params);

// ADD screener services
params = {
  keys: "NASDAQ_VOLUME_5,$SPX_PERCENT_CHANGE_UP_0",
  fields: "0,1,2,3,4",
};
await streamclient.streamSchwabRequest("ADD", "SCREENER_EQUITY", params);

// ADD options info
params = {
  keys: "MSFT  251219P00200000",
  fields: "0,2,3,4,8,9,10,16,17,20,21,22,28,29,30,31,38",
};
await streamclient.streamSchwabRequest("ADD", "LEVELONE_OPTIONS", params);

// Remove TSLA info from the stream with UNSUBS
params = { keys: "TSLA" };
await streamclient.streamSchwabRequest("UNSUBS", "LEVELONE_EQUITIES", params);

// LOGOUT of the stream
await streamclient.streamSchwabLogout();
streamclient.streamClose();
```

#### See the [examples directory](examples) for further usage examples. See the Schwab documentation on developer.schwab.com for detailed parameter descriptions.

### Table 1: Table Of Classes And Methods

| **Subclass or Description**                                   | **Method**            | **Parameters**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MarketApiClient**                                           |                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Get option chain for an optionable symbol.                    | `chains`              | `symbol: string,`<br>`options: ChainsOptions = {`<br>`  contractType?: string,`<br>`  strikeCount?: number,`<br>`  includeUnderlyingQuote?: boolean,`<br>`  strategy?: string,`<br>`  interval?: number,`<br>`  strike?: number,`<br>`  range?: string,`<br>`  fromDate?: string,`<br>`  toDate?: string,`<br>`  volatility?: number,`<br>`  underlyingPrice?: number,`<br>`  interestRate?: number,`<br>`  daysToExpiration?: number,`<br>`  expMonth?: string,`<br>`  optionType?: string,`<br>`  entitlement?: string,`<br>`}` |
| Get Option Expiration info for an optionable symbol.          | `expirationChain`     | `symbol: string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Get instrument details by CUSIP ID.                           | `instrumentsCusip`    | `cusip_id: string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Get instrument details by symbol and projection.              | `instrumentsSymbol`   | `symbol: string, projection: string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Get market hours for a single market.                         | `marketById`          | `market_id: string, date?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Get market hours for a list of markets.                       | `markets`             | `markets: string, date?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Get a list of top 10 securities movers by index.              | `movers`              | `symbol_id: string, sort?: string = null, frequency?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Get price history for a given symbol ID.                      | `priceHistory`        | `symbol: string,`<br>`options: PriceHistoryOptions = {`<br>`  periodType?: string,`<br>`  period?: number,`<br>`  frequencyType?: string,`<br>`  frequency?: number,`<br>`  startDate?: number,`<br>`  endDate?: number,`<br>`  needExtendedHoursData?: boolean,`<br>`  needPreviousClose?: boolean,`<br>`}`                                                                                                                                                                                                                      |
| Get a quote by symbol ID.                                     | `quoteById`           | `symbol_id: string, fields?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Get multiple quotes for a list of symbols.                    | `quotes`              | `symbols: string, fields?: string = null, indicative?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **TradingApiClient**                                          |                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Get balances and positions for all accounts.                  | `accountsAll`         | `fields?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Get balance and positions for a specific account.             | `accountsDetails`     | `accountHash: string, fields?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Get all authorized account numbers with hashes.               | `accountsNumbers`     | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Get all orders for all authorized accounts.                   | `orderAll`            | `fromEnteredTime: string, toEnteredTime: string, status?: string = null, maxResults?: number = null`                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Get details of a specific order by its ID.                    | `orderById`           | `accountHash: string, orderId: string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Delete an order by its ID. Returns null if successful.        | `orderDelete`         | `accountHash: string, orderId: number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Preview an order.                                             | `orderPreview`        | `accountHash: string, orderObj: OrderObject` (see Note below)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Get orders by account withing timeframe                       | `ordersByAccount`     | `accountHash: string, fromEnteredTime: string, toEnteredTime: string, status?: string = null, maxResults?: number = null`                                                                                                                                                                                                                                                                                                                                                                                                         |
| Place an order.                                               | `placeOrderByAcct`    | `accountHash: string, orderObj: OrderObject` (see Note below)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Get some account preferences and streaming details            | `prefs`               | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Get transaction info by transaction id for a specific account | `transactById`        | `accountHash: string, transId: string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Get all transaction info for a specific account               | `transactByAcct`      | `accountHash: string, accountHash: string, types: string, startDate: string, endDate: string, symbol?: string = null`                                                                                                                                                                                                                                                                                                                                                                                                             |
| Update an existing order.                                     | `updateOrderById`     | `accountHash: string, orderId: number, orderObj: OrderObject` (see Note below)                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **StreamingApiClient**                                        |                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Initialize the WebSocket stream.                              | `streamInit`          | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Log in to the Schwab streaming service.                       | `streamSchwabLogin`   | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Log out of the Schwab streaming service.                      | `streamSchwabLogout`  | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Send a request to the Schwab streaming service.               | `streamSchwabRequest` | `command: string, service: string, params: Record<string, any> = {}` (see Note below)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Listen for events from the WebSocket stream.                  | `streamListen`        | `eventName: string, listener: () => void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Close the WebSocket stream.                                   | `streamClose`         | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### **Note: See Schwab developer documentation for details on the elements of this structure**

### For complete details on returned JSON objects, error codes, order objects, and other API request details, see the documentation on [developer.schwab.com](https://developer.schwab.com).

## Helper Functions For Making Orders

[Note: These helper functions were ported by me from [Alex Golec's Python project](https://github.com/alexgolec/schwab-py) to NodeJS]

schwab-client-js has helper functions that make it easier to create order object(s). Creating an order object -- a JSON structure -- is necessary in order to place or update an order. The two functions you use for placing and updating an order are:

- `placeOrderByAcct()`
- `updateOrderById()`
- `orderPreview()` -- not yet implemented by Schwab but still listed in the Schwab docs

### Creating Option Symbols

All of the helper functions create order objects except for `optionSymbol()` which mereley helps you create the Schwab format for an option symbol, which is (from the Schwab docs): <br /><br />
**Symbol (6 characters including spaces) + Expiration (6 characters, YYMMDD) + Call/Put (1 character: 'C' or 'P') + Strike Price (5+3=8 characters)**

The Symbol is left-justified and padded with spaces, the expiration date is in the form YYMMDD, and the Strike Price has three zeros to the right of the decimal point and is padded on the left with zeroes. <br />
**Example:<br /><br />
Stock Symbol: XYZ<br />
Expiration: 2021/01/15<br />
Type: Call<br />
Strike Price: $62.50**

```
import { optionSymbol } from "schwab-client-js/orderhelp";
const optsymbol = optionSymbol("XYZ", "210115", "C", "62.50");
```

**The resulting option symbol is: `"XYZ   210115C00062500"`** (there are three spaces between "XYZ" and "210115"

### Creating Order Objects

The table below contains all the helper functions for creating order objects (as well as optionSymbol() ). The helper functions have various parameters but they all return a single JSON object which you can use directly in your orders or you can modify the order object further as needed before using.

Example:

```
import { TradingApiClient } from  "schwab-client-js";
import { equitySellShortMarket } from "schwab-client-js/orderhelp";

// Equity short sell market order
let tradeObj = equitySellShortMarket("AMD", "23.12");
console.log(JSON.stringify(tradeObj, null, 2));
```

Output:

```
{
  "orderType": "MARKET",
  "session": "NORMAL",
  "duration": "DAY",
  "orderStrategyType": "SINGLE",
  "orderLegCollection": [
    {
      "instruction": "SELL_SHORT",
      "quantity": "23.12",
      "instrument": {
        "symbol": "AMD",
        "assetType": "EQUITY"
      }
    }
  ]
}
```

```
// Maybe you want to change the duration
tradeObj.duration = "END_OF_WEEK";

// Get your hashed account number so that you can submit your order
const trdclient = new TradingApiClient();
const acctData = await trdclient.accountsNumbers();
const acctHash = acctData[0].hashValue;

// Submit your order
const orderId = await trdclient.placeOrderByAcct(acctHash, tradeObj);
console.log(JSON.stringify(orderId, null, 2));
```

Output:

```
{
"orderId" : "XXXXXXXXX"
}
```

### Table 2: Table Of Helper Functions

| Description                                                                                                   | Function                | Parameters                                                                                     |
|---------------------------------------------------------------------------------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------|
| Create an option symbol in the format required by Schwab. The expiration date should be in the format "YYMMDD". | `optionSymbol()`        | `symbol: string`, `expirationDate: string`, `contractType: "C" or "P"`, `strikePrice: string` |
| Returns a pre-filled JSON order object for an equity buy limit order.                                        | `equityBuyLimit()`      | `symbol: string`, `quantity: number`, `price: string`                                         |
| Returns a pre-filled JSON order object for an equity buy market order.                                       | `equityBuyMarket()`     | `symbol: string`, `quantity: number`                                                         |
| Returns a pre-filled JSON order object for an equity sell market order.                                      | `equitySellMarket()`    | `symbol: string`, `quantity: number`                                                         |
| Returns a pre-filled JSON order object for an equity sell limit order.                                       | `equitySellLimit()`     | `symbol: string`, `quantity: number`, `price: string`                                        |
| Returns a pre-filled JSON order object for an equity short sell market order.                                | `equitySellShortMarket()` | `symbol: string`, `quantity: number`                                                       |
| Returns a pre-filled JSON order object for an equity short sell limit order.                                 | `equitySellShortLimit()` | `symbol: string`, `quantity: number`, `price: string`                                       |
| Returns a pre-filled JSON order object for an equity buy-to-cover market order.                              | `equityBuyToCoverMarket()` | `symbol: string`, `quantity: number`                                                      |
| Returns a pre-filled JSON order object for an equity buy-to-cover limit order.                               | `equityBuyToCoverLimit()` | `symbol: string`, `quantity: number`, `price: string`                                      |
| Returns a pre-filled JSON order object for a buy-to-open market order.                                       | `optionBuyToOpenMarket()` | `symbol: string`, `quantity: number`                                                      |
| Returns a pre-filled JSON order object for a buy-to-open limit order.                                        | `optionBuyToOpenLimit()` | `symbol: string`, `quantity: number`, `price: string`                                      |
| Returns a pre-filled JSON order object for a sell-to-open market order.                                      | `optionSellToOpenMarket()` | `symbol: string`, `quantity: number`                                                     |
| Returns a pre-filled JSON order object for a sell-to-open limit order.                                       | `optionSellToOpenLimit()` | `symbol: string`, `quantity: number`, `price: string`                                     |
| Returns a pre-filled JSON order object for a buy-to-close market order.                                      | `optionBuyToCloseMarket()` | `symbol: string`, `quantity: number`                                                     |
| Returns a pre-filled JSON order object for a buy-to-close limit order.                                       | `optionBuyToCloseLimit()` | `symbol: string`, `quantity: number`, `price: string`                                     |
| Returns a pre-filled JSON order object for a sell-to-close market order.                                     | `optionSellToCloseMarket()` | `symbol: string`, `quantity: number`                                                    |
| Returns a pre-filled JSON order object for a sell-to-close limit order.                                      | `optionSellToCloseLimit()` | `symbol: string`, `quantity: number`, `price: string`                                    |
| Returns a pre-filled JSON order object that opens a bull call vertical position.                             | `bullCallVerticalOpen()` | `long_symbol: string`, `short_symbol: string`, `quantity: number`, `price: string`        |
| Returns a pre-filled JSON order object that closes a bull call vertical position.                            | `bullCallVerticalClose()` | `short_symbol: string`, `long_symbol: string`, `quantity: number`, `price: string`       |
| Returns a pre-filled JSON order object that opens a bull put vertical position.                              | `bullPutVerticalOpen()` | `long_put_symbol: string`, `short_put_symbol: string`, `quantity: number`, `price: string` |
| Returns a pre-filled JSON order object that closes a bull put vertical position.                             | `bullPutVerticalClose()` | `long_put_symbol: string`, `short_put_symbol: string`, `quantity: number`, `price: string` |
| Returns a pre-filled JSON order object that opens a bear call vertical position.                             | `bearCallVerticalOpen()` | `short_symbol: string`, `long_symbol: string`, `quantity: number`, `price: string`       |
| Returns a pre-filled JSON order object that closes a bear call vertical position.                            | `bearCallVerticalClose()` | `symbol1: string`, `symbol2: string`, `quantity: number`, `price: string`               |
| Returns a pre-filled JSON order object that closes a bear put vertical position.                             | `bearPutVerticalClose()` | `short_put_symbol: string`, `long_put_symbol: string`, `quantity: number`, `price: string` |
| Returns a pre-filled JSON order object that opens a bear put vertical position.                              | `bearPutVerticalOpen()` | `short_put_symbol: string`, `long_put_symbol: string`, `quantity: number`, `price: string` |
| If one of the orders is executed, immediately cancel the other.                                              | `oneCancelsOther()`      | `primaryOrder: Order`, `secondaryOrder: Order`                                           |
| If primaryOrder is executed, immediately place secondaryOrder.                                               | `firstTriggersSecond()`  | `primaryOrder: Order`, `secondaryOrder: Order`                                           |


# schwab-client-js

## A modern wrapper around the Schwab financial API for NodeJS Typescript and Javascript projects

[![Join our Discord](https://img.shields.io/discord/1326044850524651540.svg?label=Discord&logo=discord&color=7289DA)](https://discord.gg/Q9z8EnB8xD) [![Donate Paypal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/jlevittpay?country.x=US&locale.x=en_US) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/license/mit) ![Node.js supported](https://img.shields.io/node/v/schwab-client-js.svg) ![npm Downloads](https://img.shields.io/npm/dt/schwab-client-js) [![npm version](https://badge.fury.io/js/schwab-client-js.svg)](https://www.npmjs.com/package/schwab-client-js)

Disclaimer: This project is not affiliated with, endorsed by, or associated with The Charles Schwab Corporation. All registered trademarks are the property of their respective owners. Use of these names, logos, and brands is for identification purposes only. This project is licensed under the MIT license, and acts in accordance with Schwab's API terms and conditions.

<hr style="border: 2px solid black;">

<span>
<figure>
     <img src="examples/schwab-dashboard-react/public/stockdashboard.png" alt="Description" style="height: 250px; width: auto;">
</figure>
&nbsp;&nbsp;
<figure>
     <img src="examples/schwab-dashboard-forex/forexdashboard.png" alt="Description" style="height: 250px; width: auto;">
</figure>
</span>
<br />

**Two Streaming Dashboards From The [examples directory](examples)**

### **schwab-client-js** gives you complete access to the Schwab REST API using convenient classes and methods. You can stream real-time market data, create and track orders, and retrieve information about your account as well as retrieve different types of market data.

### Note: This project only supports [nodejs](https://nodejs.org/). Although technically you could tweak schwab-client-js to run in a web browser, security concerns make that a poor choice.

### Join the discussion on our [Discord Server](https://discord.gg/Q9z8EnB8xD)

## Installation

**Software prerequisites: nodejs version 18 or newer and a nodejs package manager such as yarn or npm**

**Install the package:**

```
$ npm install schwab-client-js

or

$ yarn add schwab-client-js
```

## Charles Schwab Prerequisites

1. You need a [Schwab brokerage account](https://www.schwab.com/open-an-account). The account is free. There is no minimum balance requiremnent.
2. Login to your Schwab account and [turn on thinkorswim](https://client.schwab.com/app/trade/tradingtools). If thinkorswim is already enabled, you won't see instructions on how to enable it.
3. You need to signup for a [Schwab developer account](https://developer.schwab.com). The account is free.
4. Login to your developer account and [create an "app"](https://developer.schwab.com/dashboard/apps) which is really just a web page where you configure the metadata for your API calls.

See the [Schwab API Configuration doc](docs/SchwabConfig.md) for details on creating your Schwab app.

5. You have to wait (probably 1-3 days) for your app to be approved. Go to your [dashboard](https://developer.schwab.com/dashboard) to check on the status of your app. You cannot use the API while the status of your app is **Approved - Pending**. When the status of your app is **Ready For Use**, you can proceed.
6. Once your app is approved, click on **View Details** for your app. At the bottom you should see your **App Key** and **Secret**.

## Configuring schwab-client-js

**Schwab uses three-legged OAuth** for authentication. The details are on [developer.schwab.com here](https://developer.schwab.com/user-guides/get-started/authenticate-with-oauth) and [here](https://developer.schwab.com/products/trader-api--individual/details/documentation/Retail%20Trader%20API%20Production).

**schwab-client-js** uses environment-based security e.g. it uses a `.env` file to store your security tokens.

[Note: For situtations where using a ```.env```file or environment variables may not be optimal (possibly AWS Lambda, for example), schwab-client-js also supports injecting your security tokens directly e.g. ```const mktclient = new MarketApiClient(appKey,appSecret,appRefresh);```]

1. Create a `.env` file at the root of your project and add the App Key and Secret from your app on developer.schwab.com. Optionally, you can add your callback URL to your .env file like this (for details on creating your `SCHWAB_CALLBACK_URL`, see the [Schwab API Configuration doc](docs/SchwabConfig.md)):

```
SCHWAB_CALLBACK_URL=https://127.0.0.1:5556
SCHWAB_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SCHWAB_SECRET=zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
```

If you don't specify a `SCHWAB_CALLBACK_URL`, I will assume a default value of `https://127.0.0.1:5556`

2. Creating a `SCHWAB_REFRESH_TOKEN`. Run `schwab-authorize` OR `manual-authorize` to help you create the `SCHWAB_REFRESH_TOKEN`. You should be able to run `schwab-authorize` from the root of your project (on MacOS and Linux) by merely typing `schwab-authorize` . On Windows, you'll likely have to run it with node and specify the full path:
   `C:\> node node_modules/schwab-client-js/bin/schwab-authorize.js`
   Same with `manual-authorize`. The script `manual-authorize` is for users who would rather not deal with the self-signed SSL certificate that `schwab-authorize` generates.

See the [Schwab API Configuration doc](docs/SchwabConfig.md) for details about `schwab-authorize` and `manual-authorize`.

3. Your `.env` file should now look like this (as previously mentioned, the `SCHWAB_CALLBACK_URL` is optional and will default to `https://127.0.0.1:5556` if not provided):

```
SCHWAB_CALLBACK_URL=https://127.0.0.1:5556
SCHWAB_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SCHWAB_SECRET=zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
SCHWAB_REFRESH_TOKEN=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

## **Congratulations! You are now ready to make API calls.**

### The `SCHWAB_REFRESH_TOKEN` lasts for seven days. It then expires and you will no longer be able to make API calls. You must run `schwab-authorize` OR `manual-authorize` again to generate a new `SCHWAB_REFRESH_TOKEN` (sorry folks, I don't make these rules).

## Usage Examples

### Developing With schwab-client-js

### **schwab-client-js** uses classes and methods to make it easy to develop apps using the Schwab API. For details, see the [schwab-client-js developer reference guide](docs/DeveloperReference.md)

schwab-client-js has three classes that you use to make API calls, and some helper functions that you can use to help create input parameters. The three classes are:

- `MarketApiClient()` - Get market data
- `TradingApiClient()` - Execute trades and get your personal account and trade-related data
- `StreamingApiClient()` - Stream market data

There are also about 30 helper functions that help you create JSON trade objects and option symbols. See the [schwab-client-js developer reference guide](docs/DeveloperReference.md) for more details

### Getting Market Data (see the [examples directory](examples) for more examples)

```
import { MarketApiClient } from  "schwab-client-js";
const mktclient = new MarketApiClient();

// Get stock information by ticker symbol
const data1 =  await mktclient.quoteById("AMD", "quote,fundamental");
console.log("quoteById DATA=", JSON.stringify(data1));

// Get security information by cusip
const data2 =  await mktclient.instrumentsCusip("023135106");
console.log("instrumentsCusip DATA=", JSON.stringify(data2));

// Get market hours information
const data3 await mktclient.markets("bond,option,forex");
console.log("markets DATA=", JSON.stringify(data3));
```

### Helper Functions For Creating Order Objects And Option Symbols (see the [examples directory](examples) for more examples)

schwab-client-js has various helper functions to make is easier to create order objects and option symbols.

```
// Create a Schwab-formatted option symbol
import { optionSymbol } from "schwab-client-js/orderhelp";
const optsymbol = optionSymbol("XYZ", "210115", "C", "62.50");
// optsymbol is now: "XYZ   210115C00062500"
```

```
// Returns a pre-filled JSON order object for an equity buy-to-cover market order.
import { equityBuyToCoverMarket } from "schwab-client-js/orderhelp";
const orderObj = equityBuyToCoverMarket("TSLA", 38);
console.log(JSON.stringify(orderObj, null, 2));
```

The output is:

```
{
  "orderType": "MARKET",
  "session": "NORMAL",
  "duration": "DAY",
  "orderStrategyType": "SINGLE",
  "orderLegCollection": [
    {
      "instruction": "BUY_TO_COVER",
      "quantity": 38,
      "instrument": {
        "symbol": "TSLA",
        "assetType": "EQUITY"
      }
    }
  ]
}
```

`orderObj` can be used as input to the `placeOrderByAcct()` method as shown in the section below.

### Doing Trades And Fetching Trading Data (see the [examples directory](examples) for more examples)

```
import { TradingApiClient } from  "schwab-client-js";
const trdclient = new TradingApiClient();

// Get your authorized Schwab account numbers and hashed account numbers
const data1 = await trdclient.accountsNumbers();
console.log("accountsNumbers DATA=", JSON.stringify(data1));

// Get orders (all statuses) withing the specified date range
const accountHash="4B9A9B50B7886A574E2A793DFE9B944EA2DAB9"; // Your hashed account number
const fromDate="2024-01-10T12:17:41+02:00";
const toDate="2024-09-10T12:17:41.000Z";
const data2 = await trdclient.ordersByAccount(accountHash, fromDate, toDate);
console.log("ordersByAccount DATA=", JSON.stringify(data2));

// Create a limit order during normal trading hours to buy
// one share of CTRN (Citi Trends Inc) stock for $1 USD.
// You can use the helper functions mentioned in the section
// above to create this object:
// const orderObj = equityBuyLimit("CTRN", 1, "1.00");

const orderObj = {
         "orderType": "LIMIT",
         "session": "NORMAL",
         "duration": "DAY",
         "orderStrategyType": "SINGLE",
         "price": "1.00",
         "orderLegCollection": [
            {
              "instruction": "BUY",
              "quantity": 1,
              "instrument": {
                 "symbol": "CTRN",
                 "assetType": "EQUITY"
              }
            }
         ]
};

// Before placing the order, you can preview the order to see the fees (if any) and status
const accountHash="4B9A9B50B7886A574E2A793DFE9B944EA2DAB9"; // Your hashed account number
const data3 = await trdclient.orderPreview(accountHash, orderObj);
console.log("orderPreview DATA=", JSON.stringify(data3)); // Should return a `trueCommission` section and `status`

// Place the trade using the specified Schwab account
const data4 = await trdclient.placeOrderByAcct(accountHash, orderObj);
console.log("placeOrderByAcct DATA=", JSON.stringify(data4)); // Should return an orderId

// Delete an existing order
const orderID="435234523452345";
const data5 = await trdclient.orderDelete(accountHash, orderId);
console.log("orderDelete DATA=", JSON.stringify(data5)); // Successful deletes return null so this should show no JSON

```

### Streaming (see the [examples directory](examples) for more examples)

- Streaming may not work well outside of normal market hours. Use the `marketById()` or `markets()` calls to get the market hours.

```
import { StreamingApiClient } from  "schwab-client-js";

// Create your streaming client object
const streamclient = new StreamingApiClient();

// Listen for the "open" request
streamclient.streamListen('open', () => {
    console.log("Received open message: webSocket connection opened.");
});

// Listen for messages from Schwab. This is where your data arreves
streamclient.streamListen('message', (message) => {
    console.log("Received data message:", message);
});

// Listen for close
streamclient.streamListen('close', (code, reason) => {
    console.log(`Connection closed: Code=${code}, Reason=${reason}`);
});

// Listen for errors
streamclient.streamListen('error', (error) => {
    console.error("Received error message:", error);
});

// Initialize the stream
await streamclient.streamInit();

// Login to the Schwab stream
await streamclient.streamSchwabLogin();

// Subscribe to some stock prices
let params = { keys: "AMD,TSLA,GOOG", fields: "0,1,2,3,4,5" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_EQUITIES", params);

// Streaming data happens.......

// Close the Schwab stream
await streamclient.streamSchwabLogout()
streamclient.streamClose();
```

## Code Examples

### General Examples

The [trading](examples/trading), [market-data](examples/market-data), and [streaming](examples/streaming) directories contain examples of using most of the API calls.

### Algo-Trading

The [algo-trading folder](examples/algo-trading) contains scripts that conveniently generate many common statistical indicators that you can use in your algo-trading projects. There is also a function `StockList()` which generates a large set of stock symbols and associated data.

### Streaming Dashboards

### The [examples directory](examples) has three different streaming dashboards

- **schwab-dashboard-react** A React-based stock dashboard using [recharts](https://www.npmjs.com/package/recharts)
- **schwab-dashboard-forex** A pure HTML/CSS forex dashboard using [lightweight-charts](https://www.npmjs.com/package/lightweight-charts)
- **schwab-dashboard-nextjs** A NextJS/React/Tailwind stock dashboard using [recharts](https://www.npmjs.com/package/recharts)

<figure>
     <img src="examples/schwab-dashboard-nextjs/public/schwab-dashboard-nextjs.png" alt="Description" width="800">
     <figcaption>schwab-dashboard-nextjs</figcaption>
</figure>

## MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

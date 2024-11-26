// trading.js -- some examples of getting trading data using schwab-client-js
//

import { TradingApiClient } from "schwab-client-js";

const trdclient = new TradingApiClient();

let data = await trdclient.accountsNumbers();
const acctHash = data[0].hashValue; // Grab the account hash for use in our calls
console.log("accountsNumbers DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.transactByAcct(
  acctHash,
  "TRADE",
  "2024-01-10T12:17:41-05:00",
  "2024-09-10T12:17:41.000Z",
);
console.log("transactByAcct DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.ordersByAccount(
  acctHash,
  "2024-08-10T12:17:41+02:00",
  "2024-10-10T12:17:41.000Z",
  "FILLED",
);
console.log("ordersByAccount DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.orderAll(
  "2024-01-10T12:17:41+02:00",
  "2024-09-10T12:17:41.000Z",
  "FILLED",
);
console.log("orderAll DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.prefs();
console.log("prefs DATA=", JSON.stringify(data));
console.log("\n\n");

/*                                                  */
/*  You need to customize this trading object in    */
/*  order to make your own trades.                  */
/*                                                  */

let tradeObj = {
  orderType: "LIMIT",
  session: "NORMAL",
  duration: "DAY",
  orderStrategyType: "SINGLE",
  price: "1.00",
  orderLegCollection: [
    {
      instruction: "BUY",
      quantity: 1,
      instrument: {
        symbol: "CTRN",
        assetType: "EQUITY",
      },
    },
  ],
};

// let data = await trdclient.placeOrderByAcct(acctHash, tradeObj);
// This call will return an orderID which you can use in subsequent
// calls to check status, etc....

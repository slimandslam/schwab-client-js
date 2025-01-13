// trading.js -- some examples of getting trading data using schwab-client-js
//

import { TradingApiClient } from "schwab-client-js";

const trdclient = new TradingApiClient();

let data = await trdclient.accountsNumbers();
// Assuming you have only one authorized Schwab account number,
// we'll grab the first hashed account number to use.
const acctHash = data[0].hashValue; // Grab the account hash for use in our calls
console.log("accountsNumbers DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.transactByAcct(
  acctHash,
  "TRADE",
  "2024-12-10T12:17:41-05:00",
  "2025-01-03T12:17:41.000Z",
);
console.log("transactByAcct DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.ordersByAccount(
  acctHash,
  "2024-12-10T12:17:41+02:00",
  "2024-12-31T12:17:41.000Z",
  "FILLED",
);
console.log("ordersByAccount DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.orderAll(
  "2024-11-10T12:17:41+02:00",
  "2025-01-01T12:17:41.000Z",
  "FILLED",
);
console.log("orderAll DATA=", JSON.stringify(data));
console.log("\n\n");

data = await trdclient.prefs();
console.log("prefs DATA=", JSON.stringify(data));
console.log("\n\n");

/*                                                  */
/*  We use the helper functions to creating a JSON  */
/*  trading object.                                 */
/*                                                  */

console.log("Creating trading object.....");
import { equityBuyLimit } from "schwab-client-js/orderhelp";
let tradeObj = equityBuyLimit("CDT", 1, "0.50");
console.log("Here is your trading object:");
console.log(JSON.stringify(tradeObj, null, 2));

console.log(
  "Edit this file and uncomment the five lines below to make a trade using this trading object and then immediately check the status of the trade.....",
);
// const orderIdObj = await trdclient.placeOrderByAcct(acctHash, tradeObj);
// const orderId = orderIdObj.orderId;
// console.log("ORDERID=", orderId);
// const status = await trdclient.orderById(acctHash, orderId);
// console.log("ORDERSTATUS=", JSON.stringify(status));

// To delete the order:
// let data = await trdclient.orderDelete(acctHash, orderid);
// orderDelete returns null if successful
// You can also login to your account on schwab.com and manually delete orders
//

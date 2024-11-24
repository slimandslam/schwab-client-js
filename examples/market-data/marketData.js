// marketData.js -- lots of examples of getting data using schwab-client-js
//

import { MarketApiClient } from "schwab-client-js";

// function to generate dates for example calls
function getFormattedDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const mktclient = new MarketApiClient();

let data = await mktclient.quoteById("AMD", "quote,fundamental");
console.log("quoteById DATA=", JSON.stringify(data));
console.log("\n\n");

data = await mktclient.quotes("AMD,  TSLA", null, null);
console.log("quotes DATA=", JSON.stringify(data));
console.log("\n\n");

data = await mktclient.expirationChain("TSLA");
console.log("expirationChain DATA=", JSON.stringify(data));
console.log("\n\n");

const fromDate = getFormattedDate();
const toDate = getFormattedDate(2);
let options = {
  contractType: "CALL",
  strategy: "SINGLE",
  strike: 570,
  fromDate: fromDate,
  toDate: toDate,
};
data = await mktclient.chains("SPY", options);
console.log("chains DATA=", JSON.stringify(data));
console.log("\n\n");

data = await mktclient.instrumentsSymbol("AMD", "desc-search");
console.log("instrumentsSymbol DATA=", JSON.stringify(data));
console.log("\n\n");

data = await mktclient.instrumentsCusip("023135106");
console.log("instrumentsCusip DATA=", JSON.stringify(data));
console.log("\n\n");

data = await mktclient.markets("bond,option,forex");
console.log("markets DATA=", JSON.stringify(data));
console.log("\n\n");

const futureDate = getFormattedDate(4);
data = await mktclient.marketById("equity", futureDate);
console.log("marketById DATA=", JSON.stringify(data));
console.log("\n\n");

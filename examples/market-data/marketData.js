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

const fromDate = getFormattedDate(1); // Tommorrow
const toDate = getFormattedDate(7); // A week later
let options = {
  contractType: "CALL",
  strategy: "SINGLE",
  strike: 570,
  fromDate: fromDate,
  toDate: toDate,
};
// You will need to tweak the parameters to make sure this works
// data = await mktclient.chains("SPY", options);
// console.log("chains DATA=", JSON.stringify(data));
// console.log("\n\n");

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

// startDate is Nov 1, 2024  -- milliseconds since the epoch:  1730432440000
// endDate is Nov 25, 2024 -- milliseconds since the epoch:  1732074040000
let params = {
  periodType: "month",
  period: 3,
  frequencyType: "daily",
  startDate: 1730432440000,
  endDate: 1732074040000,
};
data = await mktclient.priceHistory("AMD", params);
console.log("priceHistory DATA=", JSON.stringify(data));
console.log("\n\n");

// Create a Schwab-formatted option symbol
import { optionSymbol } from "schwab-client-js/orderhelp";
const optsymbol = optionSymbol("TSLA", "251121", "C", "300.00");
// TSLA250207C00415000
// optsymbol is now: "TSLA  250207C00415000"
// Fetch info about the options symbol
data = await mktclient.quotes(optsymbol, null, null);
console.log("quotes DATA=", JSON.stringify(data));
console.log("\n\n");

/**
 * @file stocklist.js
 * @fileoverview The function StockList() returns an array containing only the
 * stock information about stock symbols which fit criteria that you define.
 * The stock information is in the output format of the Schwab API quotes() method (see README file).
 *
 * @author Jason Levitt
 *
 * @license MIT License
 *
 * @example
 * const list = await StockList();
 *
 * @returns {Array} - returns a large array of objects. Each object is information about a
 * single stock symbol. See the README file for the object format
 *
 */

import { MarketApiClient } from "schwab-client-js";
import dotenv from "dotenv";

// Get ALPACA credentials
if (!process.env.APCA_API_KEY_ID) throw new Error("Your Alpaca Key was not found.");
if (!process.env.APCA_API_SECRET_KEY) throw new Error("Your Alpaca secret key was not found.");

// ALPACA API URL for data fetching
const ALPACA_PAPER_ENDPOINT = "https://paper-api.alpaca.markets/v2/";

// Get your stock criteria from the stock_config file
dotenv.config({ path: "stock_config" });

const mktclient = new MarketApiClient();

/**
 * Helper function to fetch list of all stock symbols from Alpaca.markets
 *
 * @param {string} The API endpoint to call
 * @returns {object} A JSON object with all ticker synmbols and a bit of related stock data
 *
 */
async function fetchTickerData(thecall) {
  try {
    const response = await fetch(thecall, {
      method: "GET",
      headers: {
        "APCA-API-KEY-ID": process.env.APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.APCA_API_SECRET_KEY,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} message: ${response.message}`);
    }

    const ticker = await response.json();
    return ticker;
  } catch (error) {
    console.error("Error fetching ticker data:", error);
  }
}

/**
 * This function splits the giant JSON object with all the ticker symbols
 * into arrays of 300 symbols each so we can quickly use the Schwab API
 * to return market data on the symbols that it recognizes.
 *
 * @returns {array} An array of arrays of 300 symbols each
 *
 */
function splitStockSymbols(data) {
  const symbols = data.map((stock) => stock.symbol); // Extract symbol values into an array
  const result = [];
  for (let i = 0; i < symbols.length; i += 300) {
    result.push(symbols.slice(i, i + 300));
  }
  return result;
}

/**
 * StockList() - the main routine.
 * Get the list of all stocks from Alpaca and then fetch them from Schwab and filter the results
 * This routine uses the filtering criteria in your `stock_config` file (if any)
 * and returns an array of stock symbols that Schwab recognizes.
 *
 * @returns {Object[]} An array of objects - a filtered list of all the stock data from the quotes() method
 *
 */
export default async function StockList() {
  // Decide whether to include OTC stocks. Note that Schwab charges $6.95 per trade for most OTC stocks
  let include_otc = "";
  if (process.env.INCLUDE_OTC && process.env.INCLUDE_OTC === "true") include_otc = "%2COTC";

  // The URL to fetch all the symbols from Alpaca
  const thecall =
    ALPACA_PAPER_ENDPOINT +
    "assets?asset_class=us_equity&" +
    "exchange=AMEX%2CARCA%2CBATS%2CNYSE%2CNASDAQ%2CNYSEARCA" +
    include_otc;

  if (include_otc !== "") {
    console.log("OTC Stocks are included in the stock list");
  } else {
    console.log("OTC Stocks are not included in the stock list");
  }

  // Upper bound on price per share is PRICE_UPPER if it exists. 999999 otherwise (no upper bound on price per share)
  let price_upper = 999999;
  if (process.env.PRICE_UPPER) price_upper = Number(process.env.PRICE_UPPER);
  console.log("PRICE UPPER BOUND IS SET TO: ", price_upper);

  // Lower bound on price pwer share is PRICE_LOWER if it exists. 0 otherwise (no lower bound on price per share)
  let price_lower = 0;
  if (process.env.PRICE_LOWER) price_lower = Number(process.env.PRICE_LOWER);
  console.log("PRICE LOWER BOUND IS SET TO: ", price_lower);

  // Volume limit is VOLUME_LOWER if it exists. 0 otherwise (all stocks are included)
  let volume_lower = 0;
  if (process.env.VOLUME_LOWER) volume_lower = Number(process.env.VOLUME_LOWER);
  console.log("VOLUME LOWER LIMIT IS SET TO: ", volume_lower);

  // Look for BLACKLIST of symbols to remove
  let blacklist = "";
  if (process.env.BLACKLIST)
    blacklist = process.env.BLACKLIST.split(",").map((item) => item.trim());
  console.log("BLACKLIST entries (if any) are: ", blacklist);

  console.log("Fetching list of symbols from Alpaca...");
  let ticker = await fetchTickerData(thecall);

  console.log("Length of stock list before filtering: ", ticker.length);

  // We can only send 500 ticker symbols per "quotes" call to Schwab
  // But Schwab recommends no more than 300 per call
  // So we split the stock symbols into groups of 300
  const stockChunks = splitStockSymbols(ticker);

  let filteredData = []; // Initialize an empty array to store all JSON objects

  console.log("Fetching Schwab data on ticker symbols....");
  for (const [index, chunk] of stockChunks.entries()) {
    try {
      let data = await mktclient.quotes(chunk); // Returns an object
      const values = Object.values(data); // Convert to an iterable array
      filteredData.push(...values); // Push all stock data into combinedData
    } catch (error) {
      console.log(`Failed processing chunk ${index + 1}:`, error);
    }
  }

  console.log(
    "There were ",
    ticker.length - filteredData.length,
    " symbols that Schwab could not use....",
  );

  // Remove all invalid symbols that Schwab found
  console.log("Removing all symbols that Schwab could not use....");
  filteredData = filteredData.filter((stock) => !("invalidSymbols" in stock));

  // Remove stocks that are labeled as WARRANTS
  console.log("Removing stocks labeled as warrants....");
  filteredData = filteredData.filter((stock) => stock.assetSubType !== "WAR");

  console.log("Removing symbols that do not meet price or volume criteria....");
  // Remove stocks that do not meet PRICE UPPER LIMIT criteria
  filteredData = filteredData.filter((item) => item.quote.closePrice <= price_upper);

  // Remove stocks that do not meet PRICE LOWER LIMIT criteria
  filteredData = filteredData.filter((item) => item.quote.closePrice >= price_lower);

  // Remove stocks that do not meet VOLUME LOWER LIMIT criteria
  filteredData = filteredData.filter((item) => item.quote.totalVolume >= volume_lower);

  // Remove entries on the blacklist
  filteredData = filteredData.filter((item) => !blacklist.includes(item.symbol));

  console.log("Length of stock list after all filtering: ", filteredData.length);

  return filteredData;
}

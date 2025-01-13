import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateSMA(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Float} - A single float rounded to two decimal places
 *
 */
export default async function calculateSMA(symbol, period) {
  if (period > 300 || period <= 1) {
    throw new Error("Period cannot exceed 300 days.");
  }
  const daysAgo = 450; // Minus weekends and holiday this is about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);
  if (period > data.candles.length)
    throw new Error("There is not enough data for this calculation - probably a recent IPO");
  const closingPrices = data.candles.map((candle) => Number(candle.close)); // Extract close prices

  // Extract the last `period` closing prices
  const recentPrices = closingPrices.slice(-period);

  // Calculate the average
  const sma = recentPrices.reduce((sum, price) => sum + price, 0) / period;

  return Number(sma.toFixed(2));
}

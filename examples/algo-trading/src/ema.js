import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateEMA(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Float} - A single floating point value
 *
 */
export default async function calculateEMA(symbol, period) {
  if (period > 300 || period <= 1) {
    throw new Error("Period cannot exceed 300 days.");
  }

  const daysAgo = 450; // Minus weekends and holidays, this is about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;

  // Get historical price data
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params); // Use your market client here
  if (period > data.candles.length)
    throw new Error("There is not enough data for this calculation - probably a recent IPO");
  const closingPrices = data.candles.map((candle) => Number(candle.close)); // Extract close prices

  // Calculate the initial SMA for the first `period`
  const initialSMA = closingPrices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;

  // Calculate the multiplier
  const multiplier = 2 / (period + 1);

  // Initialize EMA with the initial SMA
  let ema = initialSMA;

  // Start EMA calculation from the first data point after the initial SMA period
  for (let i = period; i < closingPrices.length; i++) {
    ema = (closingPrices[i] - ema) * multiplier + ema;
  }

  return Number(ema.toFixed(2)); // Return EMA rounded to 2 decimal places
}

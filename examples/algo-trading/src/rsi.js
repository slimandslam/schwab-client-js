import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateRSI(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Float} - A single float rounded to two decimal places
 *
 */
export default async function calculateRSI(symbol, period) {
  const daysAgo = 450; // Fetch 60 calendar days of data
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startDate = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate };
  const data = await mktclient.priceHistory(symbol, params);

  // Validate that we have enough data
  if (!data.candles || data.candles.length < period + 1) {
    throw new Error("Not enough data to calculate RSI -- maybe it is a recent IPO?");
  }

  // Extract all closing prices
  const closingPrices = data.candles.map((candle) => Number(candle.close));

  // Loop through gains and losses
  // Add gains or losses to the gains or losses arrays
  const gains = [];
  const losses = [];
  for (let i = 1; i < closingPrices.length; i++) {
    const change = closingPrices[i] - closingPrices[i - 1];
    if (change > 0) {
      gains.push(change);
      losses.push(0);
    } else {
      gains.push(0);
      losses.push(-change);
    }
  }

  // Takes the first period days of gains and losses to calculate initial averages.
  // Computes the sum of the first 14 gains/losses and divides by 14 (period).
  const initialGains = gains.slice(0, period).reduce((sum, val) => sum + val, 0);
  const initialLosses = losses.slice(0, period).reduce((sum, val) => sum + val, 0);
  let avgGain = initialGains / period;
  let avgLoss = initialLosses / period;

  // Calculate RSI iteratively for remaining prices
  // Iterates through the remaining gains and losses (starting from the 15th day).
  // Updates the average gain/loss using Wilder’s smoothing formula:
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
  }

  // Calculate relative strength and index
  // If avgLoss === 0, RSI is set to 100 (extremely strong momentum)
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  const rsi = 100 - 100 / (1 + rs);

  return Number(rsi.toFixed(2));
}

import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

// The Moving Average Convergence Divergence (MACD) is a popular technical indicator
// used to identify trend direction, momentum, and potential reversals. It is calculated
// using Exponential Moving Averages (EMAs).

/**
 * calculateMACD(symbol)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @returns {Object} - An object:  { macdLine: <float>, signalLine: <float>, macdHistogram: <float> }
 *
 */
export default async function calculateMACD(symbol) {
  const shortPeriod = 12; // Short-term EMA
  const longPeriod = 26; // Long-term EMA
  const signalPeriod = 9; // Signal Line EMA

  // Fetch historical data
  const daysAgo = 450; // Fetch sufficient data
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startDate = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate };
  const data = await mktclient.priceHistory(symbol, params);

  if (data.candles.length < longPeriod + signalPeriod + 50) {
    throw new Error("Not enough data to calculate MACD.");
  }

  // Extract closing prices
  const closingPrices = data.candles.map((candle) => Number(candle.close));

  // Helper function to calculate EMA from an array of prices
  function calculateEMAFromPrices(prices, period) {
    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period; // Initial SMA
    for (let i = period; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema;
    }
    return ema;
  }

  // Calculate MACD Line
  let shortEMA = calculateEMAFromPrices(closingPrices.slice(0, shortPeriod), shortPeriod);
  let longEMA = calculateEMAFromPrices(closingPrices.slice(0, longPeriod), longPeriod);

  const macdValues = [];
  for (let i = longPeriod; i < closingPrices.length; i++) {
    shortEMA = (closingPrices[i] - shortEMA) * (2 / (shortPeriod + 1)) + shortEMA;
    longEMA = (closingPrices[i] - longEMA) * (2 / (longPeriod + 1)) + longEMA;
    macdValues.push(shortEMA - longEMA);
  }

  const macdLine = macdValues[macdValues.length - 1]; // Most recent MACD Line
  const signalLine = calculateEMAFromPrices(macdValues, signalPeriod); // Signal Line
  const macdHistogram = macdLine - signalLine; // MACD Histogram

  return {
    macdLine: Number(macdLine.toFixed(2)),
    signalLine: Number(signalLine.toFixed(2)),
    macdHistogram: Number(macdHistogram.toFixed(2)),
  };
}

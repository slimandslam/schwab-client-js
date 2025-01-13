import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateAD(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Float} - A single float rounded to two decimal places
 *
 */
export default async function calculateATR(symbol, period) {
  const daysAgo = 450; // Minus weekends and holiday this is about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);

  const prices = data.candles.map((candle) => Number(candle.close));
  const high = data.candles.map((candle) => Number(candle.high));
  const low = data.candles.map((candle) => Number(candle.low));

  if (prices.length < period + 1) {
    throw new Error("Not enough data to calculate ATR.");
  }

  // Extract only the last `period + 1` days of data (to calculate True Range)
  const recentPrices = prices.slice(-period - 1);
  const recentHighs = high.slice(-period - 1);
  const recentLows = low.slice(-period - 1);

  // Calculate True Range (TR) for the requested period
  const trueRanges = [];
  for (let i = 1; i < recentPrices.length; i++) {
    const currentHigh = recentHighs[i];
    const currentLow = recentLows[i];
    const previousClose = recentPrices[i - 1];

    const tr1 = currentHigh - currentLow; // High - Low
    const tr2 = Math.abs(currentHigh - previousClose); // High - Previous Close
    const tr3 = Math.abs(currentLow - previousClose); // Low - Previous Close

    const trueRange = Math.max(tr1, tr2, tr3);
    trueRanges.push(trueRange);
  }

  // Calculate initial ATR as the average of the first `period` TR values
  let atr = trueRanges.slice(0, period).reduce((sum, tr) => sum + tr, 0) / period;

  // Smooth ATR values iteratively
  for (let i = period; i < trueRanges.length; i++) {
    atr = (atr * (period - 1) + trueRanges[i]) / period;
  }

  return Number(atr.toFixed(2)); // Return ATR rounded to 2 decimal places
}

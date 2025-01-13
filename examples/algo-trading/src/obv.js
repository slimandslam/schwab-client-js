import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateOBV(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Array} - An array of floats of size period + 1
 *
 */
export default async function calculateOBV(symbol, period) {
  const daysAgo = 450; // Fetch data for about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);

  // Extract closing prices and volumes
  const closings = data.candles.map((candle) => Number(candle.close));
  const volumes = data.candles.map((candle) => Number(candle.volume));

  if (closings.length < 2) {
    throw new Error("Not enough data to calculate OBV.");
  }

  // Slice data for the last `period` days
  const slicedClosings = closings.slice(-period - 1); // Include one extra day for comparison
  const slicedVolumes = volumes.slice(-period - 1);

  // Initialize OBV
  const obv = [0]; // Start with 0

  // Calculate OBV for the sliced period
  for (let i = 1; i < slicedClosings.length; i++) {
    if (slicedClosings[i] > slicedClosings[i - 1]) {
      obv.push(obv[i - 1] + slicedVolumes[i]);
    } else if (slicedClosings[i] < slicedClosings[i - 1]) {
      obv.push(obv[i - 1] - slicedVolumes[i]);
    } else {
      obv.push(obv[i - 1]); // No change in closing price
    }
  }

  return obv; // OBV values for the specified period
}

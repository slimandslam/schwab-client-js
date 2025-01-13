import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateAD(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Array} - An array of floats of length period
 *
 */
export default async function calculateCCI(symbol, period) {
  const daysAgo = 450; // Fetch data for about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);

  // Extract high, low, and close prices
  const highs = data.candles.map((candle) => Number(candle.high));
  const lows = data.candles.map((candle) => Number(candle.low));
  const closings = data.candles.map((candle) => Number(candle.close));

  if (closings.length < period + 1) {
    throw new Error("Not enough data to calculate CCI.");
  }

  // Calculate Typical Price (TP)
  const typicalPrices = highs.map((high, i) => (high + lows[i] + closings[i]) / 3);

  // Calculate SMA of TP
  const sma = [];
  for (let i = 0; i <= typicalPrices.length - period; i++) {
    const slice = typicalPrices.slice(i, i + period);
    const average = slice.reduce((sum, tp) => sum + tp, 0) / period;
    sma.push(average);
  }

  // Calculate Mean Deviation
  const meanDeviations = [];
  for (let i = 0; i <= typicalPrices.length - period; i++) {
    const slice = typicalPrices.slice(i, i + period);
    const smaValue = sma[i];
    const meanDeviation = slice.reduce((sum, tp) => sum + Math.abs(tp - smaValue), 0) / period;
    meanDeviations.push(meanDeviation);
  }

  // Calculate CCI
  const cci = [];
  for (let i = 0; i < sma.length; i++) {
    const tp = typicalPrices[i + period - 1]; // Most recent TP in the period
    const currentCCI = (tp - sma[i]) / (0.015 * meanDeviations[i]);
    cci.push(currentCCI);
  }

  // Round to two decimal places
  const roundedCCI = cci.map((val) => Number(val.toFixed(2)));

  return roundedCCI.slice(-period);
}

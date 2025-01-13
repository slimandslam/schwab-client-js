import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateAD(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Array} - An array of floats or length period
 *
 */
export default async function calculateAD(symbol, period) {
  const daysAgo = 450; // Minus weekends and holiday this is about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);

  const closings = data.candles.map((candle) => Number(candle.close));
  const highs = data.candles.map((candle) => Number(candle.high));
  const lows = data.candles.map((candle) => Number(candle.low));
  const volumes = data.candles.map((candle) => Number(candle.volume));

  if (closings.length < period + 1) {
    throw new Error("Not enough data to calculate AD.");
  }

  // Initialize AD Line calculation
  const adLine = [];
  let previousAD = 0;

  for (let i = 0; i < closings.length; i++) {
    const high = highs[i];
    const low = lows[i];
    const close = closings[i];
    const volume = volumes[i];

    if (high === low) {
      // Avoid division by zero in the MFM calculation
      adLine.push(previousAD);
      continue;
    }

    // Calculate Money Flow Multiplier (MFM)
    const mfm = (close - low - (high - close)) / (high - low);

    // Calculate Money Flow Volume (MFV)
    const mfv = mfm * volume;

    // Calculate current AD Line value
    const currentAD = previousAD + mfv;
    adLine.push(Number(currentAD.toFixed(2)));

    // Update previous AD value
    previousAD = currentAD;
  }

  // Return the most recent AD value or the entire series if desired
  return adLine.slice(-period);
}

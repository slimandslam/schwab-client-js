import { MarketApiClient } from "schwab-client-js";

const mktclient = new MarketApiClient();

/**
 * calculateADX(symbol, period)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @param {Integer} period -  A positive integer greater than 0
 * @returns {Array} - An array of floats of length period
 *
 */
export default async function calculateADX(symbol, period) {
  const daysAgo = 450; // Fetch data for about 300 business days
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const date300MktDaysAgo = Date.now() - daysAgo * millisecondsPerDay;
  const params = { periodType: "year", frequencyType: "daily", startDate: date300MktDaysAgo };
  const data = await mktclient.priceHistory(symbol, params);

  // Extract data
  const closings = data.candles.map((candle) => Number(candle.close));
  const highs = data.candles.map((candle) => Number(candle.high));
  const lows = data.candles.map((candle) => Number(candle.low));

  if (closings.length < period + 1) {
    throw new Error("Not enough data to calculate ADX.");
  }

  // Initialize arrays
  const tr = []; // True Range
  const plusDM = []; // Positive Directional Movement
  const minusDM = []; // Negative Directional Movement

  // Calculate TR, +DM, and -DM
  for (let i = 1; i < closings.length; i++) {
    const currentHigh = highs[i];
    const currentLow = lows[i];
    const prevClose = closings[i - 1];
    const prevHigh = highs[i - 1];
    const prevLow = lows[i - 1];

    // True Range
    const range1 = currentHigh - currentLow;
    const range2 = Math.abs(currentHigh - prevClose);
    const range3 = Math.abs(currentLow - prevClose);
    tr.push(Math.max(range1, range2, range3));

    // Positive DM
    const upMove = currentHigh - prevHigh;
    const downMove = prevLow - currentLow;
    plusDM.push(upMove > downMove && upMove > 0 ? upMove : 0);

    // Negative DM
    minusDM.push(downMove > upMove && downMove > 0 ? downMove : 0);
  }

  // Smooth TR, +DM, and -DM using Wilder's smoothing
  const smoothedTR = [tr.slice(0, period).reduce((sum, val) => sum + val, 0)];
  const smoothedPlusDM = [plusDM.slice(0, period).reduce((sum, val) => sum + val, 0)];
  const smoothedMinusDM = [minusDM.slice(0, period).reduce((sum, val) => sum + val, 0)];

  for (let i = period; i < tr.length; i++) {
    smoothedTR.push((smoothedTR[smoothedTR.length - 1] * (period - 1) + tr[i]) / period);
    smoothedPlusDM.push(
      (smoothedPlusDM[smoothedPlusDM.length - 1] * (period - 1) + plusDM[i]) / period,
    );
    smoothedMinusDM.push(
      (smoothedMinusDM[smoothedMinusDM.length - 1] * (period - 1) + minusDM[i]) / period,
    );
  }

  // Calculate +DI and -DI
  const plusDI = smoothedPlusDM.map((val, i) => (val / smoothedTR[i]) * 100);
  const minusDI = smoothedMinusDM.map((val, i) => (val / smoothedTR[i]) * 100);

  // Calculate DX
  const dx = plusDI.map(
    (val, i) => (Math.abs(plusDI[i] - minusDI[i]) / (plusDI[i] + minusDI[i])) * 100,
  );

  // Smooth DX to calculate ADX
  const adx = [dx.slice(0, period).reduce((sum, val) => sum + val, 0) / period];
  for (let i = period; i < dx.length; i++) {
    adx.push((adx[adx.length - 1] * (period - 1) + dx[i]) / period);
  }

  // Round to two decimal places
  const roundedADX = adx.map((val) => Number(val.toFixed(2)));

  return roundedADX.slice(-period);
}

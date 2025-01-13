import calculateSMA from "./sma.js";

// Detect Golden Cross or Death Cross
// A Golden Cross occurs when the short-term moving average (e.g., 50-day SMA)
// crosses above the long-term moving average (e.g., 200-day S0MA).
// Bullish Signal: Indicates that the market may be entering an uptrend or
// a period of sustained price increases.
// This happens because short-term momentum (reflected by the shorter SMA)
// is overtaking longer-term momentum (reflected by the longer SMA).
// A Death Cross occurs when the short-term moving average crosses below
// the long-term moving average.
// Bearish Signal: Indicates that the market may be entering a downtrend or a
// period of sustained price declines.
// This happens because short-term momentum is weakening relative to the longer-term trend.
/**
 * detectCross(symbol)
 *
 * @param {String} symbol - A valid uppercase stock symbol
 * @returns {Object} - An object: { signal: 'G' | 'D' | 'N', shortTermSMA: <float>, longTermSMA: <float> }
 * 'G' means there is a Golden Cross. 'D' means that a Death Cross occurs. 'N' means neither occurred.
 */
export default async function detectCross(symbol) {
  const shortTermPeriod = 50; // Short-term moving average (e.g., 50-day SMA)
  const longTermPeriod = 200; // Long-term moving average (e.g., 200-day SMA)

  // Calculate SMAs for the symbol
  const shortTermSMA = await calculateSMA(symbol, shortTermPeriod);
  const longTermSMA = await calculateSMA(symbol, longTermPeriod);

  // Determine the crossover signal
  let signal = "N"; // Default signal - No Cross Detected

  if (shortTermSMA > longTermSMA) {
    signal = "G"; // Golden cross -- bullish signal
  } else if (shortTermSMA < longTermSMA) {
    signal = "D"; // Death cross -- bearish Signal
  }

  return {
    signal,
    shortTermSMA: shortTermSMA,
    longTermSMA: longTermSMA,
  };
}

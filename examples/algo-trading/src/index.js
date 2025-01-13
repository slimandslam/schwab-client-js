// This file exists merely to show an example of calculating
// each indicator.

import StockList from "./stocklist.js";
import calculateOBV from "./obv.js";
import calculateCCI from "./cci.js";
import calculateADX from "./adx.js";
import calculateAD from "./ad.js";
import calculateATR from "./atr.js";
import calculateMACD from "./macd.js";
import detectCross from "./cross.js";
import calculateRSI from "./rsi.js";
import calculateEMA from "./ema.js";
import calculateSMA from "./sma.js";

// StockList() typically takes from 8 to 40 seconds to execute,
// depending on how your filtering options. So it is commented
// out here. It also tends to generate 10-15mbytes of data.
/*
const giantFilteredListOfStocks = await StockList();
for (const stock of giantFilteredListOfStocks) {
  // Do Something
  console.log(JSON.stringify(stock, null, 2));
}
*/

const obv = await calculateOBV("TSLA", 14);
console.log("OBV:", obv);

const cci = await calculateCCI("TSLA", 14);
console.log("CCI:", cci);

const adx = await calculateADX("TSLA", 14);
console.log("ADX:", adx);

const ad = await calculateAD("TSLA", 14);
console.log("AD:", ad);

const atr = await calculateATR("TSLA", 14);
console.log("ATR:", atr);

const macd = await calculateMACD("TSLA");
console.log("MACD=", macd);

const cross = await detectCross("TSLA");
console.log("CROSS=", cross);

const rsi = await calculateRSI("TSLA", 14);
console.log("Latest RSI:", rsi);

const ema = await calculateEMA("TSLA", 30);
console.log("EMA=", ema);

const sma = await calculateSMA("TSLA", 30);
console.log("SMA=", sma);

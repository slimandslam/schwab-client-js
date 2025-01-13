# Algorithimic Trading Building Blocks

This example has a lot of scripts that generate common statistical indicators used in algorithmic trading. I use the schwab-client-js library to fetch historical data so that the indicators can be generated. There is also a script to generate a current list of Schwab-recognized stock symbols that you can then use to make trading decisions.

## Getting Started

**Software prerequisites: nodejs version 18 or newer and a node package manager like yarn or npm**

```
npm install

or

yarn
```

You'll need to create the `.env` file as described in the schwab-client-js instructions.

## Usage

```
yarn dev

or

npm run dev
```

## The Indicators You Can Generate

The following indicators can be generated. The `symbol` is a string containing the stock symbol in all uppercase. The `period` is a positive integer representing the number of days for the calculation.
Some of these functions return single numbers and some return arrays.

Note that `StockList()` generates a large array of objects where each object is a symbol and lots of data points that you can use.

| File             | Parameters                     | Description                                                                                                                                                                                                     |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **stocklist.js** | `StockList()`                  | Retrieves a list of all stock symbols (configurable), removes the symbols that Schwab does not recognize, and returns the list with a large set of useful data points for each symbol. For more info, see below |
| **ad.js**        | `calulateAD(symbol, period)`   | Computes the Accumulation/Distribution Line (AD) to measure buying/selling pressure.                                                                                                                            |
| **atr.js**       | `calculateATR(symbol, period)` | Calculates the Average True Range (ATR) to measure market volatility over a specified period.                                                                                                                   |
| **cross.js**     | `detectCross(symbol)`          | Detects crossovers between two data series. Determines whether "Golden Cross", "Death Cross", or Neither occur.                                                                                                 |
| **obv.js**       | `calculateOBV(symbol, period)` | Computes the On-Balance Volume (OBV) to track volume flow based on price direction.                                                                                                                             |
| **sma.js**       | `calculateSMA(symbol, period)` | Calculates the Simple Moving Average (SMA).                                                                                                                                                                     |
| **ema.js**       | `calculateEMA(symbol, period)` | Calculates the Exponential Moving Average (EMA) for emphasizing recent price movements.                                                                                                                         |
| **adx.js**       | `calculateADX(symbol, period)` | Calculates the Average Directional Index (ADX) to measure trend strength.                                                                                                                                       |
| **cci.js**       | `calculateCCI(symbol, period)` | Computes the Commodity Channel Index (CCI) to identify overbought or oversold conditions.                                                                                                                       |
| **macd.js**      | `calculateMACD(symbol)`        | Calculates the Moving Average Convergence Divergence (MACD) to identify momentum and trends.                                                                                                                    |
| **rsi.js**       | `calculateRSI(symbol, period)` | Computes the Relative Strength Index (RSI) to measure price momentum and identify extremes.                                                                                                                     |

## stocklist.js

`stocklist.js` generates a giant list of stock symbols with accompanying statistical data. To use it, you need to get a free account at [Alpaca](https://alpaca.markets). Add your Alpaca keys to the usual `.env` file:

```
APCA_API_KEY_ID=PKOXXXXXX93JL
APCA_API_SECRET_KEY=78OtXXXXXXYTYReJd
SCHWAB_APP_KEY=t9yFXXXXXXXXM7tMghA
SCHWAB_SECRET=Cf9aXXXXXXXXXXXXXnkDu
SCHWAB_REFRESH_TOKEN=fEug3XZXZXZXZXZXZXXZL5uUNZ6JBeKCRsqLA@
```

Here's what `stocklist.js` does:

1. I get a giant list of ticker symbols (combined AMEX ARCA BATS NYSE NASDAQ NYSEARCA OTC exchanges). It's about 38,000 symbols including OTC stocks, and about 13,800 without OTC stocks. The call I use to fetch the stock symbols is [documented here](https://docs.alpaca.markets/reference/get-v2-assets-1)
2. I take all the stock symbols from the returned list and I feed them to the Schwab quotes() API call. The quotes() API flags any symbol it cannot trade with. I remove those symbols.
3. Now we have a large list of symbols with data that Schwab can trade.
4. I filter by upper and lower price bounds (user definable) on the last closing price. For example, you might only want to include stocks costing less than $10 but more than $1.
5. I filter by Volume (user definable). You can ensure that only stocks that have a trading volume of at least nnnnnn are included
6. You can define a blacklist of symbols that you don't want to include for some reason.
7. The result is a giant array of analytic data (from the last closing day) for each ticker symbol.
8. It can take anywhere from 8-40 seconds to run `StockList()`

## Stock config file

There is a file named `stock_config` that is in dotenv() format. I use
it to filter the results so you only get stocks that fit the criteria
you define.

```
# Do not include stocks with a closing price greater than PRICE_UPPER
PRICE_UPPER=10
# Do not include stocks with a closing price less than PRICE_LOWER
PRICE_LOWER=.50
# Do not include stocks with a total volume on last market day of less than VOLUME_LOWER
VOLUME_LOWER=0
# Do not include stocks on the BLACKLIST
BLACKLIST=AMZN,AMD,TSLA
# Include trades of OTC stocks -- NOTE: Schwab charges $6.95 per trade for OTC stocks
INCLUDE_OTC=false
```

## Data Structures Returned

There is some info in the Alpaca data that I am ignoring but which you might choose to use. For each symbol, you get:

```
{
"id": "03fb07bb-5db1-4077-8dea-5d711b272625",
"class": "us_equity",
"exchange": "NASDAQ",
"symbol": "AMD",
"name": "Advanced Micro Devices, Inc. Common Stock",
"status": "active",
"tradable": true,
"marginable": true,
"maintenance_margin_requirement": 30,
"margin_requirement_long": "30",
"margin_requirement_short": "30",
"shortable": true,
"easy_to_borrow": true,
"fractionable": true,
"attributes": [
  "fractional_eh_enabled",
  "has_options"
 ]
}
```

I'm only using the "symbol" from each entry. You could refer back to the information if you want.

In the final array, each symbol has this information with it:

```
{
	"assetMainType": "EQUITY",
	"assetSubType": "COE",
	"quoteType": "NBBO",
	"realtime": true,
	"ssid": 1449199007,
	"symbol": "AMD",
	"extended": {
		"askPrice": 0,
		"askSize": 0,
		"bidPrice": 0,
		"bidSize": 0,
		"lastPrice": 119.57,
		"lastSize": 1,
		"mark": 0,
		"quoteTime": 1736499600000,
		"totalVolume": 0,
		"tradeTime": 1736499595000
	},
	"fundamental": {
		"avg10DaysVolume": 34860299,
		"avg1YearVolume": 52675474,
		"divAmount": 0,
		"divFreq": 0,
		"divPayAmount": 0,
		"divYield": 0,
		"eps": 0.52912,
		"fundLeverageFactor": 0,
		"lastEarningsDate": "2024-10-29T04:00:00Z",
		"peRatio": 107.99408
	},
	"quote": {
		"52WeekHigh": 227.3,
		"52WeekLow": 114.4501,
		"askMICId": "XNAS",
		"askPrice": 115.6,
		"askSize": 1,
		"askTime": 1736557198826,
		"bidMICId": "MEMX",
		"bidPrice": 115.59,
		"bidSize": 1,
		"bidTime": 1736557198797,
		"closePrice": 121.84,
		"highPrice": 118.71,
		"lastMICId": "XADF",
		"lastPrice": 115.6,
		"lastSize": 1,
		"lowPrice": 114.4501,
		"mark": 115.6,
		"markChange": -6.24,
		"markPercentChange": -5.12147078,
		"netChange": -6.24,
		"netPercentChange": -5.12147078,
		"openPrice": 118.18,
		"postMarketChange": -0.44,
		"postMarketPercentChange": -0.37917959,
		"quoteTime": 1736557198826,
		"securityStatus": "Normal",
		"totalVolume": 59415614,
		"tradeTime": 1736557199347
	},
	"reference": {
		"cusip": "007903107",
		"description": "Advanced Micro Devic",
		"exchange": "Q",
		"exchangeName": "NASDAQ",
		"isHardToBorrow": false,
		"isShortable": true,
		"htbRate": 0
	},
	"regular": {
		"regularMarketLastPrice": 116.04,
		"regularMarketLastSize": 600,
		"regularMarketNetChange": -5.8,
		"regularMarketPercentChange": -4.76034143,
		"regularMarketTradeTime": 1736542800285
	}
}
```

## MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

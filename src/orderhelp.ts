/**
 * @file orderhelp.ts
 * @author Jason Levitt
 * @license MIT
 *
 * @description Provides helper methods to create JSON order objects for input
 * into Schwab API trading functions.
 *
 * These functions are based on the Python helper functions created by Alex Golec which
 * are documented here:  https://schwab-py.readthedocs.io/en/latest/order-templates.html
 *
 * @example
 * import { equityBuyToCoverLimit } from "schwab-client-js/orderhelp";
 * const trade = equityBuyToCoverLimit("AMD", 3, "55.33");
 *
 */

export {
  optionSymbol,
  equityBuyLimit,
  equityBuyMarket,
  equitySellMarket,
  equitySellLimit,
  equitySellShortMarket,
  equitySellShortLimit,
  equityBuyToCoverMarket,
  equityBuyToCoverLimit,
  optionBuyToOpenMarket,
  optionBuyToOpenLimit,
  optionSellToOpenMarket,
  optionSellToOpenLimit,
  optionBuyToCloseMarket,
  optionBuyToCloseLimit,
  optionSellToCloseMarket,
  optionSellToCloseLimit,
  bullCallVerticalOpen,
  bullCallVerticalClose,
  bullPutVerticalOpen,
  bullPutVerticalClose,
  bearCallVerticalOpen,
  bearCallVerticalClose,
  bearPutVerticalClose,
  bearPutVerticalOpen,
  oneCancelsOther,
  firstTriggersSecond,
};

// Define reusable types and interfaces
type OrderType =
  | "MARKET"
  | "LIMIT"
  | "STOP"
  | "STOP_LIMIT"
  | "TRAILING_STOP"
  | "CABINET"
  | "NON_MARKETABLE"
  | "MARKET_ON_CLOSE"
  | "EXERCISE"
  | "TRAILING_STOP_LIMIT"
  | "NET_DEBIT"
  | "NET_CREDIT"
  | "NET_ZERO"
  | "LIMIT_ON_CLOSE";
type SessionType = "NORMAL" | "AM" | "PM" | "SEAMLESS";
type DurationType =
  | "DAY"
  | "GOOD_TILL_CANCEL"
  | "FILL_OR_KILL"
  | "IMMEDIATE_OR_CANCEL"
  | "END_OF_WEEK"
  | "END_OF_MONTH"
  | "NEXT_END_OF_MONTH"
  | "UNKNOWN";
type OrderStrategyType =
  | "SINGLE"
  | "CANCEL"
  | "RECALL"
  | "PAIR"
  | "FLATTEN"
  | "TWO_DAY_SWAP"
  | "BLAST_ALL"
  | "OCO"
  | "TRIGGER";
type ComplexOrderStrategyType =
  | "NONE"
  | "COVERED"
  | "VERTICAL"
  | "BACK_RATIO"
  | "CALENDAR"
  | "DIAGONAL"
  | "STRADDLE"
  | "STRANGLE"
  | "COLLAR_SYNTHETIC"
  | "BUTTERFLY"
  | "CONDOR"
  | "IRON_CONDOR"
  | "VERTICAL_ROLL"
  | "COLLAR_WITH_STOCK"
  | "DOUBLE_DIAGONAL"
  | "UNBALANCED_BUTTERFLY"
  | "UNBALANCED_CONDOR"
  | "UNBALANCED_IRON_CONDOR"
  | "UNBALANCED_VERTICAL_ROLL"
  | "MUTUAL_FUND_SWAP"
  | "CUSTOM";
type InstructionType =
  | "BUY"
  | "SELL"
  | "BUY_TO_COVER"
  | "SELL_SHORT"
  | "BUY_TO_OPEN"
  | "BUY_TO_CLOSE"
  | "SELL_TO_OPEN"
  | "SELL_TO_CLOSE"
  | "EXCHANGE"
  | "SELL_SHORT_EXEMPT";
type AssetType = "EQUITY" | "OPTION";

interface Instrument {
  symbol: string;
  assetType: AssetType;
}

interface OrderLeg {
  instruction: InstructionType;
  quantity: number;
  instrument: Instrument;
}

interface Order {
  orderType: OrderType;
  session: SessionType;
  duration: DurationType;
  orderStrategyType: OrderStrategyType;
  complexOrderStrategyType?: ComplexOrderStrategyType;
  quantity?: number;
  price?: string;
  orderLegCollection: OrderLeg[];
  childOrderStrategies?: Order[];
}

interface CompositeOrder {
  orderStrategyType: "OCO" | "TRIGGER";
  childOrderStrategies: Order[];
}

// Function implementations

function optionSymbol(
  symbol: string,
  expirationDate: string,
  contractType: "C" | "P",
  strikePrice: string,
): string {
  if (!/^\d{6}$/.test(expirationDate)) {
    throw new Error("Expiration date must be in 'YYMMDD' format.");
  }

  const year = parseInt(expirationDate.slice(0, 2), 10);
  const month = parseInt(expirationDate.slice(2, 4), 10);
  const day = parseInt(expirationDate.slice(4, 6), 10);

  if (year < 0 || year > 99) {
    throw new Error("Year must be a two-digit number between 00 and 99.");
  }
  if (month < 1 || month > 12) {
    throw new Error("Month must be a number between 01 and 12.");
  }
  if (day < 1 || day > 31) {
    throw new Error("Day must be a number between 01 and 31.");
  }

  const upperType = contractType.toUpperCase();
  if (upperType !== "C" && upperType !== "P") {
    throw new Error("Contract type must be 'C' or 'P'");
  }

  const parsedPrice = parseFloat(strikePrice);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    throw new Error("Strike price must be a positive number.");
  }
  const formattedStrikePrice = (parsedPrice * 1000).toString().padStart(8, "0");
  const paddedSymbol = symbol.padEnd(6, " ");

  return `${paddedSymbol}${expirationDate}${contractType}${formattedStrikePrice}`;
}

function equityBuyLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
    price,
  };
}

function equityBuyMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
  };
}

function equitySellMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
  };
}

function equitySellLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
    price,
  };
}

function equitySellShortMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_SHORT",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
  };
}

function equitySellShortLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_SHORT",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
    price,
  };
}

function equityBuyToCoverMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_COVER",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
  };
}

function equityBuyToCoverLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_COVER",
        quantity,
        instrument: { symbol, assetType: "EQUITY" },
      },
    ],
    price,
  };
}

function optionBuyToOpenMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
  };
}

function optionBuyToOpenLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
    price,
  };
}

function optionSellToOpenMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
  };
}

function optionSellToOpenLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
    price,
  };
}

function optionBuyToCloseMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
  };
}

function optionBuyToCloseLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
    price,
  };
}

function optionSellToCloseMarket(symbol: string, quantity: number): Order {
  return {
    orderType: "MARKET",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
  };
}

function optionSellToCloseLimit(
  symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    orderType: "LIMIT",
    session: "NORMAL",
    duration: "DAY",
    orderStrategyType: "SINGLE",
    orderLegCollection: [
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol, assetType: "OPTION" },
      },
    ],
    price,
  };
}

function bullCallVerticalOpen(
  long_symbol: string,
  short_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_DEBIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol: long_symbol, assetType: "OPTION" },
      },
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol: short_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bullCallVerticalClose(
  short_symbol: string,
  long_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_DEBIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol: short_symbol, assetType: "OPTION" },
      },
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol: long_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bullPutVerticalOpen(
  long_put_symbol: string,
  short_put_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_CREDIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol: long_put_symbol, assetType: "OPTION" },
      },
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol: short_put_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bullPutVerticalClose(
  long_put_symbol: string,
  short_put_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_DEBIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol: long_put_symbol, assetType: "OPTION" },
      },
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol: short_put_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bearCallVerticalOpen(
  short_symbol: string,
  long_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_CREDIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol: short_symbol, assetType: "OPTION" },
      },
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol: long_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bearCallVerticalClose(
  symbol1: string,
  symbol2: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_DEBIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol: symbol1, assetType: "OPTION" },
      },
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol: symbol2, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bearPutVerticalClose(
  short_put_symbol: string,
  long_put_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_CREDIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "BUY_TO_CLOSE",
        quantity,
        instrument: { symbol: short_put_symbol, assetType: "OPTION" },
      },
      {
        instruction: "SELL_TO_CLOSE",
        quantity,
        instrument: { symbol: long_put_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function bearPutVerticalOpen(
  short_put_symbol: string,
  long_put_symbol: string,
  quantity: number,
  price: string,
): Order {
  return {
    session: "NORMAL",
    duration: "DAY",
    orderType: "NET_DEBIT",
    complexOrderStrategyType: "VERTICAL",
    quantity,
    price: price.toString(),
    orderLegCollection: [
      {
        instruction: "SELL_TO_OPEN",
        quantity,
        instrument: { symbol: short_put_symbol, assetType: "OPTION" },
      },
      {
        instruction: "BUY_TO_OPEN",
        quantity,
        instrument: { symbol: long_put_symbol, assetType: "OPTION" },
      },
    ],
    orderStrategyType: "SINGLE",
  };
}

function oneCancelsOther(
  primaryOrder: Order,
  secondaryOrder: Order,
): CompositeOrder {
  return {
    orderStrategyType: "OCO",
    childOrderStrategies: [
      {
        ...primaryOrder,
        orderStrategyType: "TRIGGER",
        childOrderStrategies: [
          {
            ...secondaryOrder,
            orderStrategyType: "SINGLE",
          },
        ],
      },
      {
        ...secondaryOrder,
        orderStrategyType: "SINGLE",
      },
    ],
  };
}

function firstTriggersSecond(
  primaryOrder: Order,
  secondaryOrder: Order,
): CompositeOrder {
  return {
    ...primaryOrder, // Spread primaryOrder into the root object
    orderStrategyType: "TRIGGER", // Override the root strategy type to TRIGGER
    childOrderStrategies: [
      {
        ...secondaryOrder, // Add secondaryOrder to child strategies
      },
    ],
  };
}

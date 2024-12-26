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
export { optionSymbol, equityBuyLimit, equityBuyMarket, equitySellMarket, equitySellLimit, equitySellShortMarket, equitySellShortLimit, equityBuyToCoverMarket, equityBuyToCoverLimit, optionBuyToOpenMarket, optionBuyToOpenLimit, optionSellToOpenMarket, optionSellToOpenLimit, optionBuyToCloseMarket, optionBuyToCloseLimit, optionSellToCloseMarket, optionSellToCloseLimit, bullCallVerticalOpen, bullCallVerticalClose, bullPutVerticalOpen, bullPutVerticalClose, bearCallVerticalOpen, bearCallVerticalClose, bearPutVerticalClose, bearPutVerticalOpen, oneCancelsOther, firstTriggersSecond, };
// Function implementations
function optionSymbol(symbol, expirationDate, contractType, strikePrice) {
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
function equityBuyLimit(symbol, quantity, price) {
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
function equityBuyMarket(symbol, quantity) {
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
function equitySellMarket(symbol, quantity) {
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
function equitySellLimit(symbol, quantity, price) {
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
function equitySellShortMarket(symbol, quantity) {
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
function equitySellShortLimit(symbol, quantity, price) {
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
function equityBuyToCoverMarket(symbol, quantity) {
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
function equityBuyToCoverLimit(symbol, quantity, price) {
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
function optionBuyToOpenMarket(symbol, quantity) {
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
function optionBuyToOpenLimit(symbol, quantity, price) {
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
function optionSellToOpenMarket(symbol, quantity) {
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
function optionSellToOpenLimit(symbol, quantity, price) {
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
function optionBuyToCloseMarket(symbol, quantity) {
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
function optionBuyToCloseLimit(symbol, quantity, price) {
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
function optionSellToCloseMarket(symbol, quantity) {
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
function optionSellToCloseLimit(symbol, quantity, price) {
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
function bullCallVerticalOpen(long_symbol, short_symbol, quantity, price) {
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
function bullCallVerticalClose(short_symbol, long_symbol, quantity, price) {
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
function bullPutVerticalOpen(long_put_symbol, short_put_symbol, quantity, price) {
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
function bullPutVerticalClose(long_put_symbol, short_put_symbol, quantity, price) {
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
function bearCallVerticalOpen(short_symbol, long_symbol, quantity, price) {
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
function bearCallVerticalClose(symbol1, symbol2, quantity, price) {
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
function bearPutVerticalClose(short_put_symbol, long_put_symbol, quantity, price) {
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
function bearPutVerticalOpen(short_put_symbol, long_put_symbol, quantity, price) {
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
function oneCancelsOther(primaryOrder, secondaryOrder) {
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
function firstTriggersSecond(primaryOrder, secondaryOrder) {
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
//# sourceMappingURL=orderhelp.js.map
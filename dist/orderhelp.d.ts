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
type OrderType = "MARKET" | "LIMIT" | "STOP" | "STOP_LIMIT" | "TRAILING_STOP" | "CABINET" | "NON_MARKETABLE" | "MARKET_ON_CLOSE" | "EXERCISE" | "TRAILING_STOP_LIMIT" | "NET_DEBIT" | "NET_CREDIT" | "NET_ZERO" | "LIMIT_ON_CLOSE";
type SessionType = "NORMAL" | "AM" | "PM" | "SEAMLESS";
type DurationType = "DAY" | "GOOD_TILL_CANCEL" | "FILL_OR_KILL" | "IMMEDIATE_OR_CANCEL" | "END_OF_WEEK" | "END_OF_MONTH" | "NEXT_END_OF_MONTH" | "UNKNOWN";
type OrderStrategyType = "SINGLE" | "CANCEL" | "RECALL" | "PAIR" | "FLATTEN" | "TWO_DAY_SWAP" | "BLAST_ALL" | "OCO" | "TRIGGER";
type ComplexOrderStrategyType = "NONE" | "COVERED" | "VERTICAL" | "BACK_RATIO" | "CALENDAR" | "DIAGONAL" | "STRADDLE" | "STRANGLE" | "COLLAR_SYNTHETIC" | "BUTTERFLY" | "CONDOR" | "IRON_CONDOR" | "VERTICAL_ROLL" | "COLLAR_WITH_STOCK" | "DOUBLE_DIAGONAL" | "UNBALANCED_BUTTERFLY" | "UNBALANCED_CONDOR" | "UNBALANCED_IRON_CONDOR" | "UNBALANCED_VERTICAL_ROLL" | "MUTUAL_FUND_SWAP" | "CUSTOM";
type InstructionType = "BUY" | "SELL" | "BUY_TO_COVER" | "SELL_SHORT" | "BUY_TO_OPEN" | "BUY_TO_CLOSE" | "SELL_TO_OPEN" | "SELL_TO_CLOSE" | "EXCHANGE" | "SELL_SHORT_EXEMPT";
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
declare function optionSymbol(symbol: string, expirationDate: string, contractType: "C" | "P", strikePrice: string): string;
declare function equityBuyLimit(symbol: string, quantity: number, price: string): Order;
declare function equityBuyMarket(symbol: string, quantity: number): Order;
declare function equitySellMarket(symbol: string, quantity: number): Order;
declare function equitySellLimit(symbol: string, quantity: number, price: string): Order;
declare function equitySellShortMarket(symbol: string, quantity: number): Order;
declare function equitySellShortLimit(symbol: string, quantity: number, price: string): Order;
declare function equityBuyToCoverMarket(symbol: string, quantity: number): Order;
declare function equityBuyToCoverLimit(symbol: string, quantity: number, price: string): Order;
declare function optionBuyToOpenMarket(symbol: string, quantity: number): Order;
declare function optionBuyToOpenLimit(symbol: string, quantity: number, price: string): Order;
declare function optionSellToOpenMarket(symbol: string, quantity: number): Order;
declare function optionSellToOpenLimit(symbol: string, quantity: number, price: string): Order;
declare function optionBuyToCloseMarket(symbol: string, quantity: number): Order;
declare function optionBuyToCloseLimit(symbol: string, quantity: number, price: string): Order;
declare function optionSellToCloseMarket(symbol: string, quantity: number): Order;
declare function optionSellToCloseLimit(symbol: string, quantity: number, price: string): Order;
declare function bullCallVerticalOpen(long_symbol: string, short_symbol: string, quantity: number, price: string): Order;
declare function bullCallVerticalClose(short_symbol: string, long_symbol: string, quantity: number, price: string): Order;
declare function bullPutVerticalOpen(long_put_symbol: string, short_put_symbol: string, quantity: number, price: string): Order;
declare function bullPutVerticalClose(long_put_symbol: string, short_put_symbol: string, quantity: number, price: string): Order;
declare function bearCallVerticalOpen(short_symbol: string, long_symbol: string, quantity: number, price: string): Order;
declare function bearCallVerticalClose(symbol1: string, symbol2: string, quantity: number, price: string): Order;
declare function bearPutVerticalClose(short_put_symbol: string, long_put_symbol: string, quantity: number, price: string): Order;
declare function bearPutVerticalOpen(short_put_symbol: string, long_put_symbol: string, quantity: number, price: string): Order;
declare function oneCancelsOther(primaryOrder: Order, secondaryOrder: Order): CompositeOrder;
declare function firstTriggersSecond(primaryOrder: Order, secondaryOrder: Order): CompositeOrder;
//# sourceMappingURL=orderhelp.d.ts.map
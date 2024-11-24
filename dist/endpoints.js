const endpoint = {
    ACCTDETAILS: (accthash) => `https://api.schwabapi.com/trader/v1/accounts/${accthash}`,
    ACCTLIST: "https://api.schwabapi.com/trader/v1/accounts/",
    ACCTNUMS: "https://api.schwabapi.com/trader/v1/accounts/accountNumbers",
    CHAINS: "https://api.schwabapi.com/marketdata/v1/chains",
    CHAINSEXP: "https://api.schwabapi.com/marketdata/v1/expirationchain",
    INST: "https://api.schwabapi.com/marketdata/v1/instruments",
    INSTID: (cusip) => `https://api.schwabapi.com/marketdata/v1/instruments/${cusip}`,
    MARKETS: "https://api.schwabapi.com/marketdata/v1/markets",
    MARKETSID: (mktid) => `https://api.schwabapi.com/marketdata/v1/markets/${mktid}`,
    MOVERS: (ticker) => `https://api.schwabapi.com/marketdata/v1/movers/${ticker}`,
    ORDALL: "https://api.schwabapi.com/trader/v1/orders",
    ORDID: (accountHash, orderid) => `https://api.schwabapi.com/trader/v1/accounts/${accountHash}/orders/${orderid}`,
    ORDPREV: (accthash) => `https://api.schwabapi.com/trader/v1/accounts/${accthash}/previewOrder`,
    ORDS: (accthash) => `https://api.schwabapi.com/trader/v1/accounts/${accthash}/orders`,
    PREFS: "https://api.schwabapi.com/trader/v1/userPreference",
    PRICEHIST: "https://api.schwabapi.com/marketdata/v1/pricehistory",
    QUOTEID: (ticker) => `https://api.schwabapi.com/marketdata/v1/${ticker}/quotes`,
    QUOTES: "https://api.schwabapi.com/marketdata/v1/quotes",
    TRANS: (accthash) => `https://api.schwabapi.com/trader/v1/accounts/${accthash}/transactions`,
    TRANSID: (accthash, transid) => `https://api.schwabapi.com/trader/v1/accounts/${accthash}/transactions/${transid}`,
};
export default endpoint;
//# sourceMappingURL=endpoints.js.map
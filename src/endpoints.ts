/**
 * @author Jason Levitt
 * @description All the Schwab REST API endpoints
 */
type Endpoint = {
  ACCTDETAILS: (accthash: string) => string;
  ACCTLIST: string;
  ACCTNUMS: string;
  CHAINS: string;
  CHAINSEXP: string;
  INST: string;
  INSTID: (cusip: string) => string;
  MARKETS: string;
  MARKETSID: (mktid: string) => string;
  MOVERS: (ticker: string) => string;
  ORDALL: string;
  ORDID: (accountHash: string, orderid: string) => string;
  ORDPREV: (accthash: string) => string;
  ORDS: (accthash: string) => string;
  PREFS: string;
  PRICEHIST: string;
  QUOTEID: (ticker: string) => string;
  QUOTES: string;
  TRANS: (accthash: string) => string;
  TRANSID: (accthash: string, transid: string) => string;
};

const endpoint: Endpoint = {
  ACCTDETAILS: (accthash) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accthash}`,
  ACCTLIST: "https://api.schwabapi.com/trader/v1/accounts/",
  ACCTNUMS: "https://api.schwabapi.com/trader/v1/accounts/accountNumbers",
  CHAINS: "https://api.schwabapi.com/marketdata/v1/chains",
  CHAINSEXP: "https://api.schwabapi.com/marketdata/v1/expirationchain",
  INST: "https://api.schwabapi.com/marketdata/v1/instruments",
  INSTID: (cusip) =>
    `https://api.schwabapi.com/marketdata/v1/instruments/${cusip}`,
  MARKETS: "https://api.schwabapi.com/marketdata/v1/markets",
  MARKETSID: (mktid) =>
    `https://api.schwabapi.com/marketdata/v1/markets/${mktid}`,
  MOVERS: (ticker) =>
    `https://api.schwabapi.com/marketdata/v1/movers/${ticker}`,
  ORDALL: "https://api.schwabapi.com/trader/v1/orders",
  ORDID: (accountHash, orderid) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accountHash}/orders/${orderid}`,
  ORDPREV: (accthash) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accthash}/previewOrder`,
  ORDS: (accthash) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accthash}/orders`,
  PREFS: "https://api.schwabapi.com/trader/v1/userPreference",
  PRICEHIST: "https://api.schwabapi.com/marketdata/v1/pricehistory",
  QUOTEID: (ticker) =>
    `https://api.schwabapi.com/marketdata/v1/${ticker}/quotes`,
  QUOTES: "https://api.schwabapi.com/marketdata/v1/quotes",
  TRANS: (accthash) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accthash}/transactions`,
  TRANSID: (accthash, transid) =>
    `https://api.schwabapi.com/trader/v1/accounts/${accthash}/transactions/${transid}`,
};

export default endpoint;

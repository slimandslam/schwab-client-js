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
declare const endpoint: Endpoint;
export default endpoint;
//# sourceMappingURL=endpoints.d.ts.map
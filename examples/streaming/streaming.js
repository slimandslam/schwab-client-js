// streaming.js -- A streaming example using schwab-client-js
// Schwab uses websockets to stream market data.
//

import { StreamingApiClient } from "schwab-client-js";

// Create your streaming client object
const streamclient = new StreamingApiClient();

// You should create listeners for the four types of messages
// sent via websockets: open, message, close, error. The method
// streamListen simplifies this.

// Listen for the "open" request
streamclient.streamListen("open", () => {
  console.log("Received open message: webSocket connection opened.");
});

// Listen for messages from Schwab. This is where your data arreves
streamclient.streamListen("message", (message) => {
  console.log("Received data message:", message);
});

// Listen for close
streamclient.streamListen("close", (code, reason) => {
  console.log(`Connection closed: Code=${code}, Reason=${reason}`);
});

// Listen for errors
streamclient.streamListen("error", (error) => {
  console.error("Received error message:", error);
});

// Initialize the stream
await streamclient.streamInit();

// Login to the Schwab stream
await streamclient.streamSchwabLogin();

// Subscribe to some stock prices
let params = { keys: "AMD,TSLA,GOOG", fields: "0,1,2,3,4,5" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_EQUITIES", params);

// Subscribe to some forex data
params = { keys: "EUR/USD,USD/JPY,AUD/CAD", fields: "0,1,2,6,14" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_FOREX", params);

// Subscribe to some chart futures
params = { keys: "/MNQ,/M2K", fields: "0,2,3" };
await streamclient.streamSchwabRequest("ADD", "CHART_FUTURES", params);

// Subscribe to more forex data
params = { keys: "USD/EUR,USD/JPY,USD/CAD", fields: "0,1,2,6,14" };
await streamclient.streamSchwabRequest("ADD", "LEVELONE_FOREX", params);

// Subscribe to screener services
params = {
  keys: "NASDAQ_VOLUME_5,$SPX_PERCENT_CHANGE_UP_0",
  fields: "0,1,2,3,4",
};
await streamclient.streamSchwabRequest("ADD", "SCREENER_EQUITY", params);

// Subscribe to options info
params = {
  keys: "MSFT  251219P00200000",
  fields: "0,2,3,4,8,9,10,16,17,20,21,22,28,29,30,31,38",
};
await streamclient.streamSchwabRequest("ADD", "LEVELONE_OPTIONS", params);

// For demo purposes only, we'll wait 20 seconds to let data stream
// before we send another message.
function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

await wait(20);

// UNsubscribe from TSLA prices
params = { keys: "TSLA" };
await streamclient.streamSchwabRequest("UNSUBS", "LEVELONE_EQUITIES", params);

// Wait 10 more seconds just to let more data stream
await wait(10);

// LOGOUT of the stream
await streamclient.streamSchwabLogout();
streamclient.streamClose();

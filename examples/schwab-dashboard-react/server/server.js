import express from "express";
import cors from "cors";
import { StreamingApiClient } from "schwab-client-js";

const app = express();
const PORT = 5000;
let streamclient = null;

// Apply CORS to allow requests from the React app
app.use(cors());

async function streamConnect() {
  streamclient = new StreamingApiClient();

  streamclient.streamListen("open", () => {
    console.log("WebSocket connection opened.");
  });

  streamclient.streamListen("close", (code, reason) => {
    console.log(`WebSocket closed: Code=${code}, Reason=${reason}`);
  });

  streamclient.streamListen("error", (error) => {
    console.error("WebSocket error:", error);
  });

  await streamclient.streamInit();
  await streamclient.streamSchwabLogin();

  // two candlestick charts
  let params = { keys: "AAPL,SPY", fields: "0,1,2,3,4" }; // name,  open, high, low, close
  await streamclient.streamSchwabRequest("ADD", "CHART_EQUITY", params);

  // two bid/ask charts
  params = { keys: "AAPL,SPY", fields: "0,1,2,8" }; // name, bid price, ask price, total volume
  await streamclient.streamSchwabRequest("ADD", "LEVELONE_EQUITIES", params);
}

// SSE endpoint
app.get("/market-stream", async (req, res) => {
  await streamConnect();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client connected to SSE");

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ heartbeat: "keep-alive" })}\n\n`);
  }, 10000); // Send a heartbeat every 10 seconds

  streamclient.streamListen("message", (message) => {
    if (message.includes('"data"')) {
      console.log("Writing to stream: ", message);
      res.write(`data: ${message}\n\n`); // Ensure proper SSE format
    }
  });

  // Cleanup on client disconnect
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected from SSE");
    res.end();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

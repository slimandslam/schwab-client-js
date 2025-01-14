import express from "express";
import cors from "cors";
import { StreamingApiClient } from "schwab-client-js";

const app = express();
const PORT = 5001;
const corsOptions = {
  origin: "http://localhost:5173", // Allow your client app's origin
  methods: ["GET", "POST"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type"], // Allow specific headers
};
app.use(cors(corsOptions)); // Apply CORS middleware

let streamclient = null;

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

  const params = { keys: "EUR/USD,USD/JPY,USD/CAD,USD/MXN", fields: "0,1,2" }; // name, bid price, ask price
  await streamclient.streamSchwabRequest("ADD", "LEVELONE_FOREX", params);
}

// SSE endpoint
app.get("/forex-stream", async (req, res) => {
  await streamConnect();
  console.log("Client connected to Forex SSE stream.");

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ heartbeat: "keep-alive" })}\n\n`);
  }, 10000); // Send a heartbeat every 10 seconds

  streamclient.streamListen("message", (message) => {
    if (message.includes('"data"')) {
      message = JSON.parse(message);
      // turn 1's and 2's into "bid" and "ask"
      message.data.forEach((entry) => {
        entry.content.forEach((item) => {
          if ("1" in item) {
            item.bid = item["1"]; // Add new key "bid"
            delete item["1"]; // Remove old key "1"
          }
          if ("2" in item) {
            item.ask = item["2"]; // Add new key "ask"
            delete item["2"]; // Remove old key "2"
          }
        });
      });
      const content = JSON.stringify(message.data[0].content);
      console.log("Writing to stream: ", content);
      res.write(`data: ${content}\n\n`); // Ensure proper SSE format
    }
  });

  // Handle client disconnection
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected.");
  });
});

app.listen(PORT, () =>
  console.log(`HTTP server running on http://localhost:${PORT}`),
);

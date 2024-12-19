// route.js -- receives the websocket feed from Schwab and sends it
// via SSE to the frontend
// Author: Jason Levitt

import { StreamingApiClient } from "schwab-client-js";

let streamclient = null;

export async function GET() {
  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      console.log("Client connected to SSE");

      const cleanup = () => {
        if (streamclient) streamclient.streamClose(); // Close WebSocket
        clearInterval(heartbeat);
        closed = true;
        console.log("Stream closed.");
        controller.close();
      };

      try {
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

        // Subscribe to LEVELONE_EQUITIES and CHART_EQUITY
        let params = { keys: "NVDA", fields: "0,1,2,8,9,10,11,12,18" };
        await streamclient.streamSchwabRequest(
          "ADD",
          "LEVELONE_EQUITIES",
          params,
        );

        // Send WebSocket messages to SSE clients
        streamclient.streamListen("message", (message) => {
          if (closed) return;
          if (message.includes('"data"')) {
            console.log("Forwarding data:", message);
            try {
              controller.enqueue(encoder.encode(`data: ${message}\n\n`));
            } catch (err) {
              console.error("Failed to send message:", err);
              cleanup();
            }
          }
        });
      } catch (err) {
        console.error("Error initializing WebSocket client:", err);
        cleanup();
      }

      // Heartbeat to keep the SSE alive
      const heartbeat = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ heartbeat: "keep-alive" })}\n\n`,
            ),
          );
        } catch (err) {
          console.error("Failed to send heartbeat:", err);
          cleanup();
        }
      }, 10000);
    },
    cancel() {
      console.log("Client disconnected.");
      closed = true;
      if (streamclient) streamclient.streamClose();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

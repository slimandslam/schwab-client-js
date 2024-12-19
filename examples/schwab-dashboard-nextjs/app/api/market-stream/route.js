import { StreamingApiClient } from "schwab-client-js";

let streamclient = null;
let activeClients = 0;
let initialized = false;

export async function GET() {
  const encoder = new TextEncoder();
  let heartbeat = null;
  let controllerClosed = false; // Track if the controller is closed

  const initializeResources = async () => {
    if (initialized) return;
    console.log("Initializing WebSocket resources...");

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

    try {
      await streamclient.streamInit();
      await streamclient.streamSchwabLogin();

      const params = { keys: "NVDA", fields: "0,1,2,8,9,10,11,12,18" };
      await streamclient.streamSchwabRequest(
        "ADD",
        "LEVELONE_EQUITIES",
        params,
      );

      initialized = true;
      console.log("WebSocket resources initialized.");
    } catch (err) {
      console.error("Error initializing WebSocket resources:", err);
    }
  };

  const stream = new ReadableStream({
    async start(controller) {
      console.log("Client connected to SSE");
      activeClients++;
      controllerClosed = false; // Reset the flag for new connections

      if (!initialized) {
        await initializeResources();
      }

      heartbeat = setInterval(() => {
        if (controllerClosed) return; // Skip if the controller is closed
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ heartbeat: "alive" })}\n\n`,
            ),
          );
        } catch (err) {
          console.error("Failed to send heartbeat:", err);
        }
      }, 10000);

      streamclient.streamListen("message", (message) => {
        if (controllerClosed) return; // Skip if the controller is closed
        try {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
          console.log("Sending data: ", message);
        } catch (err) {
          console.error("Failed to send message:", err);
        }
      });
    },
    cancel() {
      console.log("Client disconnected.");
      activeClients--;
      controllerClosed = true; // Mark the controller as closed
      if (heartbeat) clearInterval(heartbeat); // Clear the heartbeat interval
      if (activeClients === 0) {
        console.log(
          "No active clients. Keeping WebSocket and resources alive for future connections.",
        );
        // Do not clean up WebSocket resources; wait for next client
      }
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

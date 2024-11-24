// DEFINED LOGGERS
//
// Display all streaming messages and events
// DEBUG=streaming:msgs
// logger("streaming", "msgs", "[description of event]", [technical details]);
//
// Display arguments to all fetch calls
// DEBUG=fetch:args
// logger("fetch", "args", "[description of event]", [technical details]);
//
// Display raw response object (data is not displayed) all fetch calls
// DEBUG=fetch:raw-response
// logger("fetch", "raw-response", "[description of event]", [technical details]);
//

import "./initenv.js";
import debug from "debug";

export default function logger(
  namespace: string,
  level: string,
  message: string,
  context?: unknown,
): void {
  const log = debug(`${namespace}:${level}`); // Use the correct namespace

  if (log.enabled) {
    if (context !== undefined) {
      if (typeof context === "object" && context !== null) {
        log(`${message}`, context); // Log structured data
      } else {
        log(`${message}`, { context }); // Wrap primitives in an object
      }
    } else {
      log(message); // Log message without context
    }
  }
}

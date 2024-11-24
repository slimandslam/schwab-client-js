/**
 * @function fetchData
 * @author Jason Levitt
 * @description General purpose fetch routine for making REST API calls
 * It uses the built-in fetch (node version 18 and newer) and adds the
 * fetch library for earlier versions of node.
 * @param {string} url - The full URL including any parameters
 * @param {Object} args - Optional configuration structure
 * @param {string} [args.type] -  The REST verb e.g. "GET"
 * @param {Object} [args.headers] - A set of HTTP header key/value pairs
 * @param {Object} [args.body] - A set of key/value paris
 * @returns {Promise<Object>} A promise that resolves to a JSON object
 */

import logger from "./logger.js";

interface RequestArgs {
  type?: string; // e.g., "GET", "POST"
  headers?: Record<string, string>; // HTTP headers as key-value pairs
  body?: Record<string, unknown> | string; // Request body as an object or already stringified
}

async function fetchData(
  url: string,
  args: RequestArgs = {},
): Promise<Record<string, unknown>> {
  logger("fetch", "args", "fetch call args: ", args);

  try {
    // Construct the fetch options
    const fetchOptions: RequestInit = {
      method: args.type || "GET",
      headers: { ...args.headers },
      ...(args.body
        ? {
            body:
              typeof args.body === "string"
                ? args.body
                : JSON.stringify(args.body),
          }
        : {}),
    };

    // Perform the fetch call
    const response = await fetch(url, fetchOptions);

    logger("fetch", "raw-response", "raw fetch response", response);

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Handle the case where nothing is returned but the call is successful (e.g. trades)
    // Why does Schwab put the orderId in the location header?
    const responseText = await response.text();
    if (responseText) {
      const data: Record<string, unknown> = JSON.parse(responseText);
      return data;
    } else {
      const orderId =
        response.headers.get("location")?.split("/").pop() || null;
      if (orderId) {
        const jsonResponse = { orderId: orderId };
        return jsonResponse;
      } else {
        throw new Error("Empty response body");
      }
    }
  } catch (error) {
    console.error("Fetch error:", (error as Error).message);
    throw error;
  }
}

export default fetchData;

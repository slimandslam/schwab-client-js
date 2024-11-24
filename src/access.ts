/**
 * @function fetchToken
 * @author Jason Levitt
 * @description Dedicated routine for refreshing the Schwab access token
 * @param {Credentials} creds - Access credentials necessary to generate a token
 * @returns {Promise<TokenResponse>} A promise that resolves to a JSON object containing the token data
 */

import logger from "./logger.js";

interface Credentials {
  appKey: string;
  appSecret: string;
  appRefresh: string;
  access_token: string; // Current access token, refreshed as needed
  access_exp: number; // Expiration timestamp in seconds. Expires every 29 minutes.
}

async function fetchToken(
  creds: Credentials,
): Promise<Record<string, unknown>> {
  const basicAuth = Buffer.from(`${creds.appKey}:${creds.appSecret}`).toString(
    "base64",
  );

  logger("fetch", "args", "credentials args only for fetchToken(): ", creds);

  try {
    const response = await fetch("https://api.schwabapi.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
        "Accept-Encoding": "gzip",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: creds.appRefresh,
      }),
    });

    logger("fetch", "raw-response", "raw fetchToken() response", response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: Record<string, unknown> = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error in Refresh:", (error as Error).message);
    throw error;
  }
}

export default fetchToken;

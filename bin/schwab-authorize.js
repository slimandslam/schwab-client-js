#!/usr/bin/env node

// schwab-authorize.js
// Author: Jason Levitt
// Launches a web browser to create a new SCHWAB_REFRESH_TOKEN.
// Uses the selfsigned nodejs library to dynamically generated
// a self-signed certificate at each invocation.

import open from "open";
import dotenv from "dotenv";
import https from "https";
import selfsigned from "selfsigned";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
if (!process.env.SCHWAB_APP_KEY) {
  throw new Error("Environment variable SCHWAB_APP_KEY is not set.");
}
if (!process.env.SCHWAB_SECRET) {
  throw new Error("Environment variable SCHWAB_SECRET is not set.");
}
if (!process.env.SCHWAB_CALLBACK_URL) {
  console.log(
    "SCHWAB_CALLBACK_URL is not set. That is ok, but that will only work if the callback URL is defined as https://127.0.0.1 in your app settings on developer.schwab.com.",
  );
}

// Generate a self-signed certificate valid for localhost
const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, {
  keySize: 2048,
  days: 1,
  algorithm: "sha256",
  extensions: [
    {
      name: "basicConstraints",
      cA: true,
    },
    {
      name: "keyUsage",
      keyCertSign: true,
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
      clientAuth: true,
    },
    {
      name: "subjectAltName",
      altNames: [
        {
          type: 2, // DNS
          value: "localhost", // Restrict to localhost
        },
        {
          type: 7, // IP
          ip: "127.0.0.1", // Restrict to local IP
        },
      ],
    },
  ],
});

const options = {
  key: pems.private,
  cert: pems.cert,
};

// Default callback URL (local only)
const callbackUrl = process.env.SCHWAB_CALLBACK_URL || "https://127.0.0.1:8443";

// Authorization URL for Schwab API
const authorizationUrl =
  `https://api.schwabapi.com/v1/oauth/authorize?client_id=${process.env.SCHWAB_APP_KEY}` +
  `&redirect_uri=${callbackUrl}`;

// Extract port from callback URL
const urlObj = new URL(callbackUrl);
const port = urlObj.port || 8443;

// Function to update .env file with a new refresh token
function updateEnv(newToken) {
  const envFilePath = path.resolve(process.cwd(), ".env");

  let envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, "utf8")
    : "";

  if (envContent.includes("SCHWAB_REFRESH_TOKEN")) {
    envContent = envContent.replace(
      /SCHWAB_REFRESH_TOKEN=.*/,
      `SCHWAB_REFRESH_TOKEN=${newToken}`,
    );
  } else {
    envContent += `\nSCHWAB_REFRESH_TOKEN=${newToken}`;
  }

  fs.writeFileSync(envFilePath, envContent, "utf8");
  console.log("SCHWAB_REFRESH_TOKEN updated in .env file.");
  process.exit(0);
}

// Function to get the authorization response
async function getAuthorizationResponse() {
  return new Promise((resolve, reject) => {
    const server = https.createServer(options, (req, res) => {
      const fullUrl = `${callbackUrl}${req.url}`;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Authorization successful! You can close this window.</h1>");
      server.close();
      resolve(fullUrl);
    });

    server.listen(port, () => {
      console.log(`Listening for the HTTPS callback on ${callbackUrl}`);
      open(authorizationUrl).catch((error) =>
        reject(new Error(`Failed to open URL: ${error.message}`)),
      );
    });

    server.on("error", (err) =>
      reject(new Error(`Server error: ${err.message}`)),
    );
  });
}

// Main execution
(async () => {
  try {
    const receivedUrl = await getAuthorizationResponse();
    console.log(`Received URL: ${receivedUrl}`);

    const receivedObj = new URL(receivedUrl);
    const authCode = decodeURIComponent(
      receivedObj.searchParams.get("code") || "",
    );

    const basicAuth = Buffer.from(
      `${process.env.SCHWAB_APP_KEY}:${process.env.SCHWAB_SECRET}`,
    ).toString("base64");

    const response = await fetch("https://api.schwabapi.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
        "Accept-Encoding": "gzip",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: callbackUrl,
        code: authCode,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to generate token: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    updateEnv(data.refresh_token);
  } catch (error) {
    console.error("Error during authorization:", error);
  }
})();

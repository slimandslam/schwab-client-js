#!/usr/bin/env node

// schwab-authorize.js
// Launches a web browser to create a new SCHWAB_REFRESH_TOKEN

import open from "open";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
if (!process.env.SCHWAB_APP_KEY) {
  throw new Error("Environment variable SCHWAB_APP_KEY is not set.");
}

// Get the directory of this script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve paths to SSL certificate files
const sslDir = path.resolve(__dirname, "sslcert");
const keyPath = path.join(sslDir, "key.pem");
const certPath = path.join(sslDir, "cert.pem");

// Verify that SSL files exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  throw new Error(
    `Missing SSL certificate files in ${sslDir}. Ensure key.pem and cert.pem are present.`
  );
}

// Load SSL options
const options = {
  key: fs.readFileSync(keyPath, "utf-8"),
  cert: fs.readFileSync(certPath, "utf-8"),
};

// Default callback URL
const callbackUrl = process.env.SCHWAB_CALLBACK_URL || "https://127.0.0.1";

// Construct authorization URL
const authorizationUrl =
  `https://api.schwabapi.com/v1/oauth/authorize?client_id=${process.env.SCHWAB_APP_KEY}` +
  `&redirect_uri=${callbackUrl}`;

// Extract port from the callback URL
const urlObj = new URL(callbackUrl);
const port = urlObj.port || (urlObj.protocol === "https:" ? "443" : "80");

// Function to update .env with new token
function updateEnv(newToken) {
  const envFilePath = path.resolve(process.cwd(), ".env");

  let envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, "utf8")
    : "";

  if (envContent.includes("SCHWAB_REFRESH_TOKEN")) {
    envContent = envContent.replace(
      /SCHWAB_REFRESH_TOKEN=.*/,
      `SCHWAB_REFRESH_TOKEN=${newToken}`
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
        reject(new Error(`Failed to open URL: ${error.message}`))
      );
    });

    server.on("error", (err) => reject(new Error(`Server error: ${err.message}`)));
  });
}

// Main execution
(async () => {
  try {
    const receivedUrl = await getAuthorizationResponse();
    console.log(`Received URL: ${receivedUrl}`);

    const receivedObj = new URL(receivedUrl);
    const authCode = decodeURIComponent(
      receivedObj.searchParams.get("code") || ""
    );

    const basicAuth = Buffer.from(
      `${process.env.SCHWAB_APP_KEY}:${process.env.SCHWAB_SECRET}`
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
        `Failed to generate token: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    updateEnv(data.refresh_token);
  } catch (error) {
    console.error("Error during authorization:", error);
  }
})();

#!/usr/bin/env node

// schwab-authorize.js
// Launches a web browser to create a new SCHWAB_REFRESH_TOKEN
// Requires your Schwab public and private keys which you should put in an .env file
// I have provided a self-signed SSL cert which is in the sslcert directory
//
// NOTE: the self-signed cert typically causes your web browser to issue a warning
//
// Place a SCHWAB_CALLBACK_URL in the .env file which must match what is defined
// in your app details on developer.schwab.com

import open from "open";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";

function updateEnv(newToken) {
  const envFilePath = path.resolve(process.cwd(), ".env");

  let envContent = "";
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf8");
  } else {
    throw new Error("Expecting to find .env file. .env file not found");
  }

  if (envContent.includes("SCHWAB_REFRESH_TOKEN")) {
    envContent = envContent.replace(
      /SCHWAB_REFRESH_TOKEN=.*/,
      `SCHWAB_REFRESH_TOKEN=${newToken}\n`,
    );
  } else {
    envContent += `\nSCHWAB_REFRESH_TOKEN=${newToken}\n`;
  }

  fs.writeFileSync(envFilePath, envContent, "utf8");

  console.log("SCHWAB_REFRESH_TOKEN updated in .env file.");

  process.exit(0);
}

async function getAuthorizationResponse() {
  return new Promise((resolve, reject) => {
    // Create an HTTPS server to listen for the callback
    const server = https.createServer(options, (req, res) => {
      const fullUrl = `${process.env.SCHWAB_CALLBACK_URL}${req.url}`;
      // console.log(`Received URL: ${fullUrl}`); // Print the full received URL

      // Send a response back to the browser
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<h1>Authorization successful!</h1><h2>You can close this window.</h2>",
      );

      // Close the server and resolve the full URL
      server.close();
      resolve(fullUrl);
    });

    // Start the server on the specified port
    server.listen(port, () => {
      console.log("Listening for the HTTPS callback on ", callbackUrl);

      // Open the authorization URL in the user's browser
      open(authorizationUrl).catch((error) =>
        reject(new Error(`Failed to open URL: ${error.message}`)),
      );
    });

    // Error handling for the server
    server.on("error", (err) => {
      reject(new Error(`Server error: ${err.message}`));
    });
  });
}

dotenv.config();

if (!process.env.SCHWAB_APP_KEY) {
  throw new Error("Environment variable SCHWAB_APP_KEY is not set.");
}

// default to https://127.0.0.1 if it is not set
const callbackUrl = process.env.SCHWAB_CALLBACK_URL || "https://127.0.0.1";

const authorizationUrl =
  "https://api.schwabapi.com/v1/oauth/authorize?client_id=" +
  process.env.SCHWAB_APP_KEY +
  "&redirect_uri=" +
  callbackUrl;

const urlObj = new URL(callbackUrl);
const port = urlObj.port || (urlObj.protocol === "https:" ? "443" : "80");

// Get the directory of this script
const scriptDir = path.dirname(new URL(import.meta.url).pathname);

// Resolve the path to the SSL certificate
const keyPath = path.resolve(scriptDir, "./sslcert/key.pem");
const certPath = path.resolve(scriptDir, "./sslcert/cert.pem");

const options = {
  key: fs.readFileSync(keyPath, "utf-8"),
  cert: fs.readFileSync(certPath, "utf-8"),
};

// Call the function and handle the received URL
try {
  const receivedUrl = await getAuthorizationResponse();
  console.log(`Received URL: ${receivedUrl}`);

  const receivedObj = new URL(receivedUrl);
  let authcode = receivedObj.searchParams.get("code");
  const code = decodeURIComponent(authcode);

  const basicAuth = Buffer.from(
    process.env.SCHWAB_APP_KEY + ":" + process.env.SCHWAB_SECRET,
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
      code: code,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error -- failed to generate token: ${response.status} - ${response.statusText}`,
    );
  }

  const data = await response.json();
  updateEnv(data.refresh_token);
} catch (error) {
  throw new Error("Error -- authorize.js failed:", JSON.stringify(error));
}

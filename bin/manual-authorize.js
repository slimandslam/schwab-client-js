#!/usr/bin/env node

// manual.js
// Author: Jason Levitt
// Lets the user manually create a SCHWAB_REFRESH_TOKEN with a bit of help

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import readline from "readline";

// Load environment variables
dotenv.config();

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

// Processes the returned URL and gets the refresh token
async function ProcessUrl(receivedUrl) {
  const receivedObj = new URL(receivedUrl);
  const authCode = decodeURIComponent(
    receivedObj.searchParams.get("code") || "",
  );

  const basicAuth = Buffer.from(
    `${process.env.SCHWAB_APP_KEY}:${process.env.SCHWAB_SECRET}`,
  ).toString("base64");

  try {
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
    return data.refresh_token;
  } catch (error) {
    console.error("Error during authorization:", error);
  }
}

function askQuestion() {
  const query = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    query.question(
      "Enter the returned URL here (press enter to exit): ",
      (answer) => {
        query.close();
        resolve(answer);
      },
    );
  });
}

async function getAnswer() {
  const theurl = await askQuestion();

  if (theurl.trim() === "") {
    console.log("No input provided. Exiting...");
    process.exit(0);
  }

  return theurl;
}

// Ensure required environment variables are set
if (!process.env.SCHWAB_APP_KEY) {
  throw new Error("Environment variable SCHWAB_APP_KEY is not set.");
}
if (!process.env.SCHWAB_SECRET) {
  throw new Error("Environment variable SCHWAB_SECRET is not set.");
}
if (!process.env.SCHWAB_CALLBACK_URL) {
  console.log(
    "SCHWAB_CALLBACK_URL is not set. That is ok. I will use https://127.0.0.1:5556 . However, this will not work unless you have added https://127.0.0.1:5556 to your app settings on developer.schwab.com.",
  );
}

// Default callback URL (local only)
const callbackUrl = process.env.SCHWAB_CALLBACK_URL || "https://127.0.0.1:5556";

// Authorization URL for Schwab API
// The user must manually cut and paste this URL into a web browser
const authorizationUrl =
  `https://api.schwabapi.com/v1/oauth/authorize?client_id=${process.env.SCHWAB_APP_KEY}` +
  `&redirect_uri=${callbackUrl}`;
console.log("");
console.log(
  "Copy and paste the URL below into a web browser. Login with your Schwab.com",
);
console.log(
  "credentials and fill out the pages as required. When you get to the very end,",
);
console.log(
  'your browser will most likely have a "cannot connect to server" message that',
);
console.log(
  "looks like an error. It is not an error. Copy and paste the final URL from your",
);
console.log("browser address bar at the prompt below.");
console.log("");
console.log(authorizationUrl);
console.log("");

// Prompt the user to enter the URL
const theurl = await getAnswer();

// Process the URL by making the Schwab API call to get the Refresh Token
const token = await ProcessUrl(theurl);

// Update the .env file with the SCHWAB_REFRESH_TOKEN
updateEnv(token);

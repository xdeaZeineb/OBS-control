const expressConfig = require("express");
const cors = require("cors");
const http = require("http");
const xss = require("xss-clean");
const helmet = require("helmet");
const obsClient = require("../client/obs.client");
const obs = require("./obs.config");
const WebSocket = require("ws");

// Create Express server
const app = expressConfig();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Set security HTTP headers
app.use(helmet());

// Health endpoint
app.get("/health", (req, res) => res.json({ status: "API server running" }));

// Parse json request body
app.use(expressConfig.json());

// Parse urlencoded request body
app.use(expressConfig.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());

// Enable cors
app.use(cors());
app.options("*", cors());

// Default routes
app.use(`/`, require("../routes"));

// WebSocket handling for live updates
obsClient.getLiveUpdates(wss, obs);

module.exports = server; // Export the server

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const {
  app: { PORT },
} = require("./config");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();

const webServiceRouter = require("./routes/webServices");
const authRoutes = require("./routes/authServices");

// CORS options
const corsOptions = {
  origin: [
    "http://192.168.1.119:3000",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://192.168.1.71:3000",
    "http://192.168.1.65:3000",
    "https://a2z-1-j255.onrender.com",
    "https://a2zautorepair.ca",
    "https://www.a2zautorepair.ca",
    "https://a2z-1-214m.onrender.com"
  ],
  credentials: true, // allow cookies
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("etag", false);

// Serve React static files from 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.use("/auth", authRoutes);
app.use("/", webServiceRouter);

// Catch-all route to serve React's index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Graceful error handlers
process.on("uncaughtException", (err, origin) => {
  console.log(err);
  process.exit(0);
});
process.on("SIGTERM", (err, origin) => {
  console.log(err);
  process.exit(0);
});
process.on("SIGINT", (err, origin) => {
  console.log(err);
  process.exit(0);
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("HTTP server is running on port: ", PORT);
  console.log("HTTP server is running on process: ", process.pid);
});

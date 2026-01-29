const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const { stat } = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount API routes under /api
app.use("/api", authRoutes);

// Serve built client from the `dist` folder (populated at image build time)
const staticPath = path.join(__dirname, "public");
console.log(staticPath);
app.use(express.static(staticPath));

// SPA fallback: serve index.html for non-API GET requests
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).end();
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => res.json({ status: "ok" }));

// get all readings
app.get("/readings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM readings ORDER BY recorded_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post a new reading (gateway will call this)
app.post("/readings", async (req, res) => {
  const { gateway_id, temperature, humidity, recorded_at } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO readings (gateway_id, temperature, humidity, recorded_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [gateway_id, temperature, humidity, recorded_at || new Date()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all gateways
app.get("/gateways", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM gateways");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

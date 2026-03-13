const express = require("express");
const router = express.Router();
const db = require("../db");
const axios = require("axios");

const GEMINI_API_KEY = "YOUR_API_KEY";


// POST /api/journal
router.post("/", (req, res) => {

  const { userId, ambience, text } = req.body;

  db.run(
    "INSERT INTO journals(userId, ambience, text) VALUES (?,?,?)",
    [userId, ambience, text],
    function (err) {

      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID });

    }
  );
});


// GET /api/journal/:userId
router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  db.all(
    "SELECT * FROM journals WHERE userId=?",
    [userId],
    (err, rows) => {

      if (err) return res.status(500).json(err);

      res.json(rows);

    }
  );
});


// POST /api/journal/analyze
router.post("/analyze", async (req, res) => {

  const { text } = req.body;

  const prompt = `
Analyze the emotional tone of the journal text.

Return JSON:

emotion
keywords
summary

Text: ${text}
`;

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json(error);

  }
});


// GET /api/journal/insights/:userId
router.get("/insights/:userId", (req, res) => {

  const { userId } = req.params;

  db.all(
    "SELECT ambience, text FROM journals WHERE userId=?",
    [userId],
    (err, rows) => {

      if (err) return res.status(500).json(err);

      const totalEntries = rows.length;

      const ambienceCount = {};

      rows.forEach(r => {

        ambienceCount[r.ambience] =
          (ambienceCount[r.ambience] || 0) + 1;

      });

      const mostUsedAmbience =
        Object.keys(ambienceCount).reduce((a, b) =>
          ambienceCount[a] > ambienceCount[b] ? a : b
        );

      res.json({
        totalEntries,
        mostUsedAmbience
      });

    }
  );
});

module.exports = router;

const express = require("express");
const ShortUrl = require("../models/shortUrl");
const shortid = require("shortid");

const router = express.Router();

const keySize = 100;
const keySet = new Set();
while (keySet.size < keySize) {
  keySet.add(shortid.generate());
}
const keys = Array.from(keySet);

router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body || {};
    if (!longUrl) throw new Error("longUrl is necessary");
    if (!/^http(s){0,1}:\/\//.test(longUrl))
      throw new Error("Long URL should start with 'http://' or 'https://'");

    const key = keys.pop();
    if (!key) throw new Error("the unique key ran out");

    const newShortUrl = new ShortUrl({
      shortId: key,
      redirectURL: longUrl,
      visitHistory: [],
    });

    await newShortUrl.save();

    const shortUrl = `${req.protocol}://${req.get("host")}/${key}`;
    res.status(200).send({ shortUrl });
  } catch (error) {
    console.error("Error saving data to database:", error);
    res.status(500).send("Error saving data to database");
  }
});

module.exports = router;

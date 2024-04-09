const express = require("express");
const ShortUrl = require("../models/shortUrl");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shortUrl = await ShortUrl.findOne({ shortId: id });
    if (!shortUrl) throw new Error("the short url is wrong");

    shortUrl.visitHistory.push({ timestamp: Date.now() });
    await shortUrl.save();

    res.redirect(shortUrl.redirectURL);
  } catch (error) {
    console.error("Error retrieving data from database:", error);
    res.status(500).send("Error retrieving data from database");
  }
});

module.exports = router;

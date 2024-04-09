const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true, collection: "ShortUrls" }
);

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

module.exports = shortUrl;

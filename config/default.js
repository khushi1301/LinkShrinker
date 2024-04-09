module.exports = {
  port: process.env.PORT || 4000,
  domain: process.env.DOMAIN || "http://localhost:4000",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/short-url",
};

const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.udbhav.gzafc8j.mongodb.net",
  (err, addresses) => {
    console.log("Error:", err);
    console.log("Addresses:", addresses);
  }
);
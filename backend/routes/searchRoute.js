const express = require("express");
const router = express.Router();
const Listing = require("../model/listingSchema");

router.post("/", async (req, resp) => {
    const searchInput = req.body.query;
    console.log(searchInput);
    const result = await Listing.find({
      location: { $regex: searchInput, $options: "i" },
    });
    resp.send(result);
  });

  module.exports = router;
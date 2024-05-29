const express = require("express");
const router = express.Router();
const Listing = require("../model/listingSchema");

router.post("/", async (req, resp) => {
    const searchInput = req.body.query;
    // console.log(searchInput);
    try {
      const result = await Listing.find({
          $or: [
              { location: { $regex: searchInput, $options: "i" } },
              { place: { $regex: searchInput, $options: "i" } }
          ]
      });
    //   console.log(result)
      resp.send(result);
  } catch (err) {
      resp.status(500).send({ error: err.message });
  }
});  

  module.exports = router;
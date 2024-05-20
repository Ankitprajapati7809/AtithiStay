const express = require("express");
const router = express.Router();
const Review = require("../model/reviewSchema");
const Listing = require("../model/listingSchema");
const { authenticateJWT } = require("../middlewares.js");

router.post("/listing/:id/review", authenticateJWT, async (req, resp) => {
  // console.log("id : ", req.params.id);
  const listing = await Listing.findById(req.params.id);
  const { rating, review } = req.body;
  console.log("::::::::::::::::::::::::");
  console.log(req.user.userId);
  const newReview = new Review({
    rating: rating,
    review: review,
    reviewOwner: req.user.userId,
  });

  listing.reviews.push(newReview);

  const saved = await newReview.save();
  console.log(saved);

  const savedReview = await listing.save();
  resp.status(200).send(savedReview);
});
router.delete(
  "/listing/:listingId/review/:reviewId",
  authenticateJWT,
  async (req, resp) => {
    //  console.log("%%%%%%%%%%%%%%%%%%%%%%");
    console.log(req.user);
    const { listingId, reviewId } = req.params;
    console.log(listingId, reviewId);
    const getReview = await Review.findById(reviewId);
    console.log(getReview.reviewOwner);
    if (req.user.userId !== getReview.reviewOwner.toString()) {
      return resp.status(403).json({
        error:
          "You are not the owner. So, that you can not Delete this Review.",
      });
    }
    await Review.findByIdAndDelete(reviewId);
    // Remove the review reference from the Listing document
    await Listing.findByIdAndUpdate(listingId, {
      $pull: { reviews: reviewId },
    });
    resp.status(200).json({ message: "Review deleted successfully" });
  }
);

router.get("/listing/:id/review", async (req, resp) => {
  const reviewsData = await Listing.findById(req.params.id);
  resp.status(200).send(reviewsData.reviews);
});
module.exports = router;

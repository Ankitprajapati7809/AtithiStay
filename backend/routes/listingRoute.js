const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingContainer = require("../controllers/listingController.js")
// const {isLogin} = require("../middlewares.js")

router.get("/", listingContainer.index);

router.get("/", listingContainer.renderAddNewForm)

router.post("/", upload.single("image"), listingContainer.addedNewListing);

router.get("/:id", listingContainer.showListing);

router.get("/:id/edit", listingContainer.renderEditForm);

router.patch("/:id/edit", upload.single("image"), listingContainer.updateListing);

router.delete("/:id", listingContainer.deleteListing);

module.exports = router; 
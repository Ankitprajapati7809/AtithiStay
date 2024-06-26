const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingContainer = require("../controllers/listingController.js")
const {authenticateJWT} = require("../middlewares.js")

router.get("/", listingContainer.index); 

router.get("/verify", authenticateJWT, listingContainer.renderAddNewForm)

router.post("/", authenticateJWT, upload.single("image"), listingContainer.addedNewListing);

router.get("/:id", listingContainer.showListing);

router.get("/:id/edit", authenticateJWT, listingContainer.renderEditForm);

router.put("/:id/edit", upload.single("image"), listingContainer.updateListing);

router.delete("/:id", authenticateJWT, listingContainer.deleteListing);

module.exports = router; 
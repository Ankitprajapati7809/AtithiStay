const Listing = require("../model/listingSchema");

module.exports.index = async (req, resp) => {
  // console.log(req.user)
  const read = await Listing.find();
  resp.send(read);
};

module.exports.renderAddNewForm = (req, resp) => {
  console.log("Reached after authentication!");
  // console.log(req.user)
  // resp.status(200).json(req.user);
};

module.exports.addedNewListing = async (req, resp) => {
  console.log("mmmmmmmmmmmmmmmmmm");
  console.log(req.user.userId);
  try {
    console.log("55555555555555555555");
    console.log(req.user);
    console.log("55555555555555555555");
    let url = req.file.path;
    const ListingData = req.body;
    const newListing = new Listing({
      title: ListingData.title,
      description: ListingData.description,
      image: ListingData.image,
      price: ListingData.price,
      country: ListingData.country,
      location: ListingData.location,
      place: ListingData.place,
    });
    (newListing.owner = req.user.userId), (newListing.image = { url });
    const savingListing = await newListing.save();
    console.log("7777777777777777777777777777")
    console.log(savingListing);
    resp.status(200).json(savingListing);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
};

module.exports.showListing = async (req, resp) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getListing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "reviewOwner" },
      })
      .populate("owner");
    resp.send(getListing);
  } catch (error) {
    console.log(error);
  }
};

module.exports.renderEditForm = async (req, resp) => {
  try {
    const { id } = req.params;
    console.log("2222222222223333333333333");
    console.log(id);
    console.log(req.user);
    const getListing = await Listing.findById(id);
    if (req.user.userId !== getListing.owner.toString()) {
      return resp.status(402).json({
        error: "You have not access to Edit.",
      });
    }
    resp.send(getListing);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateListing = async (req, resp) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body });
    // console.log(listing)
    if (typeof req.file !== "undefined") {
      const url = req.file.path;
      listing.image = { url };
      await listing.save();
      resp.status(200).json({
        message: "Listing is edited successfully",
      });
    }
  } catch (error) {
    console.log("backend", error); 
  }
};

module.exports.deleteListing = async (req, resp) => {
  try {
    const { id } = req.params;
    console.log("///////////////////////////");
    console.log(id);
    console.log(req.user);

    const listing = await Listing.findById(id);
    // console.log(listing.owner);
    if (req.user.userId !== listing.owner.toString()) {
      return resp.status(405).json({
        error: "You can not delete! you are not the owner of this listing.",
      });
    }
    await Listing.findByIdAndDelete(id);
    resp.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

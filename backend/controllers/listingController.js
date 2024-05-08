const Listing = require("../model/listingSchema");

module.exports.index =  async (req, resp) => {
  // console.log(req.user)
    const read = await Listing.find();
    resp.send(read);
  }

module.exports.renderAddNewForm = (req, resp)=>{

}  
  
module.exports.addedNewListing = async (req, resp) => {
    try {
      let url = req.file.path;
      const ListingData = req.body;
      const newListing = new Listing({
        title: ListingData.title,
        description: ListingData.description,
        image: ListingData.image,
        price: ListingData.price,
        country: ListingData.country,
        location: ListingData.location,
      });
      console.log(url);
      newListing.image = { url };
      const savingListing = await newListing.save();
      resp.status(200).json(savingListing);
    } catch (error) {
      console.log(error);
      resp.status(400).json({ error: error.message });
    }
  }

module.exports.showListing = async (req, resp) => {
    try {
      const { id } = req.params;
      console.log(id);
      const getListing = await Listing.findById(id);
      resp.send(getListing);
    } catch (error) {
      console.log(error);
    }
  }

module.exports.renderEditForm = async (req, resp) => {
    try {
      const { id } = req.params;
      const getListing = await Listing.findById(id);
      resp.send(getListing);
    } catch (error) {
      console.log(error);
    }
  }  

module.exports.updateListing = async (req, resp) => {
    try {
      const { id } = req.params;
      const listing = await Listing.findByIdAndUpdate(id, { ...req.body });
  
      const url = req.file.path;
      listing.image = { url };
      await listing.save();
      resp.status(200).json({
        message: "Listing is edited successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }

module.exports.deleteListing = async (req, resp) => {
    try {
      const { id } = req.params;
      console.log(id);
      const gettingData = await Listing.findByIdAndDelete(id);
      console.log(gettingData);
      resp.status(200).json({
        message: "Listing is deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }  
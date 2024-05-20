const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/airbnbWithReact")
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  owner: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 1500,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reviews: [
    {
    type: schema.Types.ObjectId, ref: "review",
  }
],
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

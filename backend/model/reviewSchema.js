const Mongoose = require("mongoose");
const Schema = Mongoose.Schema; 
const review = new Schema({
    review: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    reviewOwner: {
        type: Schema.Types.ObjectId, ref:"User",
    }
})

module.exports = Mongoose.model('review', review);
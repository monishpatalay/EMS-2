import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:String,
    address:String,
    photos:[String],    
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number,

});

const PlaceModel = mongoose.model('Place', placeSchema);
export default PlaceModel;
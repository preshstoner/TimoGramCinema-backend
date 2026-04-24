const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    movieId: {
        type: Number, 
        required: true
    },
    showtime:{
        type: Date, 
        required: true
    },
    seats: [{
        type: String, 
        required: true
    }], //Array of seat identifiers
    status:{
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'confirmed'
    },
    totalPrice:{
        type: Number, 
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
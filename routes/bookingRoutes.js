const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth'); 

//Create a new booking (Protected)
router.post('/', protect, async (req, res) => {
    try{
        const { movieId, showtime, seats, totalPrice } = req.body;

        const booking = await Booking.create({
            userId: req.user.id, 
            movieId,
            showtime,
            seats,
            totalPrice: totalPrice || seats.length * 10 //Assuming $10 per seat if totalPrice not provided
        });
        res.status(201).json(booking);
    } catch (error) {
        console.error("Booking error:", error.message); //Helpful for debugging
        res.status(400).json({ 
            message: error.message 
        });
    }
});

//Get all bookings for logged-in user (Protected)
router.get('/', protect, async (req, res) => {
    try{
        const bookings = await Booking.find({userId: req.user.id})
            .sort({ createdAt: -1 }); //Sort by newest first
        res.json(bookings);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

//Check already booked seats for a specific showtime
router.get('/check-seats', protect, async (req, res) => {
    try{
        const {movieId, showtime} = req.query;

        const bookedSeats = await Booking.find({
            movieId: parseInt(movieId),
            showtime: new Date(showtime)
        }).select('seats'); 

        //Flatten all booked seats into one array
        const allBooked = bookedSeats.flatMap(b => b.seats); 
        res.json({ bookedSeats: allBooked });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

//Hardcoded showtimes for now (I will improve later)

router.get('/:movieId/showtimes', (req, res) => {
    const movieId = parseInt(req.params.movieId); // TODO: Use this later for per-movie showtimes

    // i will customize showtimes per movie later
    const showtimes = [
        {
            id: 1,
            time:"2026-04-20T14:30:00",
            hall:"Hall 1",
            price: 12
        },
        {
            id: 2,
            time:"2026-04-20T17:00:00",
            hall: "Hall 1",
            price: 12
        },
        {
            id: 3,
            time:"2026-04-20T20:15:00",
            hall: "Hall 2",
            price: 12
        },
        {
            id: 4,
            time:"2026-04-21T15:00:00",
            hall: "Hall 1",
            price: 12
        }
    ];
    res.json(showtimes);
});

module.exports = router;
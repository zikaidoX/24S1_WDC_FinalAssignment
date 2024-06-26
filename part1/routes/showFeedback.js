const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const db = req.db;
    const userId = 1;

    const sql = `
        SELECT feedback.rating, feedback.comments, feedback.date, trips.destination
        FROM feedback
        JOIN bookings ON feedback.tripID = bookings.tripID
        JOIN trips ON trips.tripID = feedback.tripID
        WHERE bookings.userID = ?;
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).send('Error fetching feedback');
        }

        res.json(results);
    });
});

router.get('/manager-data', (req, res) => {
    const db = req.db;
    const managerId = 1;

    const sql = `
        SELECT feedback.rating, feedback.comments, feedback.date, feedback.tripID, trips.destination
        FROM feedback
        JOIN trips ON feedback.tripID = trips.tripID
        WHERE trips.managerID = ?
        ORDER BY feedback.date DESC;
    `;

    db.query(sql, [managerId], (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).send('Error fetching feedback');
        }
        res.json(results);
    });
});


router.get('/feedback-data', (req, res) => {
    const userId = 1;

    const sql = `
        SELECT feedback.rating, Feedback.comments, feedback.date, trips.destination, Feedback.trip_id
        FROM feedback
        JOIN bookings ON feedback.tripID = bookings.tripID
        JOIN trips ON trips.tripID = feedback.tripID
        WHERE bookings.userID = ?
    `;

    req.db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).json({ error: 'Error fetching feedback' });
        }

        res.json(results);
    });
});

module.exports = router;

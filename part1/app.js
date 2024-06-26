const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const showFeedbackRouter = require('./routes/showFeedback');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', showFeedbackRouter);

// Route to fetch trips for user
app.get('/trips', (req, res) => {
    const userId = 1;

    const sql = `
        SELECT t.*
        FROM Trips t
        JOIN Bookings b ON t.trip_id = b.trip_id
        WHERE b.user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching trips:', err);
            res.status(500).send('Error fetching trips');
        } else {
            res.json(results); // Send trips as JSON response
        }
    });
});

app.use(express.static('public'));

app.post('/show-user-feedback', (req, res) => {
    const { trip } = req.body;

    const sql = `SELECT * FROM Feedback WHERE trip_id = ?`;
    db.query(sql, [trip], (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            res.status(500).json({ error: 'Error fetching feedback' });
            return;
        }

        res.json(results); // Send feedback data as JSON response
    });
});

// Route to handle form submission
app.post('/submit-feedback', (req, res) => {
    const { trip, rating, message, anon } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10);

    // Determine if user_id will be null
    let user_id = 1;
    if (anon === 'on') {
        user_id = null;
    }

    // Insert feedback into database
    const sql = `INSERT INTO Feedback (rating, comments, date, user_id, trip_id) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [rating, message, currentDate, user_id, trip], (err, result) => {
        if (err) {
            res.status(500).send('Error submitting feedback');
            throw err;
        }

        console.log('Feedback submitted:', result);
        res.redirect('/feedback'); // Redirect to feedback confirmation page
    });
});

var connectionPool = mysql.createPool({
    host: 'localhost',
    database: 'Tourism'
  });


app.use(function(req,res,next) {
    req.pool = connectionPool;
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/manager', showFeedbackRouter);

module.exports = app;

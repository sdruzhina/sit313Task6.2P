var express  = require('express');
var router = express.Router();
const https = require("https");
const bodyParser = require("body-parser");
const Worker = require("../models/Worker");

// Get all workers
router.get('/workers', (req, res) => {
    Worker.find((err, workerList) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(workerList);
        }
    });
});

// Create a new worker
router.post('/workers', (req, res) => {
    const worker = new Worker({
        country: req.body.country,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        mobile: req.body.mobile
    });
    worker.save((err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ 
                status: 'success', 
                message: 'Worker successfully added.' 
            })
        }
    });
});

// Delete all workers
router.delete('/workers', (req, res) => {
    Worker.deleteMany((err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ 
                status: 'success', 
                message: 'All workers deleted.' 
            });
        }
    });
});

// Get workers by id
router.get('/workers/:id', (req, res) => {
    Worker.findOne({ _id: req.params.id }, (err, worker) => {
        if (worker) {
            res.json(worker);
        }
        else {
            res.json({ 
                status: 'error', 
                message: 'Worker not found.' 
            });
        }
    });
});



module.exports = router;

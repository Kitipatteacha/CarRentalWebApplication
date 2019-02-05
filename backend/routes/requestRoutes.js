const mongoose = require('mongoose');
const Car = mongoose.model('cars')
const Request = mongoose.model('requests')
const requireAuthentication = require('../middlewares/requireAuthentication')
module.exports = (app) => {
    app.get('/api/request', async (req, res) => {
        const requests = await Request.find({_renter: req.user["_id"]})
        res.send(requests)
    })
    app.post('/api/request', requireAuthentication, async (req, res) => {
        const { carId, placeFrom, placeTo, dateFrom, dateTo } = req.body
        const car = await Car.findByIdAndUpdate(
            carId, {
                $set: {
                    isRented: true
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
        console.log("car", car)
        console.log(carId, placeFrom, placeTo, dateFrom, dateTo )
        try {
            const request = await new Request({
                _renter: req.user,
                _owner: car._owner,
                _car: carId,
                placeFrom,
                placeTo,
                dateFrom,
                dateTo
            }).save()
            res.send(request)
        } catch (err) {
            console.log(err)
            res.status(422).send(err);
        }

    })
    app.put('/api/request/:requestId', requireAuthentication, async (req, res) => {
        const request = await Request.update(
            { _id: req.params.requestId }, {
                $set: {
                    isCompleted: true
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
        console.log(request)
        try {
            const car = await Car.update(
                { _id: req.params.carId }, {
                    $set: {
                        isRented: false
                    }
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                })
            console.log(car)
            res.status(200).send("Check Request Complete!!!");
        } catch (err) {
            res.status(422).send(err);
        }

    })
    app.delete('/api/request/:requestId', requireAuthentication, async (req, res) => {
        Request.findByIdAndRemove(req.params.requestId, (err, request) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Successfully deleted",
                id: request.id,
            }
            return res.status(200).send(response);
        })
        
    })
}
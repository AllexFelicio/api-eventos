const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema({
    passenger: {
        type: String,
        required: true
    },
    outboundFlight: {
        type: String,
        required: true
    },
    returnFlight: {
        type: String,
        required: true
    },
    seatOnOutbound: {
        type: String,
        required: true
    },
    seatOnReturn: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Passagens', flightBookingSchema);

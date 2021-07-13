var mongoose = require('mongoose');

var TrainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },
    trainNumber: {
        type: String,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    trainSource: {
        type: String,
        required: true
    },
    trainDestination: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('trains', TrainSchema);
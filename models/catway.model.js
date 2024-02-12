const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numero id est requis']
    },
    type: {
        type: String,
        trim: true
    },
    catwayState: {
        type: String,
        required: [true, 'une description est requis'],
        trim: true
    }   
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Catway', Catway);
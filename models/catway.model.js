const mongoose = require('mongoose');


const catwaySchema = new mongoose.Schema(
{
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

    const catwayModel = mongoose.model('catway', catwaySchema);

    module.exports = catwayModel;
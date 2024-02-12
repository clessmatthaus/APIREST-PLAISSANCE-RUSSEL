const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
{
    catwayNumber: {
        type: Number,
        required: [true, 'Le numero du bateau est requis'],
        trim: true  
    },
    clientName: {
        type: String,   
        required: [true, 'le nom du client est requis'],
        trim: true
    },
    boatName: {
        type: String,
        required: [true, 'le nom du bateau est requis'],
        trim: true
    }, 
    checkIn : {
        type: Date,
        required: [true, 'la date du début de réservation est requis'],
        trim: true
    },
    checkOut : {
        type: Date,
        required: [true, 'la date de fin de réservation est requis'],
        trim: true
    }  
},
    {
        timestamps: true
    });

    const reservationModel = mongoose.model('reservation', reservationSchema);

    module.exports = reservationModel;
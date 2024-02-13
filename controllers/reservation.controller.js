const reservationModel = require('../models/reservation.model');
const ObjectID = require('mongoose').Types.ObjectId;

// get all reservations list
module.exports.getAllReservation = (req, res) => {
    reservationModel.find((err, data) => {
        if(!err) res.send(data);
        else console.log('Liste de reservations non trouvées : ' + err);
    })
 }

 //get reservation details
 module.exports.getReservation = async (req, res) => {
    if (!ObjectID.isValid(req.params.idReservation))
       return res.status(400).send('ID unknown : ' + req.params.idReservation)  
    reservationModel.findById(req.params.idReservation, (err, data) => {
        if (!err){
            res.send(data);
        } else{
            console.log('Aucune reservation trouvée : ' + err);
        }
    })
 };

 //create reservation
 module.exports.makeReservation = async (req, res) => {
    const newReservation =  new reservationModel({
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,  
        boatName: req.body.boatName, 
        checkIn: req.body.checkIn, 
        checkOut: req.body.checkOut
    });
    try {
        const reservation = await newReservation.save();
        return res.status(201).json(reservation);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

//delete reservation
 module.exports.deleteReservation = async (req, res) => {
    if (!ObjectID.isValid(req.params.idReservation)) 
    return res.status(400).send('ID unknown : ' + req.params.idReservation)
  
    reservationModel.findByIdAndRemove(
        req.params.idReservation,
        (err, data) => {
           if(!err) res.send(data);
           else console.log("Erreur de suppression : " + err) 
        }
    )
 };
 
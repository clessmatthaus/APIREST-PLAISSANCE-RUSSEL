/**
 * @swagger
 * components:
 *   schemas:
 *     Reservations:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *           description: 
 *         catwayNumber:
 *           type: number
 *           description: 
 *         clientName:
 *           type: string
 *           description: 
 *         boatName:
 *           type: string
 *           description: 
 *         checkInt:
 *           type: string
 *         checkOut:
 *           type: string 
 *         createdAt:
 *           type: string
 *           format: date
 *           description: 
 *         updatedAt:
 *           type: string
 *           format: date
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 * /api/catways/id/reservations:
 *   get:
 *     summary: afficher les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: la liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catways/id/reservations'
 *   post:
 *     summary: Ajouter une réservation 
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catways/id/reservations'
 *     responses:
 *       200:
 *         description: réservation ajoutée à la liste.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catways/id/reservations'
 *       500:
 *         description: Erreur de connexion avec le serveur
 * /api/catways/id/reservations/{id}:
 *   get:
 *     summary: afficher les détails d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Merci de renseigner id de la réservation
 *     responses:
 *       200:
 *         description: response de la requette id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catways/id/reservations'
 *       404:
 *         description: Aucune réservation n'existe sous cette id
 *   delete:
 *     summary: Spprimer une réservation de la liste
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Merci de renseigner id du de la réservation
 *              
 *     responses:
 *       200:
 *         description: réservation supprimer
 *       404:
 *         description: erreur
 */

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
 
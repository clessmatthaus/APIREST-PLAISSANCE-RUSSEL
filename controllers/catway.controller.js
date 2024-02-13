/**
 * @swagger
 * components:
 *   schemas:
 *     Catways:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the catway
 *         catwayNumber:
 *           type: number
 *           description: réservations catways
 *         type:
 *           type: string
 *           description: The catway explanation
 *         catwayState:
 *           type: string
 *           description: catway
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the catway was added
 *         updatedAt:
 *           type: string
 *           format: date
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 * /api/catways:
 *   get:
 *     summary: La liste des Catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: la liste de tous les catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catways'
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catways'
 *     responses:
 *       200:
 *         description: le catway a été créer avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catways'
 *       500:
 *         description: Erreur de connexion avec le serveur
 * /api/catways/{id}:
 *   get:
 *     summary: afficher un catway grace à son id
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Merci de renseigner id du catway
 *     responses:
 *       200:
 *         description: response de la requette id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catways'
 *       404:
 *         description: Le catway n'a pas été trouvé
 *   put:
 *    summary: Mise à jour d'un catway grâce à son id
 *    tags: [Catways]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  Merci de renseigner id du catway
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Catways'
 *    responses:
 *      200:
 *        description: Le catway a été mise à jour
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Catways'
 *      404:
 *        description: Le catway n'a pas été trouvé
 *      500:
 *        description: Plusieurs erreurs detectées
 *   delete:
 *     summary: Spprimer un catway grâce à son id
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Merci de renseigner id du catway
 *              
 *     responses:
 *       200:
 *         description: Le catway a été trouvé
 *       404:
 *         description: Le catway n'a pas été trouvé
 */

const catwayModel = require('../models/catway.model');
const ObjectID = require('mongoose').Types.ObjectId;

//get catways list
module.exports.getAllCatways = (req, res) => {
    catwayModel.find((err, data) => {
        if(!err) res.send(data);
        else console.log('Liste de catways non trouvées : ' + err);
 }).sort({createdAt: -1});
};

 //get catway by id
module.exports.getCatway = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    {
       return res.status(400).send('ID unknown : ' + req.params.id)  
    }
    catwayModel.findById(req.params.id, (err, data) => {
        if (!err){
            res.send(data);
        } else{
            console.log('catway non trouvée : ' + err);
        }
    })
};

//update catwayState
module.exports.updateCatway = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
       return res.status(400).send('ID unknown : ' + req.params.id)  
    
    const updateCatwayState = { catwayState: req.body.catwayState}

    catwayModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateCatwayState},
        { new: true},
        (err, data) => {
            if (!err) return res.send(data);
            else console.log("erreur de mise à jour : " + err);
        }
    )
};

 //create catway
module.exports.createCatway = async (req, res) => {
    const newCatway =  new catwayModel({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,  
        catwayState: req.body.catwayState
    });
    try {
        const catway = await newCatway.save();
        return res.status(201).json(catway);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

//delete catway by id
module.exports.deleteCatway = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('ID unknown : ' + req.params.id)
  
    catwayModel.findByIdAndDelete(
        req.params.id,
        (err, data) => {
           if(!err) res.send(data)
           else console.log("Erreur de suppression : " + err) 
        }
    )
}
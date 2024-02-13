/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 * /api/user/{id}:
 *
 *   put:
 *    summary: Mise à jour infos utilisateur grâce à son id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  Merci de renseigner id de l'utilisateur
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/api/user/id'
 *    responses:
 *      200:
 *        description: infos utilisateur mise à jour
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/api/user/id'
 *      404:
 *        description: Utilisateur introuvable
 *      500:
 *        description: Plusieurs erreurs detectées
 *   delete:
 *     summary: Spprimer un utlisateur grâce à son id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Merci de renseigner id de l'utilisateur
 *              
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 */
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//get users list
module.exports.getUser = async (req, res) => {
   const user = await UserModel.find().select('-password');
    res.status(200).json(user);
};

//get user infos
module.exports.userInfos = (req, res) => {
    //console.log(req.params)
    if (!ObjectID.isValid(req.params.id))
    {
       return res.status(400).send('ID unknown : ' + req.params.id)  
    }
    UserModel.findById(req.params.id, (err, data) => {
        if (!err){
            res.send(data);
        } else{
            console.log('ID unknown : ' + err);
        }
    }).select('-password');
};

//update user infos
module.exports.updateUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
       return res.status(400).send('ID unknown : ' + req.params.id)  
    
    try {
        UserModel.findByIdAndUpdate(
            req.params.id, 
            {$set: {name: req.body.name, email: req.body.email, password: req.body.password}},
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.send(data);        
                //else console.log("erreur de mise à jour : " + err);  
                if (err) return res.status(500).send({ message: err});
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
};

//delete user infos
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('ID unknown : ' + req.params.id)
  
    try {
        await UserModel.remove({_id: req.params.id}).exec()
        res.status(200).json({message: "utilisateur supprimer avec succées."})
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
}
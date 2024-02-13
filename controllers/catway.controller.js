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

//delete catway
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
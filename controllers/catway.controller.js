const catwayModel = require('../models/catway.model');

const ObjectID = require('mongoose').Types.ObjectId;

//get catways list
module.exports.getAllCatways = async (req, res) => {
    const catway = await catwayModel.find();
     res.status(200).json(catway);
 };

 //get catway by id
module.exports.getCatway = (req, res) => {
    //console.log(req.params)
    if (!ObjectID.isValid(req.params.id))
    {
       return res.status(400).send('ID unknown : ' + req.params.id)  
    }
    catwayModel.findById(req.params.id, (err, data) => {
        if (!err){
            res.send(data);
        } else{
            console.log('ID unknown : ' + err);
        }
    })
};

//update catway  catwayState
module.exports.updateCatway = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
       return res.status(400).send('ID unknown : ' + req.params.id)  
    
    try {
        await catwayModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set: {
                    catwayState: req.body.catwayState,                
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.send(data);          
                if (err) return res.status(500).send({ message: err});
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
};

 //create catway
module.exports.createCatway = async (req, res) => {
   
        const {catwayNumber, type, catwayState} = req.body
    
        try {
            const user = await catwayModel.create({catwayNumber, type, catwayState});
            res.status(201).json({ user: user._id});
        }
        catch (err) {
            res.status(200).send(err);
        }
    };

//delete catway
module.exports.deleteCatway = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('ID unknown : ' + req.params.id)
  
    try {
        await catwayModel.remove({_id: req.params.id}).exec()
        res.status(200).json({message: "catway supprimer avec succées."})
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
}
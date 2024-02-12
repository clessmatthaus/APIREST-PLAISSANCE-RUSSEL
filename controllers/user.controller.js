const UserModel = require('../models/user.model');

const ObjectID = require('mongoose').Types.ObjectId;

//get users list
//module.exports.getUser = async (req, res) => {
//    const user = await UserModel.find().select('-password');
//    res.status(200).json(user);
//}

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
}

//update user
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
       return res.status(400).send('ID unknown : ' + req.params.id)  
    
    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
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

//delete user
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
const asyncHandler = require("express-async-handler")
const Catway = require("../models/catwayModel")

const createCatway = asyncHandler(async(req, res) => {
    
    const {catwayNumber, type, catwayState} = req.body

    //validation
    if(!catwayNumber || !type || !catwayState) {
        res.status(400)
        throw new Error("Veuillez completer tous les champs")
    }

    //create catway
    const catway = await Catway.create({
        user: req.user.id,
        catwayNumber,
        type, 
        catwayState,
    })

    res.status(201).json(catway)
})


module.exports={
    createCatway
}
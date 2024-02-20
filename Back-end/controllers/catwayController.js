const asyncHandler = require("express-async-handler")
const Catway = require("../models/catwayModel")
const { fileSizeFormat } = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2



const createCatway = asyncHandler(async(req, res) => {
    
    const {catwayNumber, type, catwayState} = req.body

    //validation
    if(!catwayNumber || !type || !catwayState ) {
        res.status(400)
        throw new Error("Veuillez completer tous les champs")
    }

    //handle image upload
    let fileData = {}
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Plaisance Russell App", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Erreur de telechargement de l'image")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormat(req.file.size, 2)
        }
    }

    //create catway
    const catway = await Catway.create({
        user: req.user.id,
        catwayNumber,
        type, 
        catwayState,
        image: fileData
    })
    res.status(201).json(catway)
});

//get all catways
const getCatways = asyncHandler(async(req, res) => {
    const catways = await Catway.find({user: req.user.id}).sort("-createdAt")
    res.status(200).json(catways)
});

//get single catway 
const getCatway = asyncHandler(async(req, res) => {
    const catway = await Catway.findById(req.params.id)
    if(!catway) {
        res.status(404)
        throw new Error("Catway introuvable")
    }
    if (catway.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Utilisateur non autorisé")
    }
    res.status(200).json(catway)
});

//delete catway
const deleteCatway = asyncHandler(async(req, res) => {
    const catway = await Catway.findById(req.params.id)
    if(!catway) {
        res.status(404)
        throw new Error("Catway introuvable")
    }
    if (catway.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Utilisateur non autorisé")
    }
    await catway.remove()
    res.status(200).json({message: "catway a été supprimé avec succès", catway})
});

//update catway state description
const updateCatway = asyncHandler(async(req, res) => {
    
    const { catwayState} = req.body
    const {id} = req.params

    const catway = await Catway.findById(req.params.id)
    if(!catway) {
        res.status(404)
        throw new Error("Catway introuvable")
    }
    if (catway.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Utilisateur non autorisé")
    }

    //handle image upload
    let fileData = {}
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Plaisance Russell App", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Erreur de telechargement de l'image")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormat(req.file.size, 2)
        }
    }

    //update catway
    const updatedCatway = await Catway.findByIdAndUpdate(
        { _id: id },
        { catwayState, image: Object.keys(fileData).length === 0 ? catway?.image : fileData },
        {new: true, runValidators: true}
    )
    res.status(200).json(updatedCatway)
});

module.exports={
    createCatway,
    getCatways,
    getCatway,
    deleteCatway,
    updateCatway
}
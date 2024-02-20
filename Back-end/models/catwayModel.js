const mongoose = require('mongoose')

const catwaySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    catwayNumber: {
        type: Number,
        required: [true, " Veuillez précisé le numero de pont."]
    },
    type: {
        type: String,
        required: [true, " Veuillez précisé le type de pont."]
    },
    catwayState: {
        type: String,
        required: [true, " Veuillez décrire l'etat du catway(pont)."],
        trim: true
    },
    image: {
        type: Object,
        default: {}   
    },
    
},{timestamps: true,});

const Catway = mongoose.model("Catway", catwaySchema)
module.exports = Catway
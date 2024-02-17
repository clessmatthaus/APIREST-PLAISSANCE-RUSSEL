const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Merci de saisir votre nom"]
    },
    email: {
        type: String,
        required: [true, "Merci de saisir votre e-mail"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Veuillez saisir un e-mail vailde"]
    },
    password: {
        type: string,
        required: [true, "Merci de saisir un mot de passe"],
        minLength: [6, "Le mot de passe doit contenir au minimum 6 caractéres"],
        maxLength: [26, "Le mot de passe ne doit pas contenir plus de 26 caractéres"]
    },
    photo: {
        type: string,
        required: [true, "une photo de profil ? "],
        default: "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
    },
    phone: {
        type: string,
        default: ""
    }
}, {timestamps: true,});

const User = mongoose.model("User", userSchema)
module.exports = User
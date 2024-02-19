const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
        type: String,
        required: [true, "Merci de saisir un mot de passe"],
        minLength: [8, "Le mot de passe doit contenir au minimum 8 caractéres"],
        //maxLength: [26, "Le mot de passe ne doit pas contenir plus de 26 caractéres"]
    },
    photo: {
        type: String,
        required: [true, "une photo de profil ? "],
        default: "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
    }
}, {timestamps: true,});

 //encrypt password
userSchema.pre("save", async function() {
     if (!this.isModified("password")) {
        //return next();
    }    
//hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(this.password, salt)
this.password = hashedPassword;
//next()
});

const User = mongoose.model("User", userSchema)
module.exports = User
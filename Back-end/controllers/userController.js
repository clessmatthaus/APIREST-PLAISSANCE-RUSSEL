const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const genereteToken = (id) => { 
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

//register User
const registerUser = asyncHandler( async (req, res) => {
   const {name, email, password} = req.body

   //validation
   if (!name || !email || !password) {
    res.status(400)
    throw new Error("Veuillez de remplir tous les champs")
   }
   if (password.length < 8 ) {
    res.status(400)
    throw new Error("Le mot de passe doit contenir au minimum 8 caractéres")
   }
   // check if e-mail already exist
   const userExist = await User.findOne({email})

   if (userExist){
    res.status(400)
    throw new Error("Cet e-mail est existe déjà")
   }

   //create new user
   const user = await User.create({
    name, email, password
   });
   
   //generate Token
   const token = genereteToken(user._id)

   //send cookie
   res.cookie("token", token, {path: "/", httpOnly: true, expires: new Date(Date.now()+ 1000 * 86400), sameSite: "none", secure: true})

   if(user){
    const {_id, name, email, photo} = user
    res.status(201).json({
        _id, name, email, photo, token
    })
   } else {
    res.status(400)
    throw new Error("Données utilisateur non valide")
   }
});

//login User fonctionality
const loginUser = asyncHandler( async(req, res) => {
 const {email, password} = req.body

 if(!email || !password) {
    res.status(400);
throw new Error("Veuillez saisir l'email et le mot de passe");
 }
 const user = await User.findOne({email})
 if(!user) {
    res.status(400);
    throw new Error("Ce compte n'existe pas, créer un compte !");
 }

 //check if password is correct
 const correctPassword = await bcrypt.compare(password, user.password)

 //generate Token
 const token = genereteToken(user._id)

 //send cookie
 if(correctPassword ) {
    res.cookie("token", token, {path: "/", httpOnly: true, expires: new Date(Date.now() + 1000 * 86400), sameSite: "none", secure: true})
 }

 if (user && correctPassword) {
    const {_id, name, email, photo} = user
    res.status(200).json({
        _id, name, email, photo, token
    });
 } else {
    res.status(400)
    throw new Error("E-mail ou mot de passe incorrect");
 }

});

//logout User fonctionality
const logout = asyncHandler(async(req, res) => {
    res.cookie("token", "", {path: "/", httpOnly: true, expires: new Date(0), sameSite: "none", secure: true});
    return res.status(200).json({message: "déconnexion reussie"})
});


module.exports = {
    registerUser,
    loginUser,
    logout
}
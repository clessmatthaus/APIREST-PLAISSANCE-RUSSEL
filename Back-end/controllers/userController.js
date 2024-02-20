const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { restart } = require("nodemon");
const sendEmail = require("../utils/sendEmail");


const genereteToken = (id) => { 
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

//register User fonctionality
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

//get user data
const getUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
    const {_id, name, email, photo} = user
    res.status(200).json({
        _id, name, email, photo
    });
    }else {
        res.status(400)
        throw new Error("utilisateur non trouvé");
     }
});

// login status fonctionality
const connected = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.json(false)
    }
    //token verify
const control = jwt.verify(token, process.env.JWT_SECRET)
    if(control) {
        return res.json(true)
    }
    return res.json(false)
});

//update user (name & photo) fonctionality
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const {name, email, photo} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();
        res.status(200).json({_id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, photo: updatedUser.photo })
    } else{
        res.status(404)
        throw new Error("utilisateur introuvable")
    }
});

//modify password fonctionality
const changePassword = asyncHandler( async (req, res) => { 
    const user = await User.findById(req.user._id)

    // if user doesnt exist
    if(!user) {
        res.status(400)
        throw new Error("Utilisateur introuvable, créer un compte !")
    }
 const {oldPassword, password} = req.body
    //validate
    if(!oldPassword || !password) {
        res.status(400)       
        throw new Error("Veuillez renseigner l'ancien et le le nouveau mot de passe")
    }

    //control if password matches with password in DB
const passwordCorrect = await bcrypt.compare(oldPassword, user.password)

    //save new password
    if(user && passwordCorrect) {
        user.password = password
        await user.save()
        res.status(200).send("le mot de passe a été modifié avec succès")
    }else {     
        res.status(400)
        throw new Error("l'ancien mot de passe est incorrect")
    }
})

//forgot Password
const forgotPassword = asyncHandler (async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user) {
        res.status(404)
        throw new Error("Cet utilisateur n'existe pas")
    }

let token = await Token.findOne({userId: user._id})
    if(token){ await token.deleteOne()}

   let resetToken = crypto.randomBytes(22).toString("hex") + user._id
   console.log(resetToken)
   
   const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
     //console.log(hashedToken)
    await new Token({ userId: user._id, token: hashedToken, createdAt: Date.now(), expiresAt: Date.now() + 35 * (60 * 1000)}).save()

    const resetUrl = `${process.env.FRONT_URL}/resetpassword/${resetToken}`

    const message = `<h3> ${user.name}</h3>
    <p>Veuillez utiliser l'url ci dessous pour réinitialiser votre mot de passe.</p>

    <p>Ce lien de réinitialisation est valable 35 minutes.</p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <p>Cordialement.</p>
    <p>l'Equipe technique</p>
    `;
    const subject = "demande de réinitialisation du mot de passe"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "réinitialisation de l-email envoyé"})
    } catch (error) {
        res.status(500)
        throw new Error("Email non envoyé, veuillez réessayer")
    }
});

//reset password
const resetPassword = asyncHandler(async(req, res) => {

    const {password} = req.body
    const {resetToken} = req.params

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    const userToken = await Token.findOne({
        token: hashedToken, 
        expiresAt: {$gt: Date.now()}
    })
    if (!userToken) {
        res.status(404)
        throw new Error("Jeton invalide ou expiré")
    }

    const user = await User.findOne({_id: userToken.userId})
    user.password = password
    await user.save()
    res.status(200).json({
        message: "Le mot de passe a été réinitialisé avec succès, veuillez vous connecter"
    }) 
});
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    connected,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("Accès non autorisé, connecter vous")
        }
        //token verify
        const control = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(control.id).select("-password")

        if(!user) {
            res.status(401)
            throw new Error("Utilisateur inexistant")
        }
        req.user = user
        next()
    }
    catch (error) {
        res.status(401)
        throw new Error("Accès non autorisé, connecter vous")
    }
})

module.exports = protect;
const asyncHandler = require("express-async-handler")

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

   // if e-mail already exist
   {}
});

module.exports = {
    registerUser
}
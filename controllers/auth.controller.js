const UserModel = require('../models/user.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/erros.utils');

const maxAge = 5 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.USER_TOKEN, {
        expiresIn: maxAge
    })
};

//signUp account
module.exports.signUp = async (req, res) => {
//console.log(req.body)
    const {name, email, password} = req.body

    try {
        const user = await userModel.create({name, email, password});
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = signUpErrors(err)
        res.status(200).send({errors});
    }
};

//signIn user
module.exports.signIn = async (req, res) => {
    const { email, password} = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({user: user._id})
    }
    catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
};

//user logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

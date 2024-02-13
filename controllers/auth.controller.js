
/**
 * @swagger
 * components:
 *   schemas:
 *     Routes:
 *       type: object
 *       required:
 *       properties:
 *         GET: 
 *           type: http://localhost:8000/api/user/logout
 *           description: Déconnexion
 *         
 *         POST:
 *           type: http://localhost:8000/api/user/login
 *           description: Connexion au compte utilisateur
 *              
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 *http://localhost:8000/api/user/logout:
 *   get:
 *     summary: Déconnexion 
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Utilisateur Déconnecter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'http://localhost:8000/api/user/logout'
 *http://localhost:8000/api/user/login: 
 *   post:
 *     summary: Connexion au compte utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'http://localhost:8000/api/user/login'
 *     responses:
 *       200:
 *         description: connexion au compte avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'http://localhost:8000/api/user/login'
 *       500:
 *         description: Erreur de connexion au compte
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Routes:
 *       type: object
 *       required:
 *       properties:
 *         
 *         
 *         POST:
 *           type: http://localhost:8000/api/user/register
 *           description: Création de compte utilisateur
 *              
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 *http://localhost:8000/api/user/register: 
 *   post:
 *     summary: Création de compte utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'http://localhost:8000/api/user/register'
 *     responses:
 *       200:
 *         description: Le compte a été créer avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'http://localhost:8000/api/user/register'
 *       500:
 *         description: Erreur serveur
 */

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

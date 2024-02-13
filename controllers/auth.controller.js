
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 * /api/user/logout:
 *   get:
 *     summary: Déconnexion 
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Utilisateur Déconnecter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/api/user/logout'
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 * /api/user/login: 
 *   post:
 *     summary: Connexion au compte utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/user/login'
 *     responses:
 *       200:
 *         description: connexion au compte avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/user/login'
 *       500:
 *         description: Erreur de connexion au compte
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       properties:
 *         name:
 *           type: string
 *           description: catway
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
/**
 * @swagger
 *   tags:
 *   name: Plaissance Russell API
 *   description: API de gestion des reservations de catways
 * /api/user/register: 
 *   post:
 *     summary: Création de compte utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/user/register'
 *     responses:
 *       200:
 *         description: Le compte a été créer avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/user/register'
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

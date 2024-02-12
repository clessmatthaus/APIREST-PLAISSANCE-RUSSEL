const express= require('express');
const useRoutes = require('./routes/user.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verifUser, requireAuth } = require('./middleware/auth.middleware');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt middleware
app.get('*', verifUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//user routes
app.use('/api/user', useRoutes);

//catway routes
app.use('/api/catways', catwayRoutes);

//catway routes
app.use('/api/catways/id/reservations', reservationRoutes);

//server loader
app.listen(process.env.PORT, () => { console.log(`Lancement du serveur sur le port ${process.env.PORT}`)});
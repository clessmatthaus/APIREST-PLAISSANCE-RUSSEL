const express= require('express');
const useRoutes = require('./routes/user.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verifUser, requireAuth } = require('./middleware/auth.middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

//catways routes
app.use('/api/catways', catwayRoutes);

//reservations routes
app.use('/api/catways/id/reservations', reservationRoutes);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PORT-PLAISSANCE-RUSSEL API DOCUMENTATION",
            version: "1.0.0",
            description: "Cette API destinée pour le service 'Capitainerie' du port de Plaissance Russel a été devéloppée grace au framework Javascript Express.",
            contact : {
                name: "Port de Plaissance Russel",
                url: "port-plaissance.com",
                email: "stunna44600@gmail.com"
            },
        },
        servers: [
           { 
            url: "http://localhost:8000/",
           },
        ],
    },
    apis: ["./controllers/*.js"],
};
const spacs = swaggerJsDoc(options)
app.use(
    "/api-docs",
     swaggerUi.serve,
     swaggerUi.setup(spacs)
      )

//server loader
app.listen(process.env.PORT, () => { console.log(`Lancement du serveur sur le port ${process.env.PORT}`)});
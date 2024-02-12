const express= require('express');
const useRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//routes
app.use('/api/user', useRoutes);

//lancement du serveur
app.listen(process.env.PORT, () => { console.log(`Lancement du serveur sur le port ${process.env.PORT}`)});
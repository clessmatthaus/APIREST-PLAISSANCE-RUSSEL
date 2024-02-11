const express= require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();



app.listen(process.env.PORT, () => { console.log(`Lancement du serveur sur le port ${process.env.PORT}`)});
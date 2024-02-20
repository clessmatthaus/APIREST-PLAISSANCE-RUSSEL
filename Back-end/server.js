const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const catwayRoute = require("./routes/catwayRoute");
const reservationRoutes = require('./routes/reservationRoute');
const path = require('path');



const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes middlewares
app.use("/api/users", userRoute);
app.use("/api/catways", catwayRoute);
app.use('/api/catways/id/reservations', reservationRoutes);

//routes
app.get("/", (req, res) => {
    res.send("page d'accueil")
});

app.use(errorHandler);

//connect to DB and start server 
const PORT = process.env.PORT || 5000;

//connect to DB and start server 
mongoose
.connect(process.env.MONGO_URI)
.then(() => { 
    app.listen(PORT, () => {
    console.log(`lancement du serveur sur le port ${PORT}`)
    })
}).catch((err) => console.log(err))






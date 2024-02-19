const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
//routes middlewares
app.use("/api/users", userRoute);

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






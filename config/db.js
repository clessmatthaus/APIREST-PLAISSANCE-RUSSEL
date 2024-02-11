const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://" + process.env.USER_PASS + "@cluster0.ephc3ld.mongodb.net/apirest-plaissance",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
   
    
}).then(() => console.log('connexion à MongoDB')).catch((error) => console.log("Erreur de connexion à MongoDB", error));
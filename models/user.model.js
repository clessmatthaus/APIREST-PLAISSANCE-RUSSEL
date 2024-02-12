const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        trim: true,
        required: [true, "L'email est requis"],
        unique: true,
        validate: [isEmail],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        max: 600,
        minlength: 8
    }
    },
    {
        timestamps: true
    }
);

//password cryption
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//password recovery
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('mot de passe incorrecte')
    }
    throw Error('Email non valide')
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
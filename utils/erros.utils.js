// handle signUp erros
module.exports.signUpErrors = (err) => {
    let errors = {name: '', email: '', password: ''}

    if (err.message.includes('email'))
        errors.email = "Email incorrecte ou déjà pris !";
    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit contenir 8 caractères minimum !";
    
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email est dèjà enregistré";

    return errors;
}; 

// handle signIn erros
module.exports.signInErrors = (err) => {
    let errors = {email: '', password: ''}

    if (err.message.includes("email")) 
    errors.email = "Email inconnu";
    if (err.message.includes("password")) 
    errors.password = "mot de passene correspond pas";

    return errors
};
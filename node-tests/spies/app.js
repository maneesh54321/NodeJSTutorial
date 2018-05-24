var db=require('./db');

module.exports.handleSignup = (email,password) => {
    //Check if email alrdy exist
    db.saveUser({email,password});
    //Send welcome email
};
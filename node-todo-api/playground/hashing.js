const {SHA256}=require('crypto-js'); //256-number of bits in resulting hash, SHA256 is a one way hashing algorithm..cant get the original value from hashaed value by any means...not even SHA256
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword='$2a$10$iXGy8B.g4arp1SIR7v86VerVbPn4jdh1a9cEwJBL4LamQIJUyE46K';

bcrypt.compare('123abc', hashedPassword, (err,res)=>{
    console.log(res);
})

// var data={
//     id:10
// };

// var message='I am user number 3';
// var hash=SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id:4
// };

// var token = { //token sent to hacker
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString() // SALT 'somesecret' which is only available on server is added to the data and hashed..After this, token is sent to the user.
// };

// Note:
// Why hash is sent to user???
// because server cant keep track of all the users active by storing their hashes in its memory, thats too much hectic and decreases performance.

// token.data.id=5;  // hacker changing the data
// token.hash=SHA256(JSON.stringify(token.data)).toString();  //hacker changing the hash

// var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString(); //here 'somesecret' is called 'SALT' which is available only on server and is appended to data before hashing so that hacker can't get same hash because they wont have the 'SALT'
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// } else{
//     console.log('Data was chnaged. Do not trust!');
// }

//Creating the data, hashing it and comparing to hashed data on server...this is called JWT (JSON web token)...there are library already available for this...wen dont need to write this code

//OR

// var token=jwt.sign(data,'123abc'); //here '123abc' will be 'SALT'

// console.log(token); //you can get the details about this token on https://jwt.io

// var decoded=jwt.verify(token,'123abc');  //changing the token will throw Invalid Signature error.
// console.log(decoded);
'use strict';
const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const jwksClient=require('jwks-rsa');
require('dotenv').config();
const Usercontrollerfunc=require('./controller/User.controller');
app.use(cors());

// let arr = [1,1,2,3]



mongoose.connect('mongodb://localhost:27017/user',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req,res)=>{
    res.json('proof of life route');
});
// app.get('/cats',catController);

app.get('/books',Usercontrollerfunc);




// ///////////////////////////////////////////////////////////////////////////////////////////
const client = jwksClient({
    // this url comes from your app on the auth0 dashboard 
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

// this is a ready to use function
const getKey=(header, callback)=>{
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
}

// 'Bearer ;alsdkj;laskd;lkasd;lkl'
app.get('/authorize',(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,getKey,{},(err,user)=>{
        if(err){
            res.send('invalid token');
        }
        res.send(user)
    })
    res.send(token);
});

app.listen(process.env.PORT,()=>{
    console.log(`listening to port: ${process.env.PORT}`);
})
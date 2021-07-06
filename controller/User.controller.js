'use strict'
const userModel= require('../models/User.model')
const seeduser = require('../models/User.model')
const Usercontrollerfunc=(req,res)=>{
    // let obj = seeduser();
    // res.send(obj);


    let requestedEmail=req.query.email;
    userModel.findOne({email: requestedEmail}, function(err,userData){
        if(err){
            console.log('there is an error');
        }
            res.send(userData)
        
    });
}

module.exports=Usercontrollerfunc;
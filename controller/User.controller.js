'use strict'
const userModel= require('../models/User.model')
const Usercontrollerfunc=(req,res)=>{
    let requestedEmail=req.query.email;
    userModel.find({email: requestedEmail}, function(err,userData){
        if(err){
            console.log('there is an error');
        }else{
            res.send(userData)
        }
    });
}

module.exports=Usercontrollerfunc;
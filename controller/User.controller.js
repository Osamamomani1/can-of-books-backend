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
const createBookfunc=(req,res)=>{
    const{email,namebook,description,status}= req.body;
    userModel.findOne({email:email}, (error, userData)=>{
    if(error){
      res.send(error)  
    }
    // let newBook={namebook:namebook,description:description,status:status}
    userData.book.push({namebook:namebook,description:description,status:status})
    userData.save();
    res.send(userData)
    })
}

const updateBook=(req,res)=>{
    const bookIndex = req.params.book_id;
    const{email,namebook,description,status}= req.body;
    userModel.findOne({email:email}, (error, userData)=>{
    if(error){
      res.send(error)  
    }
    userData.book.splice(bookIndex, 1, {namebook:namebook,description:description,status:status});
    userData.save();
    res.send(userData);
        
    });
}

const deleteBook=(req,res)=>{

    const bookIndex = req.params.book_id;
    const{email}= req.query;

    userModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        } 
            userData.book.splice(bookIndex, 1);
            userData.save();
            res.send(userData);
    });
}

module.exports={Usercontrollerfunc,
    createBookfunc,
    updateBook,
    deleteBook
}
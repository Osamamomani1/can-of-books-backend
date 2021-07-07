'use strict';

const mongoose=require('mongoose');

/*
first define a schema 
schema: description about how the data must looklike in the database
cats:
    name:{type:String}
*/


const BookSchema = new mongoose.Schema({
    namebook:{type:String},
    description:{type:String},
    status:{type:String}
})

const User= new mongoose.Schema({
    email:{type:String},
    book:[BookSchema]
})

const userModel=mongoose.model('user',User)

//seeding
const seedUser=()=>{
  let osama= new userModel ({
      email:'momaniosama97@gmail.com',
      book:[{namebook :'adc guide ',description:'book told you to climb to heigh elo in leage of legends as an adc roe',status:'gaming book' },
      {namebook :'War and Peace',description:'A legendary masterpiece, this book is synonymous with difficult reading, so why not challenge yourshelf',status:'philosophical book'}  ]

  })
  let montaser= new userModel ({
    email:'araidahmontaser@gmail.com',
    book:[{namebook :'Soong of solomon',description:'One must always read a novel by this Nobel Prize winning author.',status:'musical book' },
    {namebook :'The Lord of the Rings',description:'Most people have seen the epic movie, but have you read the book?',status:'fantasy book'}  ]

})
osama.save();
montaser.save();
console.log(osama);
}

module.exports=userModel
// seedUser();

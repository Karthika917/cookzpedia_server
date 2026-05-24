const mongoose=require('mongoose')



const recipSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:Array,
        required:true
    },
    prepTimeMinutes:{
        type:Number,
        required:true
    },
    cookTimeMinutes:{
        type:Number,
        required:true
    },
    servings:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    caloriesPerServing:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
       
    },
    reviewCount:{
        type:Number,
        
    },
    mealType:{
        type:Array,
        required:true
    },
})

const recipes=mongoose.model('recipes',recipSchema)

module.exports=recipes
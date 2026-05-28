const recipes = require('../Models/recipeModel')


// get all recipes
exports.getAllRecipes = async (req, res) => {
    try{
        const recipesList=await recipes.find()
        res.status(200).json(recipesList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//fetch recipe by id
exports.getRecipeById = async(req,res)=>{
    try{
        const{id} = req.params
        const existingRecipe= await recipes.findById(id)
        res.status(200).json(existingRecipe)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.addRecipe = async(req,res)=>{
    try{
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,
      difficulty,image,mealType,cuisine, caloriesPerServing} = req.body

    const existingRecipe = await recipes.findOne({name})
    if(existingRecipe){
        res.status(400).json("Existing Recipe")
    }
    else{
        const newRecipe = new recipes({
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,
      difficulty,image,mealType,cuisine, caloriesPerServing
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.editRecipe = async(req,res)=>{
    try{
      const {rid}= req.params
      const { name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,
      difficulty,image,mealType,cuisine, caloriesPerServing} = req.body
       const existingRecipe = await recipes.findByIdAndUpdate(rid,{name,ingredients,
        instructions,prepTimeMinutes,cookTimeMinutes,servings, difficulty,image,mealType,cuisine, caloriesPerServing

       },{new:true})
       await existingRecipe.save()
       res.status(200).json(existingRecipe)
    } 
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.deleteRecipe = async (req, res) => {
  try {
    const { rid } = req.params;

    const deletedRecipe = await recipes.findByIdAndDelete(rid);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      deletedRecipe
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const downloads = require('../Models/downloadModel')

exports.addRecipeDownload = async(req,res)=>{
    try{
       const {rid} = req.params
       const {recipeName,recipeCuisine,recipeImage} = req.body
       const userId = req.payload

       const existingDownload = await downloads.findOne({userId,recipeId:rid})
       if(existingDownload){
          existingDownload.count+=1
          await existingDownload.save()
          return res.status(200).json(existingDownload)
       }
       
        const newDownload = new downloads({
            recipeId:rid,recipeName,recipeCuisine,recipeImage,userId,count:1
        })
        await newDownload.save()
       
       res.status(200).json(newDownload)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getDownloadedRecipes= async(req,res)=>{
    try{
      const userId = req.payload
      const downloadedList = await downloads.find({userId})
      res.status(200).json(downloadedList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}



exports.deleteDownloadedRecipe = async (req, res) => {
  try {
    const { rid } = req.params;
    const userId = req.payload;

    const deleted = await downloads.findOneAndDelete({
      userId,
      recipeId: rid
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Downloaded recipe not found"
      });
    }

    res.status(200).json({
      message: "Removed from downloads",
      deleted
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
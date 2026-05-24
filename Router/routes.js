const recipesController=require('../Controllers/recipesController')
const userController = require('../Controllers/userController')
const downloadController = require('../Controllers/downloadController')
const savedRecipeController = require('../Controllers/savedRecipeController')
const feedbackController = require('../Controllers/feedbackController')
const jwt = require('jsonwebtoken')

const express=require('express')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const adminjwtMiddleware = require('../Middlewares/adminJwtMiddleware')

const router=express.Router()

//user
router.post('/signup',userController.userSignUp)
router.post('/signin',userController.signIn)

//feedbacks
router.post('/addfeedback',feedbackController.addFeedback)
router.get('/getfeedbacks',feedbackController.allFeedbacks)

//profile update
router.patch('/profile-update',jwtMiddleware,userController.profileUpdate)

//recipes
router.get('/all-recipes',recipesController.getAllRecipes)
router.get('/get-recipe/:id',jwtMiddleware,recipesController.getRecipeById)

//downloads
router.post('/add-download/:rid',jwtMiddleware,downloadController.addRecipeDownload)
router.get('/get-downloads',jwtMiddleware,downloadController.getDownloadedRecipes)

router.post('/save-recipe/:rid',jwtMiddleware,savedRecipeController.addSavedRecipe)
router.get('/get-savedrecipe',jwtMiddleware,savedRecipeController.getSavedRecipe)
router.delete('/delete-savedrecipe/:srid',jwtMiddleware,savedRecipeController.deleteSavedRecipe)

//ADMIN
router.get('/admin/allrecipes',adminjwtMiddleware,recipesController.getAllRecipes)
router.get('/admin/allfeedbacks',adminjwtMiddleware,feedbackController.allFeedbacks)
router.delete('/admin/deletefeedback/:fid',adminjwtMiddleware,feedbackController.deleteFeedback)
router.get('/admin/users',adminjwtMiddleware,userController.allUsers)
router.post('/admin/addrecipe',adminjwtMiddleware,recipesController.addRecipe)
router.put('/admin/update-recipe/:rid',adminjwtMiddleware,recipesController.editRecipe)
router.delete('/admin/delete-recipe/:rid',adminjwtMiddleware,recipesController.deleteRecipe)

module.exports=router
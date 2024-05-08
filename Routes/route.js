//for path setting
// 1 import express
const express = require('express')
 const userController = require('../Controllers/UserController')
 const projectController =require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig =require('../Middlewares/multerMiddleware')
//2 crate router object of express to define 
//create router object of express to define path 
const router = express.Router()

//Register api call
router.post('/register',userController.register)

//login api call
router.post('/login',userController.login)


// add project api call
router.post('/project/add-project', jwtMiddleware, multerConfig.single('projectImage') ,projectController.addProject)
//get a particular project details api
router.get('/project/get-auser-project',jwtMiddleware,projectController.getAProject)
//get all projects

router.get('/project/all-user-Project',jwtMiddleware, projectController.getAllProjects);
// get 3 project details
router.get('/project/home-project',projectController.getHomeProjects)


// Delete a specific project
router.delete('/project/delete-user-project/:pid', jwtMiddleware, projectController.deleteUserProject);

//update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)

module.exports = router
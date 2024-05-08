const projects= require('../Models/projectSchema')

//add project logic

//add project logic

exports.addProject = async(req,res)=>{
    console.log("Inside the addProject method");
    const {title,language,github,livelink,overview} = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title,language,github,livelink,overview,projectImage);
    console.log(userId);

    try {
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(404).json("Project already exist")
        }
        else{
            const newProject = new projects({title,language,github,livelink,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json({message:err.message})
    }
}

//Get a particular project details
exports.getAProject= async(req,res)=>{
    const userId = req.payload
    try {
        const AProject = await projects.find({userId})
        if (AProject) {
            res.status(200).json(AProject)
        } else {
            res.status(401).json("Can't find project")
        }
    } catch (err) {
        res.status(401).json({message:err.message})
    }
}


//Get 3 projects details for home project
exports.getHomeProjects = async (req,res)=>{
    try {
        const HomeProject = await projects.find().limit(3)
        if (HomeProject) {
            res.status(200).json(HomeProject);
        } else {
            res.status(401).json("Can't find project")
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

//Get all project details
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    // Case insensitive search for language
    let query = {}
    if (searchKey) {
        query.language={$regex: searchKey, $options: "i"}
    }
    try {
      const allProjects = await projects.find(query);
      if (allProjects) {
        res.status(200).json(allProjects);
      } else {
        res.status(401).json("Can't find project");
      }
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  //delete user project
exports.deleteUserProject = async(req,res)=>{
    const{ pid } = req.params//get project ID
    try {
        const deleteUserProject = await projects.findOneAndDelete({_id:pid})//Creates a findOneAndDelete query: automically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserProject)
    } catch (err) {
        res.status(401).json({ message: err.message });
    }

}
//5 update user project
exports.updateUserProject = async (req,res)=> {
    console.log("Inside the update function");
    const {title,language,github,livelink,overview,projectImage} = req.body
    console.log(title,language,github,livelink,overview,projectImage);
    userId = req.payload
    const{ pid } = req.params//get project ID
    const uploadImage = req.file?req.file.filename:projectImage
    try {
       //find particular project,update the data and save the changes
       const updateProject= await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId}) 
       await updateProject.save()
       res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json({message:err.message})
    }
}
  
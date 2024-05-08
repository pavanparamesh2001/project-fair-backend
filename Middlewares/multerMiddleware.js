const multer=require('multer')
//to store multer data,all words are predefined and multer is  used to display image file we selected
const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads') // in the upload file we will store image file that is being imported
    },
    //set image name
    filename:(req,file,callback)=>{
        const filename =`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})
const fileFilter =(req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype=== 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new error("please upload following image extension(png,jpeg,jpg) only... "))
    }
}
const multerConfig =multer({
    storage,fileFilter
    
})

module.exports=multerConfig
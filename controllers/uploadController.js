import asyncHandler from 'express-async-handler'
import File from '../models/FileModel.js'
const uploadFile = asyncHandler(async (req, res)=>{
  try{
      const  filename = req.file.originalname
      var UploadDate = new Date();
      const existFile= await File.find({filename: filename})
      console.log(existFile)
      if(existFile==[] || !existFile || existFile=="")
      {
          const file = await File.create({
            filename,
            UploadDate,
          })
    
          if (file) {
            res.send({ status: "success", message: `${req.file.originalname} aa!` })
            
          } else {
            res.status(401)
            throw new Error('Invalid project data')
          }
      }
      else
      {  
        const fileupdate=await File.updateOne({'filename':filename},{$set:{'UploadDate':UploadDate}},{multi:true});
        if (fileupdate) {
          res.send({ status: "success", message: `${req.file.originalname} uploaded!` })
        } else {
          res.status(401)
          throw new Error('Invalid project data')
        }
      }
     
    
} catch(err){
    res.send({ status: "err", error: err })
   
}
})
export {
  uploadFile
}

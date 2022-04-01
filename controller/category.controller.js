const category = require('../models/category.model');
const {validationResult} = require('express-validator');
const port =process.env.PORT || 5000;


exports.showlist = (request,response)=>{
    category.find()
    .then(results=>{
        return response.json(results);
    }).catch(err=>{
      return response.json(err);
    })
}
exports.delete = (request,response)=>{
    category.deleteOne({_id: request.params.id})
    .then(results=>{
      if(results.deletedCount)
      return response.status(202).json({message:'success'});
       else
        return response.status(204).json({message:'not deleted'});
    }).catch(err=>{
       return response.status(500).json({message:'something wrong....'})
    });
  }
  exports.update = (request,response)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty())
    return response.status().json({errors:errors.array()});
    category.updateOne({_id: request.params.id},
     {
       $set:{
        categoryName: request.body.categoryName,
        categoryImageUrl : "http://localhost:4000/images"+request.file.filename,
      
       }
    })
    .then(results=>{
         return response.json(results);
    }).catch(err=>{
      return response.json(err);
    })   
 }

exports.categoryadd = (request,response)=>{
// console.log(request.body);
    // const errors = validationResult(request);
    // if(!errors.isEmpty())
    // // console.log(errors);
    //  return response.status(400).json({errors:errors.array()});
    
      category.create({
          
        categoryName: request.body.categoryName,
        categoryImageUrl :"https://angularapi-by-taniya.herokuapp.com/images"+request.file.filename
        
    
      })
      .then(results=>{
          
          console.log(results);
          return response.status(201).json(results);
      }).catch(err=>{
          console.log("something wrong");
          return response.status(403).json({message:"something wrong"});
      })
    }
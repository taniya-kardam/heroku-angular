

const { response } = require('express');
const {validationResult}= require('express-validator');
const product = require('../model/product.model');

exports.showlist = (request,response)=>{
    product.find()
    .then(results=>{
        return response.json(results);
    }).catch(err=>{
      return response.json(err);
    })
}
exports.update = (request,response)=>{
   const errors = validationResult(request);
   if(!errors.isEmpty())
   return response.status().json({errors:errors.array()});
   product.updateOne({_id: request.params.id},
    {
      $set:{
     productName : request.body.productName,
     productPrice : request.body.productPrice,
     productQuantity : request.body.productQuantity,
     productDiscription : request.body.productDiscription,
     productImageUrl : "http://localhost:4000/images"+request.file.filename,
     
      }
   })
   .then(results=>{
        return response.json(results);
   }).catch(err=>{
     return response.json(err);
   })   
}
exports.deleteproduct = (request,response)=>{
  product.deleteOne({_id: request.params.id})
  .then(results=>{
    if(results.deletedCount)
    return response.status(202).json({message:'success'});
     else
      return response.status(204).json({message:'not deleted'});
  }).catch(err=>{
     return response.status(500).json({message:'something wrong....'})
  });
}

exports.addProduct = (request,response)=>{

// const errors = validationResult(request);
// if(!errors.isEmpty())
//  return response.status(400).json({errors:errors.array()});
  product.create({
      
    productName : request.body.productName,
    productPrice : request.body.productPrice,
    productQuantity : request.body.productQuantity,
    productDiscription : request.body.productDiscription,
    productImageUrl :"http://localhost:4000/images"+request.file.filename

  })
  .then(result=>{
      console.log(result);
      return response.status(201).json(result);
  }).catch(err=>{
      console.log("something wrong");
      return response.status(403).json({message:"something wrong"});
  })
}
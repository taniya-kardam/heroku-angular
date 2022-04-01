const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
      productName:{
          type:String,
          required:true,
          trim:true
      },
      productPrice:{
          type:Number,
          required:true,
          min:1
      },
      productQuantity:{
           type:Number,
           require:true,
           min:1
      },
      productDiscription:{
          type:String,
          required:true,
          trim:true
      },
      productImageUrl:{
          type:String,
          required:true,
          trim:true
      },
      categoryId: Schema.Types.ObjectId  
});
module.exports = mongoose.model("products",productSchema);
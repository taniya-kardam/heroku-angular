const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true
    },
    categoryImageUrl:{
        type:String,
        required:true,
        trim:true
    }
});
module.exports=mongoose.model("categories",categorySchema);
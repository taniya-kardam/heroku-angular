const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const port =process.env.PORT || 5000;


const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route')
//  const productRoute = require('./routers/product.route');
 const categoryRoute = require('./routes/category.route');
// const cartRoute = require('./routers/cart.route');


const app = express();
mongoose.connect("mongodb+srv://rootdb:rootdb@cluster1.aft55.mongodb.net/mymeal?retryWrites=true&w=majority").then((result)=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('not connected'+err);
})
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/admin',adminRoute);
app.use('/user',userRoute)
//  app.use('/product',productRoute);
 app.use('/category',categoryRoute);
// app.use('/cart',cartRoute);

app.listen(port,()=>{
    console.log("server is running" +port);
});
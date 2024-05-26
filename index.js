const express =  require('express');
require('dotenv').config();
require('./config/mysqlConnection');
const  authRoute   =  require('./routes/authRoute');
const categoryRoute  =  require('./routes/admin/categoryRoute');
const subcategoryRoute  =  require('./routes/admin/subcategoryRoute');
const productRoute  =  require('./routes/admin/productRoute');

const { newRequest } = require('./middleware/logsMiddleware');

const app   =  express();


app.use(express.json());
app.use(newRequest);
app.use('/' , authRoute );
app.use('/admin/category' , categoryRoute);
app.use('/admin/subcategory' , subcategoryRoute);
app.use('/admin/product' ,  productRoute );




app.get('/' , (req , res)=> {
      console.log('working fine');
      res.status(200).send({message: "working fine" , errro : 0  , data : null });
})


app.listen(process.env.PORT || 3000 , ()=> console.log('server is running'));
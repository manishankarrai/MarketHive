const express =  require('express');
require('dotenv').config();
require('./config/mysqlConnection');
const routes =  require('./routes/route');


const { newRequest } = require('./middleware/logsMiddleware');

const app   =  express();

// development mode is on right now 

app.use(express.json());
app.use(newRequest);
app.use('/' , routes );





app.get('/' , (req , res)=> {
      console.log('working fine');
      res.status(200).send({message: "working fine" , errro : 0  , data : null });
})


app.listen(process.env.PORT || 3000 , ()=> console.log('server is running in development mode '));
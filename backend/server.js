const express = require('express');


const morgan = require('morgan');

const bodyParser = require('body-parser')

const userRouter = require('./routes/user')

const adminRouter = require('./routes/admin')

const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('api running')
})

app.use('/user',userRouter);
app.use('/admin',adminRouter);

app.use((req,res,next)=>{
    const error  = new Error('not found');
    error.status(404);
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

app.listen(5000,console.log('server started'))

module.exports = app;

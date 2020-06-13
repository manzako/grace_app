const express=require('express');

const app=express();

const morgan=require('morgan');

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

//il faut des requests
app.use(morgan('dev'));

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error =new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
});

const port=process.env.PORT||5000;


app.listen(port,()=>{
    console.log("ça marche");
    
});
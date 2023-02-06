const express=require('express');
const cors=require('cors');

const app =express();
const router=require('./routers/router');
app.use(cors());
app.use(express.json());
app.use('/api/router',router);
app.use('/',(req,res)=>{
    res.send("Hello first time using railways");
})
const port=4000;
app.listen(port,()=>{
    console.log(`Server is Runung on port ${port}`);
})

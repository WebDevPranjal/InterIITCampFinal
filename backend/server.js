const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const env=require("dotenv").config();
connectDb();
const app=express();

const port=process.env.PORT || 5000;

app.use(express.json());
app.use('/api/clinics',require("./routes/clinicRoutes"));
app.use('/api/hospitals',require("./routes/hospitalRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on the port ${port}`);
});
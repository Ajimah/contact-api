const express = require('express');
const  dotenv = require('dotenv').config();
const connectDB = require ("./db.js")
const routes = require('./routes/contactRoutes.js');
const errorHandler = require('./middleware/errorHandler.js');
const userRoutes = require('./routes/userRoutes.js');



const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contact" , routes);
app.use("/api/users" , userRoutes);
app.use(errorHandler);

app.listen(port , () => {
    connectDB();
    console.log(`listening on port ${port}`);
});
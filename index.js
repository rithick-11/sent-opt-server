const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

const apiRouter = require('./routes/apiRouter.js')

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3099


//api routes
app.use('/api', apiRouter)

//connect db and start server
const connectDbAndRunServer = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('database connected succesfully ');
    app.listen(port, () => {
        console.log(`the server is http://localhost:${port}`);
        
    })
}

connectDbAndRunServer()


require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
connectDB()

// const { sup, hauwa, boom } = require('./middleware/middle')

app.use('/api', require('./routes/authRoutes'))

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    console.log('Connection to database successfull')
})

mongoose.connection.on('error', err => {
    console.log(err);
})
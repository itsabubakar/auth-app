require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 5050
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const uploadImage = require('./config/uploadImage')


app.use(cookieParser())
app.use(cors())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb' }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})
connectDB()

// const { sup, hauwa, boom } = require('./middleware/middle')

app.use('/api', require('./routes/authRoutes'))
app.post('/api/uploadimage', (req, res) => {
    uploadImage(req.body.image)
        .then((url) => res.status(200).json(url))
        .catch((err) => res.status(500).json(err))
})

// * Serve static assets in production, must be at this location of this file

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    console.log('Connection to database succesful')
})

mongoose.connection.on('error', err => {
    console.log(err)
})
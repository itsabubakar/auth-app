const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.DATABASE_URL)
        // console.log('Connection to database successfull')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
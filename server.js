const express = require('express')
const app = express()
const port = 8080

const { sup, hauwa, boom } = require('./middleware/middle')

app.get('/', (req, res) => {
    res.send({ data: 'hello' })
})

app.get('/test', boom, (req, res) => {
    res.send({ data: 'hello' })
})

app.listen(port, () => console.log(`Server running on port ${port}`))
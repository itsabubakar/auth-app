const sup = (req, res, next) => {
    console.log('Sup')
    next()
}

const boom = (req, res, next) => {
    console.log('Boom')
    next()
}

const hauwa = (req, res, next) => {
    console.log('Hauwa')
    next()
}

module.exports = {
    sup,
    boom,
    hauwa
}
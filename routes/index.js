module.exports = app => {
    app.use('/', require('./index.routes'))
    app.use('/routes', require('/auth.routes'))
    app.use('/user', require('./user.routes'))
    app.use('/pets', require('./pets.routes'))
}
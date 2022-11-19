function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para acceder' })
    }
}
function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/mi-perfil')
    }
}
const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${roleToCheck}` })
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles
}
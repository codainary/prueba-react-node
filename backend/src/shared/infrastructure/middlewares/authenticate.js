import passport from '../middlewares/authMiddleware.js'

export const authenticate = passport.authenticate('jwt', { session: false })

// module.exports = authenticate;

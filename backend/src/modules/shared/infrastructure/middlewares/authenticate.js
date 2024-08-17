const passport = require('../../../usuarios/infrastructure/libs/passport/JwtStrategy');

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = authenticate;

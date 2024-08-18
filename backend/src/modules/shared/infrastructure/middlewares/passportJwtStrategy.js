const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const PrismaUsuarioRepository = require('../../../usuarios/infrastructure/persistence/PrismaUsuarioRepository')


const usuarioRepository = new PrismaUsuarioRepository();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const usuario = await usuarioRepository.findById(jwt_payload.id);
            if (usuario) {
                return done(null, usuario);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

module.exports = passport;

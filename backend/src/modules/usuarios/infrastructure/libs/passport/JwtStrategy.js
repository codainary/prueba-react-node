const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const passport = require('passport');
const PrismaUsuarioRepository = require('../../persistence/PrismaUsuarioRepository');

const usuarioRepository = new PrismaUsuarioRepository();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Configuración de la estrategia JWT
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const usuario = await usuarioRepository.findById(jwtPayload.id);
      if (usuario) {
        return done(null, usuario);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const PrismaUsuarioRepository = require('../../../usuarios/infrastructure/persistence/PrismaUsuarioRepository');

const usuarioRepository = new PrismaUsuarioRepository();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// Configura la estrategia JWT con Passport
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

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'No autenticado' });

        req.user = user;
        next();
    })(req, res, next);
};

// Middleware para manejar excepciones
const unless = (middleware, paths) => {
    return (req, res, next) => {
        const url = req.originalUrl;
        const method = req.method;
        if (paths.some(path => path.url === url && path.methods.includes(method))) {
            return next();
        }
        return middleware(req, res, next);
    };
};

// Middleware de autorización basado en roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.rol)) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado' })
        }
    };
};

module.exports = { authenticateJWT, authorizeRoles, unless };

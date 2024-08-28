import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import PrismaUsuarioRepository from '../../../modules/usuarios/infrastructure/persistence/PrismaUsuarioRepository.js';
import config from '../config/envConfig.js';

import { prisma } from '../config/prismaClient.js';
const usuarioRepository = new PrismaUsuarioRepository(prisma);

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecretKey
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

export const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'No autenticado' });

        req.user = user;
        next();
    })(req, res, next);
};

export const unless = (middleware, paths) => {
    return (req, res, next) => {
        const url = req.originalUrl;
        const method = req.method;
        if (paths.some(path => path.url === url && path.methods.includes(method))) {
            return next();
        }
        return middleware(req, res, next);
    };
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.rol)) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado' });
        }
    };
};

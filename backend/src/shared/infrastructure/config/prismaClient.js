import { PrismaClient } from '@prisma/client';
import config from './envConfig.js';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: config.databaseUrl,
        },
    },
});

export default prisma;

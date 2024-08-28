import { PrismaClient } from '@prisma/client';
import config from './envConfig.js';

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: config.databaseUrl,
        },
    },
});

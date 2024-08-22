const { PrismaClient } = require('@prisma/client');
const config = require('./envConfig');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: config.databaseUrl,
        },
    },
});

module.exports = prisma;

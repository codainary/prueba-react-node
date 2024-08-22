const dotenv = require('dotenv');

switch (process.env.NODE_ENV) {
    case 'development':
        dotenv.config({ path: '.env.development' });
        break;
    case 'production':
        dotenv.config({ path: '.env.production' });
        break;
    case 'test':
        dotenv.config({ path: '.env.test' });
        break;
    default:
        dotenv.config({ path: '.env' });
}

module.exports = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 5000,
};

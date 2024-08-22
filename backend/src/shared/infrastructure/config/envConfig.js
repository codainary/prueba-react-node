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
    databaseType: process.env.DATABASE_TYPE || 'sql',  // 'sql' o 'mongodb'
    // mongoUri: process.env.MONGO_URI,
    jwtSecretKey: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 5000,
};
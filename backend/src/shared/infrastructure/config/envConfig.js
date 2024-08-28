import dotenv from 'dotenv';

// Determinar el archivo .env a cargar según el entorno
const env = process.env.NODE_ENV || 'development'; // 'development' por defecto
console.log("env: " + env);

switch (env) {
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
      break;
}
// export default {
//     databaseType: process.env.DATABASE_TYPE || 'sql',  // 'sql' o 'mongodb'
//     jwtSecretKey: process.env.JWT_SECRET,
//     databaseUrl: process.env.DATABASE_URL,
//     port: process.env.PORT || 5000,
// };

// Verificar y exportar las variables de configuración necesarias
const config = {
  databaseUrl: process.env.DATABASE_URL || 'sql',
  jwtSecretKey: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};

// Validar que las variables de entorno requeridas estén configuradas
const requiredEnvVars = ['JWT_SECRET'];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(`Las siguientes variables de entorno faltan o están vacías: ${missingVars.join(', ')}`);
}

export default config;

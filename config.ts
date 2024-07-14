import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    dbUrl: process.env.DATABASE_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
  }
};

export default config;
import dotenv from 'dotenv';
dotenv.config();

const PRODUCTION_DATABASE = process.env.PRODUCTION_DATABASE;
const TEST_DATABASE = 'mongodb://localhost/api-expert-test';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
const PORT = process.env.PORT || 8080;

export { 
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY
};
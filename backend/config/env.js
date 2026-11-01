import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pixelix',
  CLIENT_URL: process.env.CLIENT_URL || 'https://pixelix.co.in',
  EMPLOYEE_URL: process.env.EMPLOYEE_URL || 'https://employee.pixelix.co.in',
  OWNER_URL: process.env.OWNER_URL || 'https://owner.pixelix.co.in',
  JWT_SECRET: process.env.JWT_SECRET || 'pixelix_super_secret_jwt_key_2026_terracotta',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || '"Pixelix Systems" <no-reply@pixelix.co.in>',
  // AI & WhatsApp Integration
  AI_PROVIDER: process.env.AI_PROVIDER || 'none',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  WHATSAPP_DEFAULT_NUMBER: process.env.WHATSAPP_DEFAULT_NUMBER || '917056063863'
};

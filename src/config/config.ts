export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  databaseUrl: process.env.DATABASE_URL,
  frontBaseUrl: process.env.FRONT_BASE_URL,
  backBaseUrl: process.env.BACK_BASE_URL,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  smtp: {
    host: process.env.SMTP_HOST,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  jwt: {
    secret: process.env.SECREST,
    ttl: process.env.TTL,
  },
});

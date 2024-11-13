const { Pool } = require('pg');

module.exports = new Pool({ 
  database_public_url:process.env.DATABASE_PUBLIC_URL,
  database_url:process.env.DATABASE_URL,
  pgdata:process.env.PGDATA,
  pgdatabase:process.env.PGDATABASE,
  pghost:process.env.PGHOST,
  pgpassword:process.env.PGPASSWORD,
  pgport:process.env.PGPORT,
  pguser:process.env.PGUSER,
  postgres_db:process.env.POSTGRES_DB,
  postgres_password:process.env.POSTGRES_PASSWORD,
  postgres_user:process.env.POSTGRES_USER,
  ssl_cert_days:process.env.SSL_CERT_DAYS,  
});
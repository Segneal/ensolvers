import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST:
    process.env.DB_URL || "localhost",
  USER: process.env.DB_OWNER || "root",
  PASSWORD: process.env.PASSWORD || "root",
  DB: process.env.DB || "ensolvers",
  PORT: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;

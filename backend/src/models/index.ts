import dbConfig from "../configs/dbConfig";
import { Sequelize } from "sequelize";
import { Dialect } from "sequelize/types";
import { Note, initNote } from "./Note";
import { Tag, initTag } from "./Tag";
import mysql from "mysql2/promise";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT as number,
  dialect: dbConfig.dialect as Dialect,
});

const db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      port: dbConfig.PORT as number,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
    await connection.end();
    console.log("Database created successfully!");
    sequelize.authenticate();
    //init tables
    initNote(sequelize);
    initTag(sequelize);
    // Definir la relación many-to-many
    Note.belongsToMany(Tag, {
      through: "NoteTag",
      foreignKey: "noteId",
      timestamps: false,
    });
    Tag.belongsToMany(Note, {
      through: "NoteTag",
      foreignKey: "tagId",
      timestamps: false,
    });
    return sequelize.sync();
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};

export default db;

import { Model, DataTypes, Sequelize } from "sequelize";

export class Note extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public lastModified!: Date;
}

export const initNote = (sequelize: Sequelize) => {
  Note.init(
    {
      id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      lastModified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "notes",
      sequelize,
      timestamps: false,
    }
  );
};

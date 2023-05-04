import { Model, DataTypes, Sequelize } from "sequelize";
import { Note } from "./Note";

export class Tag extends Model {
  public id!: number;
  public description!: string;
  public notes?: Note[];
}
export const initTag = (sequelize: Sequelize) => {
  Tag.init(
    {
      id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "tags",
      sequelize,
      timestamps: false,
    }
  );
};

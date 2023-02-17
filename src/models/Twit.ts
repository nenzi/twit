import { Table, Column, Model, BelongsTo, DataType, AllowNull, ForeignKey } from "sequelize-typescript";
import User from "./Users";

@Table({ timestamps: true, tableName: "twits" })
export class Twit extends Model {
  @Column(DataType.STRING)
  text: string;

  @Column(DataType.NUMBER)
  likes: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  // Model Associations

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;
}

export default Twit;

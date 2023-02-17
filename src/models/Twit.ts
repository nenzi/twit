import { Table, Column, Model, BelongsTo, DataType, AllowNull, ForeignKey, HasMany } from "sequelize-typescript";
import User from "./Users";
import Comment from "./Comment";

@Table({ timestamps: true, tableName: "twits" })
export class Twit extends Model {
  @Column(DataType.STRING)
  text: string;

  @Column(DataType.INTEGER)
  likes: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  // Model Associations

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;

  @HasMany(() => Comment)
  comments: Comment[];
}

export default Twit;

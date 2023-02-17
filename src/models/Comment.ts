import { Column, Model, Table, ForeignKey, AllowNull, DataType, BelongsTo } from "sequelize-typescript";
import Twit from "./Twit";

@Table({ timestamps: true, tableName: "comments" })
export class Comment extends Model {
  @Column
  Text: string;

  @ForeignKey(() => Twit)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  twitId!: number;

  // Model Associations
  @BelongsTo(() => Twit, { onDelete: "CASCADE" })
  Twit: Twit;
}

export default Comment;

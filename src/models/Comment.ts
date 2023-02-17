import { Column, Model, Table, ForeignKey, AllowNull, DataType, BelongsTo } from "sequelize-typescript";
import Tweet from "./Twit";

@Table({ timestamps: true, tableName: "comments" })
export class Comment extends Model {
  @Column
  Text: string;

  @ForeignKey(() => Tweet)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  tweetId!: number;

  // Model Associations
  @BelongsTo(() => Tweet, { onDelete: "CASCADE" })
  Tweet!: Tweet;
}

export default Comment;

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true, tableName: "otp" })
export class Otp extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  otp!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  expirationTime!: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  verified!: boolean;

  @Column(DataType.DATE)
  verifiedAt?: Date;
}

export default Otp;

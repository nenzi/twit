import { Table, Column, Model, Default, DataType, Index, AllowNull, HasOne } from "sequelize-typescript";
import { AuthIdentity } from "../interface";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

@Table({ timestamps: true, tableName: "users" })
export class User extends Model {
  @Column
  fullName: string;

  @Index({ name: "email-index", type: "UNIQUE", unique: true })
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  password: string;

  @Default(UserStatus.INACTIVE)
  @Column
  status: UserStatus;

  @Default(AuthIdentity.USER)
  @Column(DataType.ENUM(AuthIdentity.USER, AuthIdentity.ADMIN))
  type: AuthIdentity;
}
export default User;

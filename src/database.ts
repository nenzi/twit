// Import packages
import { Sequelize } from "sequelize-typescript";

// Import configs
import config from "./config/configSetup";

// Import models
import User from "./models/Users";
import Otp from "./models/Otp";
import Twit from "./models/Twit";
import Comment from "./models/Comment";

const sequelize = new Sequelize(config.DB_LINK, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: "postgres",
  logging: false,
  dialectOptions: {},
  models: [User, Otp, Twit, Comment],
});

const initDB = async () => {
  await sequelize.authenticate();
  await sequelize
    // .sync({})
    .sync({ alter: true })
    .then(async () => {
      console.log("Database connected!");
    })
    .catch(function (err: any) {
      console.log(err, "Something went wrong with the Database Update!");
    });
};
export { sequelize, initDB };

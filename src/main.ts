import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { api } from "./routes/api";
import { isAuthorized } from "./middleware/authentication";
import { initDB } from "./database";

const app: Application = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

initDB();
app.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.BASEURL}:${process.env.PORT || 4000}`);
});

// routes
app.all("*", isAuthorized);
app.use(api);

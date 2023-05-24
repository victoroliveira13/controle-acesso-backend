import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import cors from "cors";

import "./database";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(routes);

app.listen(3333, () => console.log("Server is running"));
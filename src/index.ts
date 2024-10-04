import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import postRequest from "./dtos/post.request";
import postHandler from "./utils/post.handler";
import getRequest from "./dtos/get.request";
import getHandler from "./utils/get.handler";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.post("/", (req: Request, res: Response) => {
  const body: postRequest = req.body;
  const response = postHandler.buildResponse(body);
  res.json(response);
});

app.get("/", (req: Request, res: Response) => {
  const data: getRequest = req.query;

  const response = getHandler.buildResponse(data);

  res.json(response);
});

app.listen(port, () => {
  console.log("server is running", port);
});

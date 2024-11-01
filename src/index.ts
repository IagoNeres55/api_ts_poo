import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import postRequest from "./dtos/post.request";
import postHandler from "./utils/post.handler";
import getRequest from "./dtos/get.request";
import getHandler from "./utils/get.handler";
import axios from "axios";

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

app.get("/site-mercado", async (req: Request, res: Response) => {
  const url =
    "https://service.sitemercado.com.br/api/v1/pedido/2675-E144513107";
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCJ9.eyJhdWQiOiI1ZWI5YjY2Zi0zN2QwLTQxY2MtOTY1My03MTc1MDUwNjYyODIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vN2M0YmY1MTUtNTk5MC00YThmLTg3N2UtYzQ2YWNjYTI5YjQ1L3YyLjAiLCJpYXQiOjE3MzA0NjMwNzEsIm5iZiI6MTczMDQ2MzA3MSwiZXhwIjoxNzMwNDY2OTcxLCJhaW8iOiJrMkJnWU5nV0cxS3k1NkJNeUlHSDArODdaOXkrbGUwb1dHeFNNN2MvckgrMVRZRmY1ZzhBIiwiYXpwIjoiMjNmOTdhZWMtZmJiMC00MmE4LTgxZmYtZWJmMTcyNWI1MjZiIiwiYXpwYWNyIjoiMSIsIm9pZCI6ImQ4ZTkyYzA2LTI5Y2YtNDM1OS04YmU0LWFjYmUwYWMxNWQzOCIsInJoIjoiMC5BUW9BRmZWTGZKQlpqMHFIZnNScXpLS2JSVy0ydVY3UU44eEJsbE54ZFFVR1lvSUtBQUEuIiwicm9sZXMiOlsiQ2xpZW50ZS5HZXQiLCJQZWRpZG8uSXRlbXMiLCJMb2phLkdldCIsIlBlZGlkby5HZXQiLCJQcm9kdXRvSW50ZWdyYWNhby5Qb3N0IiwiUGVkaWRvLkV2ZW50b3MiLCJQZWRpZG8uU3RhdHVzIiwiUHJvZHV0b0ludGVncmFjYW8uUGF0Y2giXSwic3ViIjoiZDhlOTJjMDYtMjljZi00MzU5LThiZTQtYWNiZTBhYzE1ZDM4IiwidGlkIjoiN2M0YmY1MTUtNTk5MC00YThmLTg3N2UtYzQ2YWNjYTI5YjQ1IiwidXRpIjoiY3dvejZwbFFGME9PdGxuV3pQQmJBQSIsInZlciI6IjIuMCJ9.UkNxroB4oAuoFvchE0I-eVXFCYoZDWrHSoByee-inlTke1oI1_DW_QKQ2XcJSzKgoh5ktyPpLhqvNBd0kWdA6K-Nbt_c8ii1evLT6LN-fuzHFHwFpr3A2uTmPMF5rpsrC9b0iFS4cG0Tpmu47Vbw5dMQgVT0dKN0atM_rGUBdWcg_I6nyj-lp9oqrF9dlbiMh9c3-ySjcjyjpainXWv2I_e18bWqwuKv-RWE2gFv8dL7vb17LhYjdI1IULMpdN8DtLxLANpJbQgIFtvsGoToGwgXHfIOehJMQpCfRij64kIX15ssBUpUPa2-vAzhAPEVIdvIqCWkDD69ziLCzTcgZw"; // Coloque seu token aqui

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Retornar os dados recebidos da API externa
    res.json(response.data);
  } catch (error: any) {
    // Retornar erro se a requisição falhar
    console.error("Erro ao buscar dados:", error);
    res.status(error.response?.status || 500).json({
      message: "Erro ao buscar dados da API",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("server is running", port);
});

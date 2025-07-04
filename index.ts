import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.send('Hello World!');
});


app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})
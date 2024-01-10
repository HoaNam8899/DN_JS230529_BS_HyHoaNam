import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import TaskRouter from "./routes/task.route"


const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:

dotenv.config();

const app: Express = express();
const port = 3000;


app.use(cors(options));
app.use(express.json());

app.use("/api/v1", TaskRouter)

app.listen(port, () => {
    console.log(`server running at ${port}`)
})
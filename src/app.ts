import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import routes from './routes';
import connectRedis from './middleware/redis';

// connect to Redis
connectRedis;

const app = express();
// -------------------------------
app.use(express.json() );
// -------------------------------
app.use(routes);

// -------------------------------
const port = process.env.PORT;
app.listen(port , () =>{
  console.log(`App started at http://localhost:${port}`);
})
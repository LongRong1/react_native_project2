import dotenv from 'dotenv';
import express from 'express';
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import job from "./config/cron.js"
import transactionsRoute from './routes/transactionsRoutes.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(rateLimiter);

app.use(express.json());
const PORT = process.env.PORT || 3001;


app.get("/api/heath",(req, res) =>{
  res.status(200).json({status:"ok"});
});

app.use("/api/transactions", transactionsRoute);
// app.use("/api/products", transactionsRoute);

initDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

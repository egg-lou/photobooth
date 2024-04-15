import { handler } from './build/handler.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(handler);
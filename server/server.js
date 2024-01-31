import express, { json } from 'express';
import router from './routes/route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors());

app.use("/", router);

app.listen(PORT, () => console.log(`Server running on Port: http://localhost:${PORT}`))


import express, { json } from 'express';
import router from './routes/route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json())
app.use(cors());

// Routes
app.use("/", router);

// Listener
app.listen(PORT, () => console.log(`Server running on Port: http://localhost:${PORT}`))


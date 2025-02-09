import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import taskRoutes from "./routes/route"; // Ensure the correct import name
import cors from 'cors';


// In your server.ts file
const corsOptions = {
  origin:process.env.FRONTEND_PATH,
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // For legacy browser support
};


const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());

app.use('/api', taskRoutes);
// Sample route
app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

// After your routes but before app.listen()
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

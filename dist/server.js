"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const route_1 = __importDefault(require("./routes/route")); // Ensure the correct import name
const cors_1 = __importDefault(require("cors"));
// In your server.ts file
const corsOptions = {
    origin: process.env.FRONTEND_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // For legacy browser support
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use('/api', route_1.default);
// Sample route
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
// After your routes but before app.listen()
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

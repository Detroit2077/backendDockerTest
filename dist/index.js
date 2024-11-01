"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
// Initialize Prisma Client and Express
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// POST endpoint to create a new user
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        // Check if email already exists
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Create a new user in the database
        const newUser = yield prisma.user.create({
            data: {
                email,
                name,
                password,
            },
        });
        // Return the created user
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
}));
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

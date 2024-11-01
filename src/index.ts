import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.post("/user", async (req: Request, res: Response): Promise<any> => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

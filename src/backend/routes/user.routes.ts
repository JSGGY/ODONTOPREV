import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();


dotenv.config();

router.use(bodyParser.json());

const handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: "Unknown error" });
    }
};



router.get("/api/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error: unknown) {
        handleError(error, res);
    }
});




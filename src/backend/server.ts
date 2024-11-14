import Router, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import user from './routes/user';

dotenv.config();

const router = Router();
const PORT = process.env.PORT || 3000;


router.use(cors());
router.use(bodyParser.json());
router.use(user);
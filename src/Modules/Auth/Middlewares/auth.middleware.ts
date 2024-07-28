import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable ()
export class AuthMiddleware implements NestMiddleware {
    use (req:Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        if (email && password)
            next();
        else res.status(400).json({message: "Faltan datos de Login"}) 
    }
}
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable ()
export class UserDataMiddleware implements NestMiddleware {
    use (req:Request, res: Response, next: NextFunction) {
        const {name, email, password, address, phone} = req.body;
        console.log(name, email, password, address, phone)
        if (name && email && password && address && phone)
            next();
        else res.status(400).json({message: "Faltan datos de Usuario"}) 
    }
}
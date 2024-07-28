import { NextFunction, Request, Response } from "express";

export function loggerGlobal (req:Request, res: Response, next: NextFunction) {
    console.log(`Fecha y Hora: ${new Date()}. Estas ejecutando un metodo ${req.method} en la ruta ${req.url} `);
    next();
}
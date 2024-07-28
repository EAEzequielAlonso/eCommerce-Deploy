import { HttpException, HttpStatus } from "@nestjs/common";

export class DataDto {
    functionTry: Function
    codeError?:number = HttpStatus.INTERNAL_SERVER_ERROR
    message?:string = "Internal Server Error"
    priority?:boolean = false
}

export const ErrorManager = async (dataEntry: DataDto ): Promise<any> => {
    try {
        return await dataEntry.functionTry();
    } catch (error) {
        console.log("estamos adentro del Error Manager")
        const { codeError, message, priority} = dataEntry
        throw new HttpException({
            status: priority ? codeError ?? error.status : error.status ?? codeError, 
            error: priority ? message ?? error.message : error.message ?? message,
        }, priority ? codeError ?? error.status : error.status ?? codeError)
    }
}
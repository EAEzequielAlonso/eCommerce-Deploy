import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    // reflector es para poder leer la metadata que definimos en el decorador con SetMetadata
    constructor(private readonly reflector: Reflector){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        // con getAllAndOverride de reflector. puedo acceder al dato del metadata. le paso la clave que quiero y le paso un array diciendo de donde voy a sacar esa clave.
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass(), 
        ])
        
        const request = context.switchToHttp().getRequest();
        //como esto pasa despues del Auth.guard. ya tendriamos el user disponible
        // es importante que valla el auth antes que el roles porque no puedo asignar roles a un usuario que no esta autenticado
        const user = request.user;
        // la funcion some del array devuelve true si cada uno de los roles que hay en el array esta incluido dentro del array "roles" que viene en user"
        //const roles:Array<Role> = user.roles;
        const hasRole = () => requiredRoles.some((role) => user?.roles?.includes(role))
        const valid = user && user.roles && hasRole();
        if (!valid) throw new ForbiddenException("No tienes permiso ni acceso a esta ruta")
        return true;
    }
} 
import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enum"

// Este es un decorador personalizado
// se llamara Roles, recibe por parametros un array con todos los roles del usuarioque se almacena en "roles"
// con SetMetadata lo que hace es guardar en Metadata, la KEY "roles" con el valor roles, que es el array recibido
// la Metadata es como un diccionario de datos que viene con cada request que recibimos. Entonces quedaria accesible al necesitar esa informacion
export const Roles = (...roles:Role[]) => SetMetadata("roles", roles);
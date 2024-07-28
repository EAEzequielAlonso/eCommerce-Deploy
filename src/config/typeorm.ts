import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from "dotenv"
import { registerAs } from "@nestjs/config";

dotenvConfig({path: ".env"})

const config = {
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,

    //en un sistema productivo es mejor correr las migraciones por afuera y tener esto en false. ya que en true se hace automaticamente cuando corro mi aplocacion
    synchronize: true, 
    logging:false,
    //dropSchema:true,

    // definimos donde debe buscar las entidades
    entities: ["dist/**/*.entity{.ts,.js}"], 

    // definimos donde estan las migraciones
    migrations: ["dist/migrations/*{.ts,.js}"],
}

// nospermite tener una clave typeorm que su valor va a ser config
export default registerAs ("typeorm", () => config) 

export const connectionSource = new DataSource(config as DataSourceOptions)
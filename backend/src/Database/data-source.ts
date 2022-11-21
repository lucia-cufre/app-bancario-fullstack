import { DataSource } from "typeorm"
require("dotenv").config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PS_HOST,
    port: 5432,
    username: process.env.PS_USERNAME,
    password: process.env.PS_PASSWORD,
    migrations: ["./src/Database/migrations/*.ts"],
    entities:["./src/Entities/*.ts"]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


import 'dotenv/config'
import express from "express"
import { starBD } from './src/config/database.js'
import { db_relations } from './src/models/index.js'
import { userRoutes } from './src/routes/user.routes.js'

const app = express()

app.use(express.json())

db_relations();

const PORT = process.env.PORT || 2000;

app.use("/api", userRoutes)



app.listen(PORT, async () =>  {
    await starBD()
    console.log("se prendio el server");
})
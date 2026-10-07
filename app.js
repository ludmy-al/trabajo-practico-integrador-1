import 'dotenv/config'
import express from "express"
import { starBD } from './src/config/database.js'
import { db_relations } from './src/models/index.js'
import { userRoutes } from './src/routes/user.routes.js'
import { profileRoutes } from './src/routes/profile.routes.js'
import { tagRoutes } from './src/routes/tag.routes.js'
// import { articleRoutes } from './src/routes/article.routes.js'
// import { articleTagRoutes } from './src/routes/articleTag.routes.js'

const app = express()

app.use(express.json())

db_relations();

const PORT = process.env.PORT || 2000;

app.use("/api", userRoutes)
app.use("/api", tagRoutes)
app.use("/api", profileRoutes)
app.use("/api", articleRoutes)
// app.use("/api", articleTagRoutes)



app.listen(PORT, async () =>  {
    await starBD()
    console.log("se prendio el server");
})
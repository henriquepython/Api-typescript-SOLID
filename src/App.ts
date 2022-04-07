import express from 'express'
import { router } from './routes'
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json"
const app = express()

//swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json());
app.use(router);

export { app }


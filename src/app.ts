import express from 'express'
import bodyParser from 'body-parser'
import { router as issues } from "./routes/api/issues";
import { router as agents } from "./routes/api/agents";

export const app = express()

app.use(bodyParser.json())

app.use('/api/issues', issues)
app.use('/api/agents', agents)


   
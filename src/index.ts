import express from 'express'
import bodyParser from 'body-parser'
// import fs from "fs";
// import path from "path";
import { router as issues } from "./routes/api/issues";
import { router as agents } from "./routes/api/agents";

const app = express()

app.use(bodyParser.json())

// fs.writeFile(path.join(path.dirname(__dirname),'src/mock','mock.json'),JSON.stringify(r), err => {
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log('file created')
//   }

// })

app.use('/api/issues', issues)
app.use('/api/agents', agents)

const port = parseInt(process.env.LISTEN_PORT ?? '3000', 10)

// console.log(path.join(path.dirname(__dirname),'test'))

app.post('/newissue', (req, res) => {
  res.redirect(307,'/api/issues')
})

app.get('/start', (req, res) => {
  res.redirect('/api/issues')
})

app.post('/', (req, res) => {
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

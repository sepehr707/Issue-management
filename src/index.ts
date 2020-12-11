import { app } from "./app";

const port = parseInt(process.env.LISTEN_PORT ?? '3000', 10)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

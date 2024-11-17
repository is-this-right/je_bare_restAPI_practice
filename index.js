import express from 'express'
const app = express()
const PORT = 8080;
// import * as db from './db.js';
import { connect, getAllArticles, getArticle, createArticle } from './db.js';

const connection = await connect();
app.use(express.json())

app.get("/articles", async (req, res) => {
    let results = await getAllArticles(connection)
    res.status(200).send(results)
})

app.get("/articles/:id", async (req, res) => {
    let result = await getArticle(connection, req.params.id)
    res.status(200).send(result)
})

app.post("/add/", async (req, res) => {
    let result = await createArticle(connection, req.body)
    let response = "Created New Article using: " + JSON.stringify(getArticle(connection, req.body.id))
    res.status(200).send(result)
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
import express from 'express'
const app = express()
const PORT = 8080;
import { createConnection } from 'mysql2/promise';
const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogging_api'
});

// app.use(express.json())

async function getArticles(){
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM articles;"
        );
        console.log("Results");
        console.log(results);
        return results;
    } catch (error) {
        console.log("===== ERROR =====")
        console.log(error);
    }
}

app.get("/article", async (req, res) => {
    let results = await getArticles()
    res.status(200).send(results)
})

app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`)
})
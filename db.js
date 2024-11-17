import { createConnection } from 'mysql2/promise';

export async function connect() {
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'blogging_api'
    });
    return connection;
}

export async function getAllArticles(connection){
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

export async function getArticle(connection, id){
    try {
        const [results] = await connection.query(
            `SELECT * FROM articles WHERE id=?`, [id]
        );
        console.log("Results");
        console.log(results);
        return results;
    } catch (error) {
        console.log("===== ERROR =====")
        console.log("Location: ./db.js\nexport async function getArticle(connection, id)")
        console.log(error);
    }
}

export async function createArticle(connection, params){
    try {
        console.log(params.id)
        const [results] = await connection.execute(
            `INSERT INTO articles (id, article_name, author, body) VALUES(?, ?, ?, ?)`,[
                params.id,
                params.article_name,
                params.author,
                params.body
            ]
        )
    } catch (error) {
        console.log("===== ERROR =====")
        console.log("Location: ./db.js\nexport async function createArticle(connection, params)")
        // console.log("Parameters:")
        // console.log("params: ", params)
        // console.log("params.id: ", params.id)
        console.log(error);
    }
}
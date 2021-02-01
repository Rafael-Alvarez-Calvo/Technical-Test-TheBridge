const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const corsEnable = require("cors");

const server = express();
const listeningPort = process.env.PORT || 8888;

server.use(bodyParser.urlencoded({"extended" : false}));
server.use(bodyParser.json());
server.use(corsEnable({origin : `http://localhost:3000`, credentials : true}));

function connectionDB() {
    return mysql.createConnection({
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "technictest",
        "multipleStatements" : true
    });
}

function PromiseConnectionDB(){
    return new Promise((resolve, reject) => {
        const DBconnection = connectionDB();
        if (DBconnection){
            DBconnection.connect(err => {
                if (err) {
                    reject("DBError");
                }
                resolve(DBconnection);
            });
        }
        else
            reject("DBError");
    });    
}

server.get("/get-count-articles", (req, res) => {

    PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `SELECT COUNT(*) as totalArticles FROM articles`;
            DBconnection.query(sql, (err, result) => {
                if(err)
                    res.send({"res" : "0", err})

                else if(result.length) {

                    res.send({"res" : "1", result})

                } else {
                    res.send({"res" : "-1", "msg" : "No hay datos", result})
                }
                DBconnection.end()
            });
        })
        .catch(err => console.error(err))
});

server.get("/get-articles", (req, res) => {
    
    const { page } = req.query;
    
    if(page){
        
        const limit = 10;
        const offset = (page - 1) * limit;

        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `SELECT * FROM articles LIMIT ? OFFSET ?`;
            DBconnection.query(sql, [limit, offset], (err, result) => {
                if(err)
                    res.send({"res" : "0", err})
                else if(result.length) {

                    var articlesResult = {
                        'articles_page_count': result.length,
                        'page_number': page,
                        'products': result
                    }

                    res.send({"res" : "1", articlesResult})

                } else {
                    res.send({"res" : "-1", "msg" : "No products in this page", result})
                }
                DBconnection.end()
            });
        })
        .catch(err => console.error(err))

    } else {
        res.send({"res" : "-2", "msg" : "No hay pagina"})
    }
});

server.get("/get-suppliers", (req, res) => {

    const { article_id } = req.query;

    if(article_id){
        
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `SELECT SUP.* FROM suppliers AS SUP
                                      JOIN articlesupplier AS ARSUP ON ARSUP.ref_idSupplier = SUP.supplier_id
                                      WHERE ARSUP.ext_articleId = ?;`;

            DBconnection.query(sql, [article_id], (err, result) => {
                if(err)
                    res.send({"res" : "0", err})

                else if(result.length) {

                    res.send({"res" : "1", result})

                } else {
                    res.send({"res" : "-1", "msg" : "No supplier for this product", result})
                }
                DBconnection.end()
            });
        })
        .catch(err => console.error(err))

    } else {
        res.send({"res" : "-2", "msg" : "No hay id de articulo"})
    }
});

server.listen(listeningPort);



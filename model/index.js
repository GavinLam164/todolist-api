const mysql = require("mysql");

const openConnection = () =>
    mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "123",
        database: "todolist",
        dateStrings: true,
    });

const withConnection = (next) => {
    return new Promise((resolve, reject) => {
        const conn = openConnection();
        conn.connect();
        next(conn, resolve, reject);
        conn.end;
    });
};

exports.exec = (sql) => {
    return withConnection((conn, resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
            conn.end();
        });
    });
};

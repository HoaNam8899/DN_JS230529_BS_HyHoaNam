import mysql from "mysql2";

const connectDB = mysql.createConnection({ // connection co the dat ten duoc
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "tasks"
})

export default connectDB;
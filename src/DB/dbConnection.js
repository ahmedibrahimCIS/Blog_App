import mysql from "mysql2";

//connection
const connectionDB = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

connectionDB.connect((error)=>{
    if (error) {
        console.log(`Error connectig to database: ${error.message}`);
    }else{
        console.log("Connected to database...");
    }
})

export default connectionDB;
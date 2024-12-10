import mysql from "mysql2";

//connection
const connectionDB = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"root",
    password:"root",
    database:"blog_app"
})

connectionDB.connect((error)=>{
    if (error) {
        console.log(`Error connectig to database: ${error.message}`);
    }else{
        console.log("Connected to database...");
    }
})

export default connectionDB;
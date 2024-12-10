import connectionDB from "../../DB/dbConnection.js";

const signup = (req,res)=>{
    const { email, password, first_name, last_name, gender} = req.body;
    connectionDB.execute(`SELECT email FROM users WHERE email=?;`,[email],
        (error,result)=>{
        if (error) {return res.status(500).json({message:error}) }
        if (result.length>0) { return res.status(409).json({message: "User already exists"}) }

        connectionDB.execute(`INSERT INTO users(email,password,first_name,last_name,gender) VALUES(?,?,?,?,?)`,
            [email, password, first_name, last_name, gender],(error,result)=>{
                if (error | result.affectedRows === 0) {
                    return res.status(500).json({message:"Failed to execute query"})
                }
                else{
                    return res.status(201).json({message:"User created successfully", data:result})
                }
            })

    })

}

const login = (req,res)=>{
    const {email, password} = req.body;
    const statement = `SELECT * FROM users WHERE email = ? AND password =?;`
    connectionDB.execute(statement,[email,password],(error,result)=>{
        if (error) {
            return res.status(500).json({message:"Fail to execute query"})
        }
        if (!result.length) {
            return res.status(404).json({message:"Invalid email or password"})
        }
        return res.status(200).json({message:"User logged in successfully", data:result})
    })
}

export {signup, login};
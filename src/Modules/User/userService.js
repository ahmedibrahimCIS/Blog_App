import connectionDB from "../../DB/dbConnection.js";

const profile =(req,res)=>{
    const {userId} = req.params;
    let statement = `SELECT email, first_name, last_name, gender, DOB, YEAR(CURDATE()) - YEAR(DOB) AS age FROM users WHERE id=?;`
    connectionDB.execute(statement,[userId],(error,result)=>{
        if (error) {
            return res.status(500).json({message:"Fail to execute query"})
        }
        if (!result.length) {
            return res.status(404).json({message:"Invalid ID"})
        }
        return res.status(200).json({data:result})
    })
}

const updateUser =(req,res)=>{
    const {userId} = req.params;
    const {first_name} = req.body;
    let statement = `UPDATE users SET first_name =?  WHERE id=?;`
    connectionDB.execute(statement,[first_name, userId],(error,result)=>{
        if (error) {
            return res.status(500).json({message:"Fail to execute query"})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message:"NOT FOUND!"})
        }
        return res.status(200).json({message:"User updated successfully", data: result})
    })
}

const deleteUser =(req,res)=>{
    const {userId} = req.params;
    let statement = `DELETE FROM users WHERE id=?;`
    connectionDB.execute(statement,[userId],(error,result)=>{
        if (error) {
            return res.status(500).json({message:"Fail to execute query"})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message:"NOT FOUND!"})
        }
        return res.status(200).json({message:"User deleted successfully", data: result})
    })
}

const searchUser =(req, res) => {
    const {first_name} = req.query;
    let statement = `SELECT email,first_name, last_name,gender, DOB ,YEAR(CURDATE()) - YEAR(DOB) AS age  FROM users WHERE first_name=?;`
    connectionDB.execute(statement,[first_name],(error,result)=>{
        if (error) {
            return res.status(500).json({message:"Fail to execute query"})
        }
        if (result.length < 0) {
            return res.status(404).json({message:"NOT FOUND!"})
        }
        return res.status(200).json({data: result})
    })
}

export {profile, updateUser, deleteUser, searchUser};
import connectionDB from "../../DB/dbConnection.js";

const createBlog = (req,res)=>{
    const {title, content , userId} = req.body;
    //check user existance
    let statement = `SELECT first_name FROM users WHERE id= ?;`
    connectionDB.execute(statement,[userId],(error,result)=>{
        if (error) return res.status(500).json({message:"Failed to execute query"});
        if(result.length === 0) return res.status(404).json({message:"User not found"});
    //create blog
    let query =` INSERT INTO blogs (title,content,user_id)VALUES(?,?,?);`
    connectionDB.execute(query,[title,content,userId],(error,result)=>{
        if (error) return res.status(500).json({message:"Failed to execute query"});
        if(result.affectedRows === 0) return res.status(404).json({message:"User not found"});
        return res.status(201).json({message:"Blog created successfully",data:result});

    })
        
    })
}

const updateBlog = (req,res)=>{
    const {blogId} =req.params;
    const {title,userId} = req.body;

    //user existence
    let statement = `SELECT first_name FROM users WHERE id =?;`
    connectionDB.execute(statement,[userId],(error,result)=>{
        if (error) return res.status(500).json({message:"Failed to execute query"});
        if(result.length === 0) return res.status(404).json({message:"User not found"});

        //blog existence
        connectionDB.execute(`SELECT * FROM blogs WHERE id=?;`,[blogId],(error,result)=>{
            if (error) return res.status(500).json({message:"Failed to execute query"});
            if(result.length === 0) return res.status(404).json({message:"Blog not found"});

            if (userId == result[0].user_id) {
                let query = `UPDATE blogs SET title =? WHERE id =? AND user_id=?;`
                connectionDB.execute(query,[title,blogId,userId],(error,result)=>{
                if (error) return res.status(500).json({message:"Failed to execute query"});
                if(result.affectedRows === 0) return res.status(500).json({message:"Failed to update blog"});
                return res.status(200).json({message:"Blog updated successfully", data:result});
                })
            }else{
                return res.status(403).json({message:"Blog doesn't belong to this user"});
            }
        })
    
    })
}

const deleteBlog = (req,res)=>{
    const {blogId} =req.params;
    const {userId} =req.body;
    let statement = `SELECT first_name FROM users WHERE id=?;`
    connectionDB.execute(statement,[userId],(error,result)=>{
        if (error) return res.status(500).json({message:"Failed to execute query"});
        if(result.length === 0) return res.status(404).json({message:"User not found"});

        //blog existence
        connectionDB.execute(`SELECT * FROM blogs WHERE id=?;`,[blogId],(error,result)=>{
            if (error) return res.status(500).json({message:"Failed to execute query"});
            if(result.length === 0) return res.status(404).json({message:"Blog not found"});
            if (userId == result[0].user_id) {
                let query =`DELETE FROM blogs WHERE id=? AND user_id=?`
                connectionDB.execute(query,[blogId,userId],(error,result)=>{
                    if (error) return res.status(500).json({message:"Failed to execute query"});
                    if(result.affectedRows === 0) return res.status(404).json({message:"Failed to delete blog"});
                    return res.status(200).json({message:"Blog deleted successfully"});
                })
            }else{
                return res.status(403).json({message:"Blog doesn't belong to this user"}); 
            }
        
    })
})
}

const getAllBlogs = (req,res)=>{
    connectionDB.execute(`SELECT title, content, createdAt, updatedAt, user_id FROM blogs`,(error,result)=>{
        if(error) return res.status(500).json({message:"Failed to execute query"});
        if(result.length == 0) return res.status(404).json({message:"No Blogs yet!"});

        return res.status(200).json({message:"Done",data:result});
    })
}

const getBlog =(req,res)=>{
    const {blogId} = req.params;
    connectionDB.execute(`SELECT title, content, createdAt, updatedAt, user_id FROM blogs WHERE id=?`,[blogId],(error,result)=>{
        if(error) return res.status(500).json({message:"Failed to execute query"});
        if(result.length == 0) return res.status(404).json({message:"Blog not found"});

        return res.status(200).json({message:"Done",data:result});
    })
}

export {createBlog, updateBlog, deleteBlog, getAllBlogs, getBlog};
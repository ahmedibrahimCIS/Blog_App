import express from "express";
import authRouter from "./src/Modules/Auth/authController.js"
import userRouter from "./src/Modules/User/userController.js"  
import blogRouter from "./src/Modules/Blog/blogController.js" 
import errorHandler from "./src/middleware/errorHandler.js"


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

//Routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/blog",blogRouter);

//Handle unmatched routes
app.all("*", (req, res) => res.status(404).json({ message: "Route not found" }));

//Error Handler
app.use(errorHandler);



app.listen(port, () => console.log(`app listening on port ${port}!`))
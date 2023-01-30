const express=require("express");
const app=express();
const taskRouter=require('./routers/tasks')

app.use(express.json());

app.use("/tasks", taskRouter)

app.listen(8080,()=>console.log("server running"));
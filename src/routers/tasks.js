const express=require('express');
const taskRouter=express();
const {getTasks,getTask,postTask,putTask,patchTask,deleteTasks}=require('../controller/task');

taskRouter.use(express.json());

taskRouter.get("/",getTasks);
taskRouter.get("/:idNum",getTask);
taskRouter.post("/",postTask);
taskRouter.put("/",putTask);
taskRouter.patch("/",patchTask);
taskRouter.delete("/",deleteTasks);

module.exports=taskRouter;



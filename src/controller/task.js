const {getService,getServiceOne,postService,putService,patchService,deleteService}=require('../services/tasks')


const getTasks=(req,res)=>{
    console.log("get all tasks");
    const tasks=getService(req,res);
    res.send(tasks);
}

const getTask=(req,res)=>{
    console.log("get a task");
    const task=getServiceOne(req,res);
    res.send(task);
}

const postTask=(req,res)=>{
    console.log("add new task");
    postService(req,res);
    res.end();
}

const putTask=(req,res)=>{
    console.log("update task");
    putService(req,res);
    res.end();
}

const patchTask=(req,res)=>{
    console.log("patch a task");
    patchService(req,res);
    res.end();
}

const deleteTasks=(req,res)=>{
    console.log("delete tasks that are completed");
    deleteService(req,res);
    res.end();
}

module.exports={getTasks,getTask,postTask,putTask,patchTask,deleteTasks};
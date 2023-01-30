const express=require("express");
const app=express();

app.use(express.json());

let taskArray=[];
let id=0;

app.post("/tasks",(req,res)=>{
	let newTask={
		id:id,
		...req.body,
		isComplete:false
	};
	id++;
	taskArray.push(newTask);
	res.status(201).send(newTask);
});

app.get("/tasks",(req,res)=>{
	res.send(taskArray);
});

app.get("/tasks/:idNum",(req,res)=>{
	let task=taskArray.reduce((tot,curr)=>{
		if(curr.id==req.params.idNum)
			return curr;
		else 
			return tot;
	},[]);
	res.send(task);
});

app.put("/task",(req,res)=>{
	let tasks=taskArray.map((task)=>{
		if(task.id===req.body.id){
			return req.body;
		}
		else
			return task;
	});
	taskArray=tasks;
	res.status(201).end();
});

app.patch("/task",(req,res)=>{
	const tasks=taskArray.map((task)=>{
		if(task.id===req.body.id){
			if(task.isComplete!=req.body.isComplete)
				task.isComplete=!task.isComplete;
			return task;
		}
		else
			return task;
	});
	taskArray=tasks;
	res.status(201).end();
});

app.delete("/task",(req,res)=>{
	const tasks=taskArray.filter((curr)=>{
		return curr.isComplete==false;
	});
	taskArray=tasks;
	res.send("deleted completed tasks");
});


app.listen(8080,()=>console.log("server running"));
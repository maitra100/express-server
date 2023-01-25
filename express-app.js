const express=require("express");
const app=express();

app.use(express.json());

let taskArray=[];
let id=0;

app.post("/tasks",(req,res)=>{
	let newTask={
		id:id,
		name:req.body.name,
		isComplete:false
	};
	id++;
	taskArray.push(newTask);
	res.send(newTask);
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

app.put("/tasks",(req,res)=>{
	let tasks=taskArray.map((task)=>{
		if(task.id===req.body.id){
			return req.body;
		}
		else
			return task;
	});
	taskArray=tasks;
	res.end();
});

app.patch("/tasks",(req,res)=>{
	let tasks=taskArray.map((task)=>{
		if(task.id===req.body.id){
			if(task.isComplete!=req.body.isComplete)
				task.isComplete=!task.isComplete;
			return task;
		}
		else
			return task;
	});
	taskArray=tasks;
	res.end();
});

app.delete("/tasks",(req,res)=>{
	const tasks=taskArray.filter((curr)=>{
		return curr.isComplete==false;
	});
	taskArray=tasks;
	res.send("deleted completed tasks");
});


app.listen(8080,()=>console.log("server running"));
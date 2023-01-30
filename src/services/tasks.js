let taskArray=[];
let id=0;

const getService=(req,res)=>{
    return taskArray;
}

const getServiceOne=(req,res)=>{
    let task=taskArray.reduce((tot,curr)=>{
		if(curr.id==req.params.idNum)
			return curr;
		else 
			return tot;
	},[]);
    return task;
}

const postService=(req,res)=>{
    let newTask={
		id:id,
		...req.body,
		isComplete:false
	};
	id++;
	taskArray.push(newTask);
}

const putService=(req,res)=>{
    let tasks=taskArray.map((task)=>{
		if(task.id===req.body.id){
			return req.body;
		}
		else
			return task;
	});
	taskArray=tasks;
}

const patchService=(req,res)=>{
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
}

const deleteService=(req,res)=>{
    const tasks=taskArray.filter((curr)=>{
		return curr.isComplete==false;
	});
	taskArray=tasks;
}

module.exports={getService,getServiceOne,postService,putService,patchService,deleteService};
const http=require("http");

let id=0;
let taskArray = [];
http.createServer((req,res)=>{
	if(req.url=="/tasks" && req.method=="POST"){
		res.write("post request");
		var body = "";

		req.on("data", function (data) {
			body += data;
		});
		req.on("end", function () {
			res.writeHead(200,{"Content-Type":"application/json"});
			let task=JSON.parse(body);
			console.log(typeof task);
			task.isComplete=false;
			task.id=id;
			id++;
			taskArray.push(task);
			res.write(JSON.stringify(task));
		});
	}
	else if(req.url=="/tasks" && req.method=="GET"){
		console.log(taskArray);
		res.write(JSON.stringify(taskArray));
	}
	else if(req.method=="GET"){
		let regex = /\d+/g;
		let matches = req.url.match(regex);
		let idNum=Number(matches[0]);
		let obj=taskArray.reduce((tot,curr)=>{
			if(curr.id===idNum)
				return curr;
			else
				return tot;
		},[]);
		res.write(JSON.stringify(obj));
	}
	else if(req.url=="/tasks" && req.method=="DELETE"){
		res.write("delete request");
		let arr=[];
		let len=taskArray.length;
		for(let i=0;i<len;i++){
			if(taskArray[i].isComplete==true)
				arr.push(i);
		}
		for(let i=0;i<arr.length;i++){
			taskArray.splice(arr[i],1);
		}

	}
	else if(req.url=="/tasks" && req.method=="PUT"){
		res.write("put request");
		var bodys = "";

		req.on("data", function (data) {
			bodys += data;
		});
		req.on("end", function () {
			let task=JSON.parse(bodys);
			console.log(task);
			let ind= taskArray.reduce((tot,curr,index)=>{
				if(curr.id===task.id)
					return index;
				else
					return tot;
			},-1);
			taskArray[ind]=task;
			console.log(taskArray);
		});
	}
	res.end();
}).listen(8080,()=>console.log("server started"));




// const options = {
//     hostname: 'localhost',
//     path: '/posts',
//     method: 'GET'
// };

// const req=http.request(options,(res)=>{
//     let data = ''
     
//     res.on('data', (chunk) => {
//         data += chunk;
//     });
    
//     // Ending the response 
//     res.on('end', () => {
//         console.log('Body:', JSON.parse(data))
//     });
// }).on("error", (err) => {
//     console.log("Error: ", err)
// }).end()

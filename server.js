const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');


let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();	
});

hbs.registerHelper('Capitalize',(text)=>{
	return text.toUpperCase();
})

app.set('view engine','hbs');

app.use(express.static(`${__dirname}/public`)); 

app.use((req,res,next)=>{
	let timestamp = new Date().toLocaleDateString();
	let serverLog = `${timestamp} : ${req.method}  ${req.url}`;
	console.log(serverLog);
	fs.appendFile('server.log',`${serverLog}\n`,(err)=>{
		if(err){
			console.log('unable to write to file');
		}
	})
	 next();
});



app.get('/',(req,res,next)=>{
	res.render('home',{
		currentPage:'Home Page',
		welcomeMsg:"Welcome, glad to have you here"
	});
});

app.get('/about',(req,res,next)=>{
	 res.render('about',{
		 currentPage:req.url.substring(1).toUpperCase(),
	 });
});


app.get('/bad',(req,res,next)=>{
	 res.send({
		error:"404,page not found" 
	 });
})

let port  = process.env.PORT || 9000;


app.listen(port,()=>{
	console.log(`server is running on port ${port}`);
});
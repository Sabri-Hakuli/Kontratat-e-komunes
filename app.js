const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

// Setup MongoDB
const MongoClient = require("mongodb").MongoClient;
const DB_URI = "mongodb://localhost:27017/kontratapp";
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect(DB_URI, (err, db) =>  {
	if(err) {
		console.log("Error connecting to db:" + err);
		return;
	}
	kontrats = db.collection("kontrats");
	console.log("Connected to:" + DB_URI);
})

app.use(express.static(path.join(__dirname, "/public"))); //per foto, css dhe js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));



app.post('/kontrat/add', (req,res,next)=>{
  kontrats.insert({title: req.body.title, 
  	description: req.body.description, 
  	aktiviteti: req.body.aktiviteti, 
  	datainicimit: req.body.datainicimit,
  	publikimishpalljes: req.body.publikimishpalljes, 
   	datanenshkrimit: req.body.datanenshkrimit, 
   	afatetetperimplementim: req.body.afatetetperimplementim,
	afatetetperimplementim2: req.body.afatetetperimplementim2, 
	datapermbylljes: req.body.datapermbylljes, 
	cmimikontrates: req.body.cmimikontrates,
	cmimitotalipaguar: req.body.cmimitotalipaguar, 
	emriikontratdhenesit: req.body.emriikontratdhenesit}, 
  	(err,document)=>{
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  })
})

app.get('/',function(req,res){
  kontrats.find({}).toArray(function(err,docs){
    if (err) {
      console.log(err);
    }
    res.render('index',{docs:docs});
  });
});


app.get("/kontrat/:id", function(req, res) {
	console.log(req.params.id);
	kontrats.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if(err) {
			console.log(err);
		}
		res.render("show", {doc: doc});
	})
});



app.get("/kontrat/edit/:id", function(req, res) {
	kontrats.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if (err) {
			console.log(err);
		}
		res.render("edit", {doc: doc});
	});
});



app.post("/kontrat/update/:id", function(req, res) {
	kontrats.updateOne({_id: ObjectID(req.params.id)},
		{$set: {title: req.body.title, 
			description: req.body.description, 
			aktiviteti: req.body.aktiviteti, 
			datainicimit: req.body.datainicimit,
		   	publikimishpalljes: req.body.publikimishpalljes, 
		   	datanenshkrimit: req.body.datanenshkrimit, 
		   	afatetetperimplementim: req.body.afatetetperimplementim,
			afatetetperimplementim2: req.body.afatetetperimplementim2, 
			datapermbylljes: req.body.datapermbylljes, 
			cmimikontrates: req.body.cmimikontrates,
			cmimitotalipaguar: req.body.cmimitotalipaguar, 
			emriikontratdhenesit: req.body.emriikontratdhenesit}}, function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});



app.get("/kontrat/delete/:id", function(req, res) {
	kontrats.remove({_id: ObjectID(req.params.id)},
		function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});




app.listen(3000, 'localhost', (err)=>{
  if (err) {
    console.log('Something is wrong '+ err);
    return;
  }
  console.log("Server is running");
})

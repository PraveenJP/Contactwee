var express    = require('express');
var app 	   = express();
var mongoJS    = require('mongojs');
var db         = mongoJS('mongodb://jpmean:123123@ds055495.mongolab.com:55495/contactwee',['contactwee']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());

app.get('/contact',function(req,res){	
	db.contactwee.find(function (err, docs) {
    	//console.log(docs);
    	res.json(docs);    	
  	});
});

app.post('/contact',function(req,res){
	db.contactwee.insert(req.body, function(err,docs){
		res.json(docs);
	});
});

app.delete('/contact/:id',function(req,res){
	var id = req.params.id;	
	db.contactwee.remove({_id: mongoJS.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/contact/:id', function(req, res){
	var id = req.params.id;
	db.contactwee.findOne({_id: mongoJS.ObjectId(id)}, function(err , docs){
		res.json(docs);
	});
});

app.put('/contact/:id', function(req,res){
	var id = req.params.id;
	db.contactwee.findAndModify({
		query : {_id: mongoJS.ObjectId(id)},
		update:{$set:{name:req.body.name,email:req.body.email,phoneno:req.body.phoneno,skype:req.body.skype,address:req.body.address,place:req.body.place,whatsapp:req.body.whatsapp}},new:true}, 
		function(err, docs){
			res.json(docs);
	});
});

app.listen(process.env.PORT || 3000, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Server Running");
	}
});
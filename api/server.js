/**
 * Created by benoit-xavierhouvet on 08/06/2016.
 */
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose    =   require("mongoose");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

mongoose.connect('mongodb://localhost:27017/mean');
var mongoSchema =   mongoose.Schema;

var commentaireSchema = new mongoSchema({
	"commentaireDate" :  { type: Date, default: Date.now },
	"commentaireContenu" : String,
	"commentaireAuteur" : String
});

var articleSchema  = new mongoSchema({
	"articleTitre" : String,
	"articleDate" :  { type: Date, default: Date.now },
	"articleContenu" : String,
	"articleAuteur" : String,
	"articleComment" : [ commentaireSchema ]
});

var article = mongoose.model('article',articleSchema);
var commentaire = mongoose.model('commentaire',commentaireSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



app.get("/article",function(req,res,next){
	var response = {};
	article.find().sort("-articleDate").exec(function(err,data){
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			response = {"error" : false,"data" : data};
		}
		res.json(response);
	});
});

app.listen(4000);

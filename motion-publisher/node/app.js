var Spacebrew = require('spacebrew').Spacebrew;
var mongoose = require('mongoose');
var restify = require('restify');
var request = require('request');

var timestampSchema = mongoose.Schema({
	timestamp: Date
});
var Timestamp = mongoose.model('Timestamp',timestampSchema);

mongoose.connect('mongodb://localhost/movements');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback() {
	console.log("CONNECTED TO MONGO");
});

var server = "localhost:9000";
var name = "MotionWatch";
var description = "I see motion";
var sb = new Spacebrew.Client( server, name, description );
sb.addPublish("movements", "range", "Movements!");  // create the publication feed
sb.connect();

function leadWithZero(num,numDigits) {
	var str = num.toString();
	while (str.length < numDigits) {
		str = "0" + str;
	}
	return str
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(function crossOrigin(req,res,next){
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});

server.get('/',function(req,res,next){
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	var day = d.getDate();
	var ridesToday;
	Timestamp.find({
		'timestamp': {
			$gt: year+'-'+leadWithZero(month+1,2)+'-'+leadWithZero(day,2)
		}
	}).sort('-timestamp').exec(function(err,timestamps){
		var responseObject = {};
		responseObject.count = timestamps.length;
		responseObject.last = timestamps[0];
		res.send(responseObject);
	});
});

server.post('/', function create(req, res, next) {
	console.log(req.body);
	res.send(201, Math.random().toString(36).substr(3, 8));
	return next();
 });

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});

var i = 0;
setInterval(function(){
	// YOU'LL NEED TO PUT YOUR ELECTRIC IMP URL HERE V
	request('https://agent.electricimp.com/Z25icNMZoFDC', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var payload = JSON.parse(body);
			var movements = 0;
			payload.uses.map(function(item,index){
				console.log("index: "+index,"item: "+item);
				movements++;

				//persist timestamp
				var ts = new Timestamp({timestamp: new Date(1000*item.timestamp) });
				ts.save(function(err,ts){
					if (err) {
						console.error(err);
					} else {
						console.log("timestamp " + item.timestamp + " saved");
					}
				});

			});
			//spacebrew publish
			if (movements > 0) {
				sb.send("movements", "range", movements);   // send string to spacebrew
			}
		}
	});

}, 1000);
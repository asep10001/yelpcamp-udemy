var express 	= require ("express"),
	app 		= express(),
	bodyParser  = require('body-parser'),
	mongoose 	= require("mongoose")

mongoose.connect("mongod://localhost/yelp_camp");

var campgrounds = [
		{name: 'Ranca Upas', image:'https://www.superadventure.co.id/uploads/news/2018/08/10/d2b387a55cba.jpg'},
		{name: 'Rancabuaya', image:'https://tempatasik.com/wp-content/uploads/2019/09/harga-tiket-masuk-ciwidey-valley.jpg'}
		];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Set Up

var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
		name: 'Rancabali', 
		image:'https://explorewisata.com/wp-content/uploads/2017/01/Glamping-Lakeside-Rancabali.jpg'
	}, function(err, campground){
	if(err){
		console.log(err);
	}else{
		console.log("NEWLY CREATED CAMPGROUND");
		console.log(campground);
	}
});
app.get("/", function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post('/campgrounds', function(req, res){
	//get data from form and add to campground array
	var name= req.body.name;
	var image= req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new.ejs');
});
app.listen(3000, function(){
	console.log("YelpCamp has Started!!!")
});
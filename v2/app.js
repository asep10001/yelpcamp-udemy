var express 	= require ("express"),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

//Schema Set Up

var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Ranca Upas', 
// 		image:'https://www.superadventure.co.id/uploads/news/2018/08/10/d2b387a55cba.jpg',
// 		description: 'Ini adalah salah satu perkemahan yang sangat indah'
// 	}, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

//INDEX  - show all campgrounds
app.get('/campgrounds', function(req, res){
	//Get campgrounds from DB
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds:allcampgrounds});
		}
	})
	
});

//CREATE - add new campgrounds to the DB
app.post('/campgrounds', function(req, res){
	//get data from form and add to campground array
	var name= req.body.name;
	var image= req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create new Campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
	
});

//NEW - show form to create newCampground
app.get('/campgrounds/new', function(req, res){
	res.render('new.ejs');
});

//SHOW MORE INFO ABOUT CAMPGROUND
app.get('/campgrounds/:id', function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
		} else{
			//render show template with that campground
			res.render('show', {campground: foundCampground});
		}
	});
	
});
app.listen(3000, function(){
	console.log("YelpCamp has Started!!!")
});
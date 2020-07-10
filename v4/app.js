var express 	= require ("express"),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	Campground	= require('./models/campground'),
	Comment		= require('./models/comment'),
	seedDB		= require('./seeds')

seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

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
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
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
	res.render('campgrounds/new');
});

//SHOW MORE INFO ABOUT CAMPGROUND
app.get('/campgrounds/:id', function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else{
			console.log(foundCampground);
			//render show template with that campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
	
});

//====================================
// COMMENTS ROUTES
//====================================

app.get('/campgrounds/:id/comments/new', function(req, res){
	//find campgroundbyid
	Campground.findById(req.params.id, function(err, found_campground){
		if(err){
			console.log(err);
		} else{
			res.render('comments/new', {campground: found_campground});			
		}
	})

})

app.post('/campgrounds/:id/comments', function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect('/campgrounds')
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id)
				}
			})
			
		}
	
	})
});
app.listen(3000, function(){
	console.log("YelpCamp has Started!!!")
});
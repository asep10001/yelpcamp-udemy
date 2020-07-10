var mongoose = require ('mongoose');
var Campground = require ('./models/campground');
var Comment = require ('./models/comment');

var data = [
	{
		name: 'Cloud Rest',
		image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt dui ut ornare lectus. Nam aliquam sem et tortor consequat id porta nibh. Rutrum tellus pellentesque eu tincidunt tortor aliquam. A pellentesque sit amet porttitor eget dolor. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Ultricies mi eget mauris pharetra et ultrices neque. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Sit amet commodo nulla facilisi nullam. Pellentesque adipiscing commodo elit at imperdiet dui. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Diam maecenas sed enim ut sem viverra aliquet eget sit. Risus sed vulputate odio ut enim blandit. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Tortor consequat id porta nibh venenatis cras sed felis eget. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Risus quis varius quam quisque id diam vel quam. Vitae justo eget magna fermentum iaculis eu.'
	},
	{
		name: 'Kebun teh Rancabali',
		image: 'https://blog.reservasi.com/wp-content/uploads/2016/10/glamping-ciwidey-situ-patenggang.jpg',
		description: "Yeah, gimme a Tab. Yeah. Huh? Our first television set, Dad just picked it up today. Do you have a television? Lynda, first of all, I'm not your answering service. Second of all, somebody named Greg or Craig called you just a little while ag"
	},
	{
		name: 'Kawah Putih',
		image: 'https://anekatempatwisata.com/wp-content/uploads/2014/08/Kawah-Putih-Bandung.jpg',
		description : "I guarantee it. Marty, that's completely out of the question, you must not leave this house. you must not see anybody or talk to anybody. Anything you do could have serious reprocautions on future events. Do you understand? Why not? It's cold, damn cold. Ha, ha, ha, Einstein, you little devil. Einstein's clock is exactly one minute behind mine, it's still ticking. Yes, definitely, god-dammit George, swear. Okay, so now, you come up, you punch me in the stomach, I'm out for the count, right? And you and Lorraine live happily ever after."
	}
]

function seedDB (){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		Comment.remove({}, function(err){
			if (err){
				console.log(err);
			}
			console.log("removed comments!");
			
			//add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					}else{
						console.log("added a campground");
						//create a comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
							}, function(err, comment){
								if (err){
									console.log(err);
								}else{
									campground.comments.push(comment);
									campground.save();
									console.log("Created new comment");
								}
							}
						)
					}
				
				});
			});
		});
	});
};

module.exports = seedDB;
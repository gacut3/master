var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {name: "Salmon Creek",
//      image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground)
//         }
//     }
// )
var campground1 = [
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
]

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err){
        if(err){
            console.log(err)
        } else res.render("campgrounds", {camps: campground1})
    })
 
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var newCamp = {name: name, image: image}
    // campgrounds.push(newCamp)
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
    
})

app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

app.get("/campgrounds/:id", function(req, res){
    res.send("Hello hihih")
})

app.listen(3000, function(){
    console.log("Yelp Camp sever")
})
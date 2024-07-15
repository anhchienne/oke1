import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//use for contact submit
app.use(`/contactSubmit`, (req, res, next) => {
    console.log("Your responses is sent.");
    res.redirect("/contact");
    next();
})
app.use("/editSubmit", (req, res, next) => {
    var index = blogs.findIndex(item => item.id === req.body["id"]);
    blogs[index].title = req.body["title"];
    blogs[index].tag = req.body["tag"];
    blogs[index].imageSrc = req.body["imageSrc"];
    blogs[index].content = req.body["content"];
    console.log(blogs[index]);
    next();
})
app.use("/postBlog", (req, res, next) => {
    var newBlog = {
        userName: req.body["userName"],
        email: req.body["email"],
        id: (blogs.length).toString(),
        tag: req.body["tag"],
        title: req.body["title"],
        content: req.body["content"],
        imageSrc: req.body["imageSrc"],
    }
    blogs.push(newBlog);
    next();
})

app.get("/", (req, res) => {
    res.render("homepage.ejs");
})
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})
app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/blog", (req, res) => {
    res.render("blog.ejs", {
        blogs: blogs,
        numBlogs: blogs.length,
    });
})
app.get("/editBlog", (req, res) => {
    res.render("blog.ejs", {
        blogs: blogs,
        numBlogs: blogs.length,
    });
})
app.post("/editBlog", (req, res) => {
    var id = req.body["id"];
    res.render("editBlog.ejs", {
        blog: blogs[id],
    });
})

app.post("/editSubmit", (req, res) => {
    res.redirect("/blog");
})

//none change, return blog
app.post("/returnBlog", (req, res) => {
    res.redirect("/blog");
})

app.post("/postBlog", (req, res) => {
    res.redirect("/blog");
})

//submit contact
app.post("/contact", (req, res) => {
    res.render("contact.ejs");
})

//post blog
app.get("/post", (req, res) => {
    res.render("postBlog.ejs");
})

var blogs = [{
    userName: "John Smith",
    email: "johnAcade@gmail.com",
    id: "0",
    tag: "Technology",
    title: "Apple Introduces Search Ads Basic",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    imageSrc: "https://bootdey.com/img/Content/avatar/avatar1.png",
},
{
    userName: "Angela Ace",
    email: "angelaAcer@gmail.com",
    id: "1",
    tag: "Engineer",
    title: "Apple Introduces Search Ads Basic",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    imageSrc: "https://bootdey.com/img/Content/avatar/avatar2.png",
},
{
    userName: "Julia Ganda",
    email: "juliaGandas@gmail.com",
    id: "2",
    tag: "Worker",
    title: "Apple Introduces Search Ads Basic",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    imageSrc: "https://bootdey.com/img/Content/avatar/avatar3.png",
}
]

app.listen(port, () => {
    console.log(`Website is running on ${port}.`);
})
/*********************************************
Juan Nunez
Treehouse FSJS Techdegree
Project 6 - Static Node.js and Express Site 
app.js
*********************************************/


// ADDING VARIABLES TO REQUIRE EXPRESS AND DATA.JSON
const express = require("express");
const app = express();
const path = require("path");
const data = require("./data.json");
const projects = data.projects;
app.set("view engine", "pug");                                   // Setting view engine to pug
app.set("views", path.join(__dirname, "views"));                // Setting views directory


// SERVING THE STATIC FILES LOCATED IN THE PUBLIC FOLDER
app.use("/static", express.static(path.join(__dirname, "public")));


// SETTING 'INDEX' ROUTE TO RENDER 'HOME' PAGE
app.get("/", (req, res) => {
    res.render("index", { projects });
});
  

// SETTING 'ABOUT' ROUTE TO RENDER 'ABOUT' PAGE
app.get("/about", (req, res) => {
    res.render("about");
});
  

// SETTING 'PROJECTS' ROUTE TO RENDER 'PROJECTS' PAGE
app.get("/projects/:id", (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render("project", { project });
});


// STARTING SERVER, LISTENING ON PORT 3000
app.listen(3000, () => {
    console.log("Listening to localhost:3000");
  });


// SET ERROR STATUS TO 404 IF ROUTE NOT FOUND
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
  

// RENDER ERROR PAGE WITH ERROR PASSED IN
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(`There is a ${err.status} error.`);
    res.render("error");
});
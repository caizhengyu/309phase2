/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Student } = require("./models/student");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { Course } = require("./models/course");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: Infinity,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // const bcrypt = require('bcryptjs')
    // bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(password, salt, (err, hash) => {
    //             console.log(hash)
    //         })})

    User.findByEmailPassword(username, password)
        .then(user => {
            if (user.removed) {res.status(400).send(); return;}
            req.session.userId = user.userId;
            req.session.username = user.username;
            req.session.class = user.class;
            res.send({ currentUser: user.username, class: user.class, userId: user.userId });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.username) {
        res.send({ currentUser: req.session.username, userId: req.session.userId, class: req.session.class});
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/

// getPosts
app.get("/posts/:id", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    /// req.params has the wildcard parameters in the url, in this case, id.
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Otherwise, findById
    Post.findById(id)
        .then(post => {
            if (!post) {
                res.status(404).send(); // could not find this student
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({post});
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});


// get all the posts
app.get("/posts", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    Post.find().then(
        posts => {
            // log("i found it?", posts);
            res.send({ posts }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// get all the courses
app.get("/courses", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    Course.find().then(
        courses => {
            res.send(courses); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


// get all the students
app.get("/students", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    Student.find().then(
        posts => {
            // log("i found it?", posts);
            res.send(posts); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});



// get all the posts
app.get("/users", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    User.find().then(
        posts => {
            // log("i found it?", posts);
            res.send(posts); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


// add a post
app.post("/posts", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    const post = new Post({
        authorId: req.body.authorId,
        question: req.body.question,
        postId: req.body.postId,
        bounty: req.body.bounty,
        content: req.body.content,
        courseNum: req.body.courseNum
    });

    // Save student to the database
    post.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});


app.put("/posts/:pid/:cid", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const pid = req.params.pid;
    const cid = req.params.cid;
    if (!ObjectID.isValid(pid) || !ObjectID.isValid(cid)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Update the student by their id.
    Post.findById(pid)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                post.status = "resolved";
                post.answers.id(cid).picked = true;
                post.save();
                res.send({post});
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});


app.put("/students/:sid", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const sid = req.params.sid;
    const bounty = req.body.bounty;
    // Update the student by their id.
    Student.findOne({userId: sid})
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                student.coins += parseInt(bounty);
                student.save();
                res.send({student});
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});

// add a comment
app.post("/posts/:id", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // get the updated name and year only from the request body.
    const { authorId, content, replies} = req.body;
    const reply = {authorId: authorId,
    						content: content,
    						replies: []};

    // Update the student by their id.
    Post.findByIdAndUpdate(postId, {"$push": {"answers": reply}}, {"new": true})
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
});


// add a reply
app.post("/posts/:pid/:cid", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }
    const postId = req.params.pid;
    const cId = req.params.cid;
    if (!ObjectID.isValid(postId) || !ObjectID.isValid(cId)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // get the updated name and year only from the request body.
    const { authorId, to, content } = req.body;
    const reply = {authorId: authorId,
    						content: content,
    						to: to};

    // Update the student by their id.
    Post.findById(postId)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
            	post.answers.id(cId).replies.push(reply);
            	post.save();
                res.send(post.answers.id(cId));
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
});



// delete a comment
app.delete("/posts/:pid/:cid", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    const postId = req.params.pid;
    const cId = req.params.cid;
    if (!ObjectID.isValid(postId) || !ObjectID.isValid(cId)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Update the student by their id.
    Post.findById(postId)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                let comment = post.answers.id(cId)
                const toRemove = post.answers.indexOf(comment)
                post.answers.splice(toRemove, 1);
                post.save();
            }
        })
        .catch(error => {
            log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});


// get student by userid
app.get("/students/:id", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const userId = req.params.id;
    Student.findOne({userId: userId}).then(
        student => {
            if (!student) {
                res.status(404).send();
            }else {
            // log("i found it?", posts);
            res.send({student}); // can wrap in object if want to add more properties
        }
    })
        .catch(error => {
            console.log(error)
            res.status(500).send(error); // server error
        }
    );
});


// delete this post
app.delete("/posts/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    Post.findByIdAndDelete(id).then(
        student => {
            console.log("delete success!");
        }
    )
        .catch(error => {
            console.log(error)
            res.status(500).send(error); // server error
        }
    );
});



// delete all posts
app.delete("/posts/material/subject/:courseNum", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    console.log(req.params)
    const courseNum = req.params.courseNum;
    Post.deleteMany({courseNum:courseNum}).then(
        student => {
            console.log("delete success!");
        }
    )
        .catch(error => {
            console.log(error)
            res.status(500).send(error); // server error
        }
    );
});



app.post("/students/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    const student = new Student({
        userId: req.params.id,
        pic: req.body.pic,
        name: req.body.name,
        coins: req.body.coins,
    });

    // Save student to the database
    student.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});


app.put("/users/pw/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    User.findOne({userId: req.params.id}).then(
        student => {
            if (!student) {
                res.status(404).send();
            }else {
                if (req.body.opt == "1") student.password = req.body.password;
                student.username = req.body.username;
                student.save();
                res.send(student);
        }
    })
        .catch(error => {
            res.status(500).send(error); // server error
        }
    );
});

// delete an user
app.delete("/users/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    User.findOne({userId: req.params.id}).then(
        student => {
            if (!student) {
                res.status(404).send();
            }else {
                student.removed = true;
                student.save();
                res.send(student);
        }
    })
        .catch(error => {
            res.status(500).send(error); // server error
        }
    );
});


app.delete("/students/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    Student.findOne({userId: req.params.id}).then(
        student => {
            if (!student) {
                res.status(404).send();
            }else {
                student.name = "???";
                student.coins = -1;
                student.removed = true;
                student.save();
                res.send(student);
        }
    })
        .catch(error => {
            res.status(500).send(error); // server error
        }
    );
});




app.put("/students/info/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    Student.findOne({userId: req.params.id}).then(
        student => {
            if (!student) {
                res.status(404).send();
            }else {
                student.name = req.body.name;
                student.coins = req.body.coins;
                student.pic = req.body.pic;
                student.save();
                res.send(student);
        }
    })
        .catch(error => {
            console.log(error)
            res.status(500).send(error); // server error
        }
    );
});

app.post("/users/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }
    // Create a new student using the Student mongoose model
    const student = new User({
        userId: req.params.id,
        username: req.body.username,
        password: req.body.password,
        class: "user"
    });

    // Save student to the database
    student.save().then(
        result => {
            res.send(result);
        },
        error => {
            log(error)
            res.status(400).send(error); // 400 for bad request
        }
    );
});



app.delete("/courses/:id/:idx", (req, res) => {
    if (req.session.class!="admin"){
        res.status(401).send();
        return;
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Update the student by their id.
    Course.findById(id)
        .then(course => {
            if (!course) {
                res.status(404).send();
            } else {
                course.content.splice(req.params.idx, 1);
                course.save();
                res.send(course);
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});


app.delete("/courses/:id", (req, res) => {
    if (req.session.class != "admin"){
        res.status(401).send();
        return;
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Update the student by their id.
    Course.findByIdAndDelete(id)
        .then(course => {
            if (!course) {
                res.status(404).send();
            } else {
                res.send(course);
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});


app.post("/courses/:id", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }
    // Update the student by their id.
    Course.findById(id)
        .then(course => {
            if (!course) {
                res.status(404).send();
            } else {
                course.content.push(req.body.context);
                course.save();
                res.send(course);
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(); // bad request for changing the student.
        });
});

app.post("/courses", (req, res) => {
    if (!req.session.username){
        res.status(401).send();
        return;
    }

    const course = new Course({courseNum: req.body.courseNum, content: []});
    // Update the student by their id.

    course.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});

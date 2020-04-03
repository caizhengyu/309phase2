// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getStudents = (studentList) => {
    // the URL for the request
    const url = "/students";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            studentList.setState({ students: json });
        })
        .catch(error => {
            console.log(error);
        });
};


export const getUsers = (studentList) => {
    // the URL for the request
    const url = "/users";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            studentList.setState({ users: json });
        })
        .catch(error => {
            console.log(error);
        });
};



export const addCoins = (bounty, userId, t) => {
    // the URL for the request
    const url = "/students/" + userId;

    const request = new Request(url, {
        method: "put",
        body: JSON.stringify({bounty}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            t.setState({ poster: json.student });
        })
        .catch(error => {
            console.log(error);
        });
};

export const getStudent = (userId, studentList, opt=1) => {
    // the URL for the request
    const url = "/students/" + userId;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get this student!");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            if (opt==1) studentList.setState({ poster: json.student });
            else studentList.setState({ toStudent: json.student });
        })
        .catch(error => {
            console.log(error);
        });
};

export const updatePw = (username, pw, userId) => {
    // the URL for the request
    const url = "/users/pw/" + userId;
    let opt = 1;
    if (!pw || pw==="") opt = 0;
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify({username: username, password: pw, opt: opt}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get this student!");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log("Password update success!")
        })
        .catch(error => {
            console.log(error);
        });
};


export const updateInfo = (formComp) => {
    // the URL for the request
    const url = "/students/info/" + formComp.state.curUserId;
    const student = {name: formComp.state.name,
                    coins: formComp.state.coins,
                    pic: formComp.state.icon} 
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get this student!");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log("Info update success!")
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};




// A function to send a POST request with a new student
export const addStudent = (i, formComp, dashboardComp) => {
    // the URL for the request
    const url = "/users/" + i;
    const url2 = "/students/" + i

    // The data we are going to send in our request
    const student = {username: formComp.state.usrname,
                    password: formComp.state.pw,
                    name: formComp.state.name,
                    coins: formComp.state.coins,
                    pic: formComp.state.icon} 

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    const request2 = new Request(url2, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a user.",
                        type: "success"
                    }
                });
            } else {
                alert("failed adding this user")
            }
        })
        .catch(error => {
            console.log(error);
        });

    fetch(request2)
        .then(function (res) {
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a student.",
                        type: "success"
                    }
                });
                window.location.reload();
            } else {
                    alert("failed adding this student");
            }
        })
        .catch(error => {
            console.log(error);
        });
};







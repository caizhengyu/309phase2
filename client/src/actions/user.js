// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser, class: json.class, userId: json.userId });
            }
            app.setState({status: "done"});
        })
        .catch(error => {
            console.log(error);
            app.setState({status: "done"});
        });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify(loginComp),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, class: json.class, userId: json.userId });
            }
        })
        .catch(error => {
            alert("Incorrect username password combination!!")
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            window.location.reload();
            app.setState({
                currentUser: null,
                class: null,
                userId: null,
                message: { type: "", body: "" }
            });
            
        })
        .catch(error => {
            console.log(error);
        });
};



// A function to send a POST request with the user to be logged in
export const removeUser = (id) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/"+id, {
        method: "delete",
        body: null,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.log(error);
        });

    const request2 = new Request("/students/"+id, {
        method: "delete",
        body: null,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request2)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};



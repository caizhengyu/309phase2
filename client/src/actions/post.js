export const getPosts = (postList) => {
    // the URL for the request
    const url = "/posts";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get posts");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            postList.setState({ posts: json.posts });
        })
        .catch(error => {
            console.log(error);
        });
};

// get post and set poster
export const getPost = (postList, i) => {
    // the URL for the request
    const url = "/posts/" + i;
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            postList.setState({ post: json.post });
            const posterId = json.post.authorId;

            const url2 = "/students/" + posterId;
            fetch(url2)
                .then(res => {
                    if (res.status === 200) {
                        // return a promise that resolves with the JSON body
                        return res.json();
                    }
                })
                .then(json => {
                    // the resolved promise with the JSON body
                    postList.setState({ poster: json.student, ok: true });
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
};



export const addPost = (post, discussBoard) => {
    // the URL for the request
    const url = "/posts";

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(post),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                getPosts(discussBoard)
            } else {
                alert("Question title or body must not be empty!!");
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// pick an answer
export const pickAnswer = (pid, cid, p) => {
    // the URL for the request
    const url = "/posts/" + pid + "/" + cid;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
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
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get posts");
            }
        })
        .then(json => {
            console.log(json.post)
            // the resolved promise with the JSON body
            p.setState({ post: json.post });
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};




export const addComment = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/posts/" + dashboardComp.postId;
    // The data we are going to send in our request
    let comment = formComp

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get this post");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            dashboardComp.setState({ post: json });
        })
        .catch(error => {
            console.log(error);
        });
};


export const removePost = (id) => {
    const url = "/posts/" + id;

    const request = new Request(url, {
        method: "delete",
        body: null,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log(json)
        })
        .catch(error => {
            console.log(error);
        });
};


export const addReply = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/posts/" + dashboardComp.props.postId + "/" + dashboardComp.state.comment._id;
    // The data we are going to send in our request
    let comment = formComp;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get this comment");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            dashboardComp.setState({ comment: json });
        })
        .catch(error => {
            console.log(error);
        });
};


export const removeComment = (dashboardComp) => {
    // the URL for the request
    const url = "/posts/" + dashboardComp.props.postId + "/" + dashboardComp.state.comment._id;
    // The data we are going to send in our request
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
        body: null,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get this comment");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};


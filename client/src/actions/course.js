export const getCourses = (postList) => {
    // the URL for the request
    const url = "/courses";

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
        .then(courses => {
            postList.setState({ courses: courses, ok: "done" });
        })
        .catch(error => {
            console.log(error);
        });
};


export const removeContent = (i, t) => {
    // the URL for the request
    const url = "/courses/"+t.props.course._id + "/" + i;
    const request = new Request(url, {
        method: "delete",
        body: null,
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
                alert("Could not get posts");
            }
        })
        .then(course => {
            t.setState({ course: course });
        })
        .catch(error => {
            console.log(error);
        });
};



export const removeCourse = (courseId, courseNum) => {
    // the URL for the request
    const url = "/courses/"+courseId;
    const request = new Request(url, {
        method: "delete",
        body: null,
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
                alert("Could not get courses");
            }
        })
        .then(courses => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });

    const url2 = "/posts/material/subject/"+courseNum;
    const request2 = new Request(url2, {
        method: "delete",
        body: null,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Since this is a GET request, simply call fetch on the URL
    fetch(request2)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get courses");
            }
        })
        .then(courses => {
            console.log(courses);
        })
        .catch(error => {
            console.log(error);
        });
};



export const addContent = (t) => {
    // the URL for the request
    const url = "/courses/"+t.props.course._id;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({context: t.state.v}),
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
                alert("Could not get posts");
            }
        })
        .then(course => {
            t.setState({ course: course });
        })
        .catch(error => {
            console.log(error);
        });
};


export const addCourse = (t) => {
    // the URL for the request
    const url = "/courses";
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({courseNum: t.state.courseNum}),
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
                alert("Could not add course");
            }
        })
        .then(courses => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};

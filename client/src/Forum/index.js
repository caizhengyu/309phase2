import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getPosts, addPost } from "./../actions/post";
import { addCoins, getStudent } from "./../actions/student";
import { getCourses } from "./../actions/course";

import "./styles.css";


class Forum extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      posts: [],
      questionTitle: "",
      questionBody: "",
      rewardPoint: 0
    }
    getPosts(this);
    getStudent(this.props.state.userId, this);
    getCourses(this);
    let temp = window.location.href;
    this.courseNum = temp.substring(temp.lastIndexOf("/")+1);
  }


  // write handlers to set content
  handleTitleChange = e => {
    e.preventDefault();
    this.setState({
          questionTitle: e.target.value
      });
  };

  handleDesChange = (e) => {
    e.preventDefault();
    this.setState({
          questionBody: e.target.value
      });
  };

  handleRewardChange = (e) => {
    this.setState({
          rewardPoint: e.target.value
      });
  };

  postAQuestion = (e) => {
    e.preventDefault();

    const questionTitle = this.state.questionTitle;
    const questionBody = this.state.questionBody;
    const bounty = !this.state.rewardPoint ? 0 : this.state.rewardPoint;

    if (bounty > this.state.poster.coins) {
      alert("Not enough coins!!");
      return;
    }
    if (bounty < 0) {
      alert("Only non negative bounty is allowed!!");
      return;
    }

    if (!questionTitle || !this.questionBody){
      alert("Question title or body must not be empty!!");
      return;
    }

    let post = {
      authorId: this.props.state.userId,
      question: questionTitle,
      content: questionBody,
      bounty: bounty,
      postId: this.state.posts.length,
      courseNum: this.courseNum
    };

    addPost(post, this);
    addCoins(-bounty, this.props.state.userId, this);
    this.setState({questionTitle: "", questionBody: "", rewardPoint: 0});
  };

  getPosts(){
    let posts = [];
    for (let i=0; i<this.state.posts.length; i++){
      if (!(this.state.posts[i].courseNum===this.courseNum)) continue;
      posts.push(<Link
            color="textPrimary"

            to = {"./../Post/"+this.state.posts[i]._id}
          >{this.state.posts[i].question}</Link>)
      posts.push(<div className = "blankInP" />)
    }
    return posts
  }

  render() {
    if (!this.state.ok || !this.state.poster) return (<div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
                <button className="profbutton"> Home </button>
                <button className="profbutton">Profile & Posts</button>
                <button className="profbutton">Forum</button>
                <button className="nowbutton">Course Material</button>
        </div>);
    if (this.state.courses.filter(e=>e.courseNum===this.courseNum).length==0) return <Redirect to={"./../material"}/>;

    return (
      <div>
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <Link to={"./../home-" + (this.props.state.class==="admin" ? "admin" : "user")}>
                <button className="profbutton"> Home </button>
            </Link>
            <Link to={"./../Profile/" + this.props.state.userId}>
                <button className="profbutton">Profile & Posts</button>
            </Link>
            <Link to={"./../discussion"}>
                <button className="nowbutton">Forum</button>
            </Link>
            <Link to={"./../material"}>
                <button className="profbutton">Course Material</button>
            </Link>
            <Link to={"./../Login"}>
                <button className="logoutbutton" onClick={this.props.state.logout}>Log out</button>
            </Link>
        </div>

      <div className="pheonix">
      <Container component = "main" maxWidth = "xs">
        <CssBaseline />
        <Box id = "title">
          <h1>{this.courseNum + " discussion board"}</h1>
        </Box>

        <Box id = "posts">
          

          {this.getPosts()}
        </Box>

        <div id = "questionDiv">
        {/* get input from here */}
          <form noValidate autoComplete="off">
            <TextField
            id="standard-basic"
            label="Your Question" value={this.state.questionTitle}
            fullWidth
            onChange = {this.handleTitleChange}/>

            <div className = "blankInQ"> </div>

            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="4" value={this.state.questionBody}
              variant="outlined"
              fullWidth
              onChange = {this.handleDesChange}
            />

            <div className = "blankInQ"> </div>

            <p> Current Points: {this.state.poster.coins} </p>

            <TextField
              onChange = {this.handleRewardChange}
              id="outlined-number"
              label="Reward Points"
              type="number" value={this.state.rewardPoint}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            <div className = "blankInQ"> </div>

            <Button
            onClick={this.postAQuestion}
            variant="contained"
            color="primary">
              Submit
            </Button>

          </form>
        </div>

      </Container>
        </div>
    </div>
    );
  }
}

export default Forum;

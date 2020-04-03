import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getPosts, addPost } from "./../actions/post";
import { addCoins, getStudent } from "./../actions/student";

import "./styles.css";


class DiscussionBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      questionTitle: "",
      questionBody: "",
      rewardPoint: 0
    };
    getPosts(this);
    getStudent(this.props.state.userId, this);
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

    if (!questionTitle || !questionBody){
      alert("Question title or body must not be empty!!");
      return;
    }

    let post = {
      authorId: this.props.state.userId,
      question: questionTitle,
      content: questionBody,
      bounty: bounty,
      postId: this.state.posts.length
    }

    addPost(post, this);
    addCoins(-bounty, this.props.state.userId, this);
    this.setState({questionTitle: "", questionBody: "", rewardPoint: 0});
  };

  getPosts(){
    let posts = [];
    for (let i=0; i<this.state.posts.length; i++){
      if (this.state.posts[i].courseNum) continue;
      posts.push(<Link
            color="textPrimary"

            to = {"./../Post/"+this.state.posts[i]._id}
          >{this.state.posts[i].question}</Link>)
      posts.push(<div className = "blankInP" />)
    }
    return posts
  }

  render() {
    if (!this.state.poster) return (<div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
                <button className="profbutton"> Home </button>
                <button className="profbutton">Profile & Posts</button>
                <button className="nowbutton">Forum</button>
                <button className="profbutton">Course Material</button>
        </div>);

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
          <h1>Discussion Board</h1>
        </Box>

        <Box id = "posts">
          

          {this.getPosts()}
        </Box>

        <div id = "questionDiv">
        {/* get input from here */}
          <form noValidate autoComplete="off">
            <TextField
            id="standard-basic"
            label="Your Question"
            fullWidth value={this.state.questionTitle}
            onChange = {this.handleTitleChange}/>

            <div className = "blankInQ"> </div>

            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="4"
              variant="outlined"
              fullWidth value={this.state.questionBody}
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

export default DiscussionBoard;

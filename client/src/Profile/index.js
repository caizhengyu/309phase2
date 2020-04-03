import React from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Post from "./../Post";
import {displayPreview} from "./../preview";
import "./styles.css";
import { getPosts } from "./../actions/post";
import {getStudent} from "./../actions/student";

/* Component for the Home page */
class Profile extends React.Component {
  constructor(props) {
    // When the componenet is created
    super(props);
    this.state = {
      seconds: 0,
      posts: [],

      userId: parseInt(window.location.href.substring(window.location.href.lastIndexOf("/")+1)),
      curPost: [<div>12341234</div>],
      postToDisplay: []
    };

    getPosts(this);
    getStudent(this.state.userId, this);
  }


  showPosts = () =>{
    this.myposts=this.state.posts.filter(p => p.authorId === this.state.userId.toString());
    this.pic = this.props.state.getImg(this.state.poster);
    if (this.state.poster.removed) return [];

    let posts = this.myposts.reduce((allPosts, thisPost)=>{
      let thisPostId = "./../Post/" + thisPost._id
      allPosts.push(
        <div className = "aPost">
          <Button className="myButton" onClick={()=>displayPreview(thisPost)}>Preview</Button>
            <div className="Posts">
              <Link
              to={{pathname: thisPostId, data: thisPost}}
              color="textPrimary"
              aria-current="page"
              href="/components/breadcrumbs/">
                  <h1>{thisPost.question}</h1>
              </Link>
              <span className="status">Status: {thisPost.status}</span>
              <br></br>
              <span className="status">Bounty: {thisPost.bounty + (thisPost.courseNum? ", subject: "+thisPost.courseNum : "")}</span>
            </div>
        </div>);
        return allPosts;
    } ,[]);
    return (<div>{posts}</div>);
  }

  render() {
    if (isNaN(this.state.userId)){
      return <Redirect to="./../Home-user" />;
    }
    if (!this.state.posts || !this.state.poster) return (<div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
                <button className="profbutton"> Home </button>
                <button className="nowbutton">Profile & Posts</button>
                <button className="profbutton">Forum</button>
                <button className="profbutton">Course Material</button>
        </div>);

    return (
      <div>
        <div className="verticalbar">

            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <Link to={"./../home-" + (this.props.state.class=="admin" ? "admin" : "user")}>
                <button className="profbutton"> Home </button>
            </Link>

            <Link to={"./../Profile/" + this.props.state.userId}>
                <button className="nowbutton">Profile & Posts</button>
            </Link>

            <Link to={"./../discussion"}>
                <button className="profbutton">Forum</button>
            </Link>
            <Link to={"./../material"}>
                <button className="profbutton">Course Material</button>
            </Link>
            <Link to={"./../Login"}>
                <button className="logoutbutton" onClick={this.props.state.logout}>Log out</button>
            </Link>
        </div>

        <div id="main" className="Bernie">
            {/*this.state.CurPost*/}
          <div id = "blank"> </div>

          <div className = "myQ">
            <h1> {this.state.poster.name}'s Questions </h1>
          </div>

          <div id = "blank"> </div>

          {this.showPosts()}

          <div className="basics">
            <img src={this.pic} />
            <p>{this.state.poster.name}</p>
            <p>Coins: {this.state.poster.coins}</p>

          </div>

        </div>
      </div>
    )
  }

}



export default Profile;

import React from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Comment from "./../Comment";
import SendIcon from '@material-ui/icons/Send';
import {getPost, addComment, pickAnswer, removePost} from "./../actions/post";
import {addCoins} from "./../actions/student";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./styles.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HomeIcon from '@material-ui/icons/Home';


/* Component for the Home page */
class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {post: {question: "", answers:[], authorId: "0"},
                  open: false};
    let temp = window.location.href;
    this.postId = temp.substring(temp.lastIndexOf("/")+1);
    this.isAdmin = this.props.state.class==="admin"? "visible" : "hidden";
    getPost(this, this.postId);
  }
    
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };


  submit = () => {
    if (!this.state["main"]) return;
    let answer = {
      authorId: this.props.state.userId,
      content: this.state["main"],
      replies: [],
    };
    addComment(answer, this);
    this.setState({["main"]: ""});
  }

  render() {
    if (!this.state.ok) return <div />
    const temp = this.state.post.courseNum? "material/"+this.state.post.courseNum:"discussion";
    if (this.state.redirect) return <Redirect to={"./../"+temp}/>;
    return (<div><img className="postBG" src={require("./../pics/bg2.jpg")} />
      <div className="Outer">
      <div className="Title">{this.state.post.question}</div><div className="backContainer"><div className="backLink">
                                                        <Link to={"./../"+temp}><IconButton><HomeIcon fontSize="medium"/>
                                                        </IconButton></Link></div><Link to={"./../"+temp}><div className="white">{this.state.post.courseNum? this.state.post.courseNum : ""}</div>
                                                        </Link></div>
      {this.showComments()}
       <div className="Comments">
        
        <div className="Comment">

          <div className="context">
          <TextField name="main" onChange={this.handleChange.bind(this)} label={"your reply"} fullWidth 
                        multiline rows="6" variant="outlined" value={this.state["main"]} />
                        <div className="buttonContainer">
                        <Button variant="contained" color="primary" startIcon={<SendIcon />} 
                              size="large" onClick={this.submit}>
                        Submit</Button>
            </div>
          </div>
        </div>
       </div>
      </div>
              <Dialog
                open={this.state.open}
                onClose={()=>this.setState({open: false})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Remove this post?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {"Note this will remove all the comments and this action cannot be undo."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>this.setState({open: false})} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={()=>{removePost(this.state.post._id);this.setState({redirect: true})}} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog></div>
    )
  }

  showComments(){
    
    const authorIcon = this.props.state.getImg(this.state.poster);

    let comments = [<div className="Comment"> 
                    <div className="iconContainer"><Link to={"./../Profile/"+this.state.poster.userId}>
                        <img src={authorIcon} className="icon"/><div className="myName">{this.state.poster.name}</div></Link></div>

                      <div className="contextContainer">
                      <div className="context">{this.state.post.content}<div className="bountyContainer">{"Bounty: "+this.state.post.bounty}
                      </div></div>
                      </div><div className={"removeButton "+this.isAdmin}><IconButton><DeleteIcon fontSize="medium" onClick={()=>this.setState({open:true})}/></IconButton></div></div>];
    let answers=this.state.post.answers;
    for (let i=0; i<answers.length; ++i){
      let authorId = answers[i].authorId;
      let comment = (<Comment comment={answers[i]} postId={this.postId}
              ownerId={this.state.poster.userId} pickComment={this.pickComment} status={this.state.post.status} getImg={this.props.state.getImg}
                    posterId={authorId} myName={"c"+i} handle={this.handleChange} user={this.props.state.userId} isAdmin={this.isAdmin}/>)
      if (answers[i].picked) comments.splice(1, 0, comment);
      else comments.push(comment);

    }
    return <div className="Comments">{comments}</div>;
  }

  pickComment = (j, authorId) => {
  	// this.props.pickAnswer(this.postId, j);
    pickAnswer(this.postId, j, this);
    addCoins(this.state.post.bounty, authorId, {});
  }

}

export default Post;



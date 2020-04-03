import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Reply from "./../Reply";
import SendIcon from '@material-ui/icons/Send';
import {addReply, removeComment} from "./../actions/post";
import {getStudent} from "./../actions/student";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


import "./styles.css";

/* Component for the Home page */
class Comment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      comment: props.comment,
      move: false,
      visibility: "hidden",
      myText: "REPLY"
    };
    getStudent(props.posterId, this);
  }


  render() {
    if (this.state.poster === undefined) return <div />;

    let url;
    this.authorIcon = this.props.getImg(this.state.poster);
    this.myName = this.props.myName;
    if (this.state.comment.picked || ((this.props.user===this.props.ownerId) && (this.props.status==="ongoing"))) this.canPick = "";
    else this.canPick = "hidden";

    // console.log(this.props.user, this.props.owner.id,)
    return(<div className="Comment">
      <div className="iconContainer"><Link to={"./../Profile/"+this.state.poster.userId}>
        <img src={this.authorIcon} className="icon" /><div className="myName">{this.state.poster.name}</div></Link></div>

      <div className="contextContainer">
      <div className="context">{this.state.comment.content}<div className={"bountyContainer "+this.canPick}>{this.isPicked()}
                      </div></div>
      <div className="buttonContainer">
      <Button variant="outlined" size="small" onClick={this.move.bind(this)}>{this.state.myText}</Button></div>
      <div className={this.state.visibility}>
      <TextField name={this.myName} onChange={this.props.handle.bind(this)} label={"to "+this.state.poster.name} fullWidth 
        multiline rows="3" variant="outlined" value={this.state[this.myName]}/>
                              <div className="submitContainer">
                     <Button variant="contained" color="primary" startIcon={<SendIcon />} 
                              size="small" onClick={()=>{this.submit(this); this.move()}}>
                        Submit</Button></div>
      </div> <div className="replies">{this.getReplies()}</div>
      </div>
      <div className={"removeButton "+(this.state.comment.picked? "hidden" : this.props.isAdmin)}><IconButton><DeleteIcon fontSize="medium" onClick={()=>{removeComment(this);window.location.reload()}} /></IconButton></div>
    </div>)
  }

  isPicked(){
    if (this.state.comment.picked) return "Picked Answer!!";
    return <button onClick={()=>{this.props.pickComment(this.state.comment._id, this.state.comment.authorId);}}>Pick this answer</button>;
  }

  force = () =>this.forceUpdate();

  submit = t =>{
    if (!t.state[t.myName]) return;
    let msg = {
      authorId: t.props.user,
      to: t.state.poster.userId,
      content: t.state[t.myName]
    };
    addReply(msg, this);
    this.setState({[this.myName]: ""});
  }


  move(){
    if (this.state.move){
      this.setState({move: false, visibility: "hidden", myText: "REPLY"});
      return;
    }
    this.setState({move: true, visibility: "textReply", myText: "CANCEL"});
  }



  getReplies(){
    let replies = this.state.comment.replies;
    let allReplies = [];
    for (let i=0; i<replies.length; ++i){
      let authorId = replies[i].authorId;

      let toStudentId = replies[i].to

      allReplies.push(<Reply posterId={authorId} reply={replies[i]} comment={this.comment} toStudentId={toStudentId} force={this.force}
                      myName={this.myName+"r"+i} handle={this.props.handle} user={this.props.user} submit={this.submit}/>);
    }
    return allReplies;
  }

}
export default Comment;



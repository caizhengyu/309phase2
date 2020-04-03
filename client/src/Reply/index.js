import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import {getStudent} from "./../actions/student";


import "./styles.css";

/* Component for the Home page */
class Reply extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      move: false,
      visibility: "hidden",
      myText: "REPLY"
    }
    this.reply = props.reply;
    this.myName = props.myName;
    getStudent(props.posterId, this);
    getStudent(props.toStudentId, this, 2);
  }

  render() {
    if (!this.state.poster || !this.state.toStudent) return <div />;

    let author = this.state.poster;
    return(<div className="reply">
                    <Link to={"./../Profile/"+author.userId} className="noD"><span>{author.name}</span></Link>
                    <span> :</span>
                    <Link to={"./../Profile/"+this.reply.to} className="noD"><span>{"@"+this.state.toStudent.name} </span></Link>
                    <span>{this.reply.content}</span>
                    
                    <div className="replyButtonContainer">
                      <Button size="small" onClick={this.move.bind(this)}>{this.state.myText}</Button></div>
                      <div className={this.state.visibility}>
                      <TextField name={this.myName} onChange={this.props.handle.bind(this)} label={"to "+ author.name} 
                        fullWidth multiline rows="2" variant="outlined" value={this.state[this.myName]} />

                      <div className="submitContainer">
                     <Button variant="contained" color="primary" startIcon={<SendIcon />} 
                              size="small" onClick={()=>{this.props.submit(this); this.move(); this.props.force();}}>
                        Submit</Button></div>
                      </div>
                    </div>
                    )
  }

  move(){
    if (this.state.move){
      this.setState({move: false, visibility: "hidden", myText: "REPLY"});
      return;
    }
    this.setState({move: true, visibility: "textReply", myText: "CANCEL"});
  }

}
export default Reply;



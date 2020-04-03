import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {getCourses, removeContent, addContent, addCourse, removeCourse} from "./../actions/course";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import "./styles.css";


let contents = ["this is the first chapter", "this is the second chapter"];



class CourseMaterial extends React.Component {

    constructor(props) {
        super(props);
        getCourses(this);
        this.isAdmin = this.props.state.class==="admin"? "visible" : "hidden";
    }

  state = {open: false}

  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };

  handleOpen = (b, curCourseNum, curCourseId) => {
    this.setState({open: b, curCourseNum: curCourseNum, curCourseId: curCourseId});
  }
    
  // Each section of the Queue now has its own componenet, cleaning up the
  // JSX a lot.
  render() {
    if (!this.state.ok) return(<div>
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <button className="profbutton"> Home </button>
            <button className="profbutton">Profile & Posts</button>
            <button className="profbutton">Forum</button>
            <button className="nowbutton">Course Material</button>
            <button className="logoutbutton">Log out</button>
        </div></div>)


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
                <button className="profbutton">Forum</button>
            </Link>
            <Link to={"./../material"}>
                <button className="nowbutton">Course Material</button>
            </Link>
            <Link to={"./../Login"}>
                <button className="logoutbutton" onClick={this.props.state.logout}>Log out</button>
            </Link>
        </div>

        <div className = "admintitle">
            <h1>Course Material</h1>  
            <hr className="sepline"></hr><br/>
            <form className={this.isAdmin}>
                <input type="text" onChange={this.handleInputChange.bind(this)} name="courseNum" />
                <Button variant="contained" onClick={this.addCourse}> Add Course </Button>
        </form>     
        </div>
        


        <div className = "admincourseboard">
            {this.showCourses()}
            
        </div> 

        <Dialog
                open={this.state.open}
                onClose={()=>this.handleOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Remove " + this.state.curCourseNum + "?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {"Note this will delete all posts associate to this course and this action cannot be undo."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>this.handleOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={()=>removeCourse(this.state.curCourseId, this.state.curCourseNum)} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
      </div>
    );
  }

  addCourse = () => {
    if (!this.state.courseNum || /\s/.test(this.state.courseNum)){
        alert("Invalid course format, no space is allowed!!");
        return;
    }
    addCourse(this);
    this.setState({courseNum: ""});
  }


  showCourses = () => {
    let courses = [];
    for (let i=0; i<this.state.courses.length; ++i){
        courses.push(<Course course={this.state.courses[i]} handleInputChange={this.handleInputChange} 
            handleOpen={this.handleOpen} isAdmin={this.isAdmin} />)
    }
    return courses;
  }


}

export default CourseMaterial;



class Course extends React.Component{

    state = {course: this.props.course, v: ""};

    showContents = () => {
        let content = [];
        for (let i=0; i<this.state.course.content.length; i++){
            content.push(
                    <tr><td>
                        {this.state.course.content[i]}
                        </td>
                        <td className={this.props.isAdmin}><button onClick={()=>removeContent(i, this)}>remove</button>
                        </td>
                    </tr>)
        }
        return content;
    }


    render(){
        return (<div className = "admincoursecard">
            <h2>{this.state.course.courseNum}</h2>
            <form className={this.props.isAdmin}>
                <input type="text" name="v" value={this.state.v} onChange={this.props.handleInputChange.bind(this)}/>
                <Button variant="contained" onClick={this.addContent}> Add </Button>
                <IconButton><DeleteIcon fontSize="medium" onClick={this.toggleRemove} /></IconButton>
            </form>
            <br />
            <table className="courseTable">
                <tbody>
                    <tr>
                        <th> content </th>
                        <th className={this.props.isAdmin}> action </th>
                    </tr>
                    {this.showContents()}
                    <tr><td>
                        <Link to={"./../material/" + this.state.course.courseNum}>{this.state.course.courseNum + " Forum"}</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }

    toggleRemove = () => {
    this.props.handleOpen(true, this.state.course.courseNum, this.state.course._id);
  }

    addContent = () => {
        if (!this.state.v) {
            alert("Invalid content input!!");
            return;
        }
        addContent(this);
        this.setState({v: ""});
    }


}



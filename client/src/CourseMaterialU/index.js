import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./styles.css";


class CourseMaterialU extends React.Component {

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    // log(name)

    // 'this' is bound to the component in this arrow function.
    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };
  
    
  // Each section of the Queue now has its own componenet, cleaning up the
  // JSX a lot.
  render() {
    return (
     <div>
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <Link to={"./../home-user"}>
                <button className="profbutton"> Home </button>
            </Link>            
            <Link to={"./../Profile/" + this.props.state.user}>
                <button className="profbutton">Profile & Posts</button>
            </Link>
            <Link to={"./../discussion"}>
                <button className="profbutton">Forum</button>
            </Link>
            <Link to={"./../materialU"}>
                <button className="nowbutton">Course Material</button>
            </Link>
        </div>

      <div className="usercourse">
        <div className = "title">
          <h1>Course Material</h1> 
          <hr className="linesep"></hr>       
        </div>
        
        <div id = "cboard" className = "admincourseboard">
            <div id="mathc" className = "admincoursecard">
            <h2>CSC996</h2>
            <br />
            <table id="math" className="courseTable">
                <tbody>
                    <tr>
                        <th> content </th>
                    </tr>
                    <tr>
                        <td> this is the first chapter</td>
                        
                    </tr>
                    <tr>
                        <td> this is the second chapter</td>
                        
                    </tr>
    
                </tbody>
            </table>
            </div>
            <div id="csc" className = "admincoursecard">
            <h2>MAT500</h2>
            <br />
            <table id="cs" className="courseTable">
                <tbody>
                    <tr>
                        <th> content </th>
                    </tr>
                </tbody>
            </table>
            </div>
        </div> 

      </div>
    </div>
    );
  }
}

export default CourseMaterialU;

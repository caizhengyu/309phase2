import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

/* Component for the Home page */
class HomeUser extends React.Component {
    render() {
    return (
      <div>
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <Link to={"./../home-user"}>
                <button className="nowbutton"> Home </button>
            </Link>            
            <Link to={"./../Profile/" + this.props.state.userId}>
                <button className="profbutton">Profile & Posts</button>
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

        
      <div className="user-home">
        <div className="userhead">
            <h1>{"Greetings, " + this.props.state.currentUser + "!"}</h1>
            <hr className="sepline"></hr>
        </div>
        <div id = "notifi" className = "mynotification">
          <h1 className = "header"> Important Notice </h1>
          <h3>{"This is a private source for students in CSC309H1S. It is aimed to support students' study process and to advance Prof-Student connection."}</h3>
          <h3>{"All the materials are distributed for free to students participating in CSC309H1S, and are not for sale or other commercial uses whatsoever. "+
                "We kindly ask you to refrain from copying or selling in part or in whole any information provided on this website."}</h3>
        <h3>{"Thank you for choosing us. We sincerely wish you the best of luck in your future!"}</h3>
        </div>
        <div id="td" className="mytodoLists">
            <h2 className="header"> Contact</h2>
            <h4>{"For general inquiries, please use the main discussion board (redirect using the Forum button located on the left panel)"}</h4>
            <h4>{"For urgent matter, please email caizhengyu98@gmail.com for help."}</h4>
        </div>

      </div>


    </div>
    );
  }
}

export default HomeUser;

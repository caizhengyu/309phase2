import React from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { login } from "./../actions/user";
import CategoryIcon from '@material-ui/icons/Category';
import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {

    state = { redirect: null };
    redirect() {
        const u = document.querySelector('#in').value;
        const p = document.querySelector('#pwd').value;
        login({username: u, password: p}, this.props.app);
    }
    render() {
      if (this.props.state.class === "user") {
        return <Redirect to= "./../home-user" />
      }
      else if (this.props.state.class === "admin"){
        return <Redirect to= "./../home-admin" />
      }
      this.bg = require("./../pics/bg.jpg");

      return(
      <div className="backerr">
        <div className='loginheader'>
        </div>
        <img className = "loginbox" src = {this.bg} />
        <div className = 'loginbox'>
            <form id = "box" className = "inputform">
                <input id="in" type="text" placeholder="username" className="logininput"/> <br/>
                <input id="pwd" type="password" placeholder="password" className="logininput"/> <br/>
                <div className="submitbtn">
                    <Button variant="contained" color="primary"
                        startIcon={<CategoryIcon />} onClick={this.redirect.bind(this)}>
                    Sign in
                  </Button>
                </div>
            </form>
            </div>
      </div>  
      )
    }

}

export default Home;

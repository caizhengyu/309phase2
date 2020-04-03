import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./styles.css";
import DeleteIcon from '@material-ui/icons/Delete';
import {getStudents, getUsers, addStudent, updateInfo, updatePw} from "./../actions/student";
import {removeUser} from "./../actions/user";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



/* Component for the Home page */
class HomeAdmin extends React.Component {
    constructor(props) {
    // When the componenet is created
    super(props);
    this.state = {passwordText: "password",
                rightHeader: "Add an user",
                removeState: "hidden",
                saveAction: this.addUser,
                open: false
    };
    getStudents(this);
    getUsers(this);
  }


  handleOpen = (b, curUsername, curUserId) => {
    this.setState({open: b, curUsername: curUsername, curUserId: curUserId});
  }

  showUsers(){
    let allUsers = [];
    for (let i=0; i<this.state.users.length; ++i){
      if (this.state.users[i].removed) continue;
        allUsers.push(<Trow user={this.state.users[i]}
                            student={this.state.students[i]}
                            handleOpen={this.handleOpen}
                            toggleEdit={this.toggleEdit}
                            propsUsername={this.props.state.currentUser} />);
    }
    return allUsers;
  }


  toggleEdit = (item) => {
    this.setState({usrname: item.user.username,
                name: item.student.name,
                coins: item.student.coins,
                icon: item.student.pic,
                passwordText: "No update if blank",
                rightHeader: item.user.username + "'s profile",
                removeState: "visible",
                curUserId: item.student.userId,
                saveAction: this.updateUser
            })
    let f = document.querySelector("#iconField");
    if (!f.firstChild || !f.firstChild.hasChildNodes()) f.innerText = item.student.pic;
    else f.firstChild.innerText = item.student.pic; 
  }

  toggleRemove = () => {
  }


  render() {
    if (!this.state.students || !this.state.users) return (<div>
        
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <button className="nowbutton"> Home </button>
            <button className="profbutton">Profile & Posts</button>
            <button className="profbutton">Forum</button>
            <button className="profbutton">Course Material</button>
            <button className="logoutbutton">Log out</button>
        </div></div>)


    return (
      <div>
        
        <div className="verticalbar">
            <div className="logo">
                <img src={require("./../logo.png")}/>
            </div>
            <button className="nowbutton"> Home </button>
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
                 

   
        <div className="myhead">
            <h1>Greetings, admin!</h1>
            <hr className="sepline"></hr>
        </div>
        
        <div className="usermanage">
          <h1 className="header"> User Status </h1>
          <table id="usr" className="mytable">
            <tbody>
                <tr>
                    <th>username</th> <th>legal name</th> <th>coins</th> <th>actions</th>
                </tr>

                {this.showUsers()}
                </tbody>
            </table>
        </div>
      <div className = "requests">
          <h1 className = "header"> {this.state.rightHeader} </h1>
          <div className="info">username:</div>
          <input className="field" type="text" placeholder="username" name ="usrname" onChange={this.handleChange} value={this.state.usrname} />
          <div className="info">password:</div>
            <input className="field" placeholder={this.state.passwordText} type="password" name ="pw" onChange={this.handleChange} value={this.state.pw} />

            <div className="info">legal name:</div>
            <input className="field" placeholder="name" name ="name" onChange={this.handleChange} value={this.state.name} />

            <span className="info">coins:</span>

            <span className="iconInfo">icon:</span> <br />

            <input className="coinsField" placeholder="coins" name ="coins" onChange={this.handleChange} value={this.state.coins} />
            <FormControl className="icons">
                <Select name ="icon" onChange={this.handleChange} value={this.state.icon} id="iconField">
                  {this.showIcons()}
                </Select>
              </FormControl>
            <div>
                <span className={this.state.removeState}>
              <Button className={"leftB"} variant="contained" startIcon={<CancelIcon />} onClick={this.cancel}>Cancel</Button></span>
              <Button className="rightB" variant="contained" color="primary" startIcon={<SaveIcon />} onClick={this.state.saveAction}> Save </Button>
            </div>
        </div>
        

        <Dialog
                open={this.state.open}
                onClose={()=>this.handleOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Remove user " + this.state.curUsername + "?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {"Note this will not remove user's past posts and this action cannot be undo."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>this.handleOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={()=>removeUser(this.state.curUserId)} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
      </div>
    );
  }

  showIcons = () => {
    let icons = [];
    Object.keys(this.props.state.pok).forEach(item =>{
        icons.push(<MenuItem value={item}>{item}</MenuItem>)
    });
    return icons;
  }


  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };


  addUser = () => {
    if (!this.state.usrname || !this.state.name || !this.state.coins || !this.state.icon || !this.state.pw){
      alert("Invalid empty input, please check and try again!!");
      return;
    }

    if (/\s/.test(this.state.usrname) || this.state.usrname.length < 4){
      alert("username must contain no spaces and length at least 4.");
      return;
    }

    for (let i=0; i<this.state.users.length; ++i){
      if (this.state.users[i].removed) continue;
      if (this.state.users[i].username === this.state.usrname){
        alert("username must be unique!!");
        return;
      }
    }

    if (this.state.pw && (/\s/.test(this.state.pw) || this.state.pw.length < 4)){
      alert("password must contain no spaces and length at least 4.");
      return;
    }

    if (!/^\d+$/.test(this.state.coins)){
      alert("Invalid coin number!!")
    }

    addStudent(this.state.users.length, this, this);
  }

  updateUser = () => {
    if (!this.state.usrname || !this.state.name || !this.state.coins || !this.state.icon){
      alert("Invalid empty input, please check and try again!!");
      return;
    }

    if (/\s/.test(this.state.usrname) || this.state.usrname.length < 4){
      alert("username must contain no spaces and length at least 4.");
      return;
    }

    for (let i=0; i<this.state.users.length; ++i){
      const user = this.state.users[i]
      if (user.removed) continue;
      if (user.username === this.state.usrname && !user.userId === this.state.curUserId){
        alert("username must be unique!!");
        return;
      }
    }

    if (this.state.pw && (/\s/.test(this.state.pw) || this.state.pw.length < 4)){
      alert("password must contain no spaces and length at least 4.");
      return;
    }

    if (!/^\d+$/.test(this.state.coins)){
      alert("Invalid coin number!!");
      return;
    }
    updatePw(this.state.usrname, this.state.pw, this.state.curUserId);
    updateInfo(this);
  }

  cancel = () => {
    this.setState({
        usrname: "",
        name: "",
        coins: "",
        icon: "",
        passwordText: "password",
        password: "",
        rightHeader: "Add an user",
        removeState: "hidden",
        saveAction: this.addUser
    });
    let f = document.querySelector("#iconField");
    if (!f.firstChild || !f.firstChild.hasChildNodes()) f.innerText = "";
    else f.firstChild.innerText = ""; 
  }

}


class Trow extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        editState: "visible",
        removeState: "hidden",
    };
    this.username = this.props.user.username
  }

  render() {
    return (
        <tr>
            <td><Link to={"./../Profile/" + this.props.student.userId}>{this.username}</Link></td> 
            <td>{this.props.student.name}</td> 
            <td>{this.props.student.coins}</td>
            <td>
            <IconButton><EditTwoToneIcon fontSize="medium" onClick={this.toggleEdit} /></IconButton>
            <span className={this.props.propsUsername===this.props.user.username? "hidden" : "visible"}>
            <IconButton><DeleteIcon fontSize="medium" onClick={this.toggleRemove} /></IconButton></span>
            </td>
        </tr>
    )
  }

  toggleEdit = () => {
    this.setState({editState: "hidden", removeState: "visible"});
    this.props.toggleEdit(this.props)
  }

  toggleRemove = () => {
    this.props.handleOpen(true, this.username, this.props.user.userId);
  }
}

export default HomeAdmin;

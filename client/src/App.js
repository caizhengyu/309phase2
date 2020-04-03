import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './Home';
import DiscussionBoard from './DiscussionBoard'
import DiscussionBoardU from './DiscussionBoardU'
import Profile from "./Profile"
import CourseMaterial from "./CourseMaterial"
import CourseMaterialU from "./CourseMaterialU"
import HomeAdmin from "./Home-admin"
import HomeUser from "./Home-user"
import Post from "./Post"
import Forum from "./Forum"
import { readCookie, logout } from "./actions/user";



class App extends React.Component {
    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
    this.state = {logout: logout.bind(this), 
        getImg: this.getImg,
        pok: {Bulbasaur: ["001", "002", "003"],
            Charmander: ["004", "005", "006"],
            Squirtle: ["007", "008", "009"],
            Caterpie: ["010", "011", "012"],
            Weedle: ["013", "014", "015"],
            Pidgey: ["016", "017", "018"],
            Rattata: ["019", "020"],
            Spearow: ["021", "022"],
            Ekans: ["023", "024"],
            Pikachu: ["025", "026"],
            Sandshrew: ["027", "028"],
            NidoranF: ["029", "030", "031"],
            NidoranM: ["032", "033", "034"],
            Clefairy: ["035", "036"],
            Vulpix: ["037", "038"],
            Jigglypuff: ["039", "040"],
            Zubat: ["041", "042"],
            Oddish: ["043", "044", "045"],
            Paras: ["046", "047"],
            Venonat: ["048", "049"],
            Diglett: ["050", "051"],
            Meowth: ["052", "053"],
            Psyduck: ["054", "055"],
            Mankey: ["056", "057"],
            Growlithe: ["058", "059"],
            Poliwag: ["060", "061", "062"],
            Abra: ["063", "064", "065"],
            Machop: ["066", "067", "068"],
            Bellsprout: ["069", "070", "071"],
            Tentacool: ["072", "073"],
            Geodude: ["074", "075", "076"],
            Ponyta: ["077", "078"],
            Slowpoke: ["079", "080"],
            Magnemite: ["081", "082"],
            Doduo: ["084", "085"],
            Seel: ["086", "087"],
            Grimer: ["088", "089"],
            Shellder: ["090", "091"],
            Gastly: ["092", "093", "094"],
            Drowzee: ["096", "097"],
            Krabby: ["098", "099"]}}
    }

    getImg = student => {
        if (!student.coins) return require("./pics/Eggs.png");
        if (student.coins < 0) return require("./pics/poks/201.png");
            // return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/201.png";
        const pok = this.state.pok[student.pic];
        let temp;
        if (pok.length == 3){
            if (student.coins < 350) temp = pok[0];
            else if (student.coins < 650) temp = pok[1];
            else temp = pok[2];
        }
        if (pok.length == 2){
            temp = student.coins < 550? pok[0] : pok[1];
        }
        return require("./pics/poks/" + temp + ".png");
        // return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + temp + ".png";
    }



  render() {
    if (!this.state.status) return <div />;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' render={() =>
                            (<Home state={this.state} app={this} />)}/>
            <Route exact path='/discussion' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <DiscussionBoard state={this.state}/>}
                        </div>
                        )}/>
            <Route exact path='/discussionU' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <DiscussionBoardU state={this.state}/>}
                        </div>
                        )}/>
            <Route path='/profile' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <Profile state={this.state}/>}
                        </div>
                        )}/>
            <Route exact path='/material' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <CourseMaterial state={this.state}/>}
                        </div>
                        )}/>
            <Route exact path='/home-admin' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <HomeAdmin state={this.state}/>}
                        </div>
                        )}/>
            <Route exact path='/home-user' render={() =>
                        (<div className="app">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <HomeUser state={this.state}/>}
                        </div>
                        )}/>
            <Route path='/Post' render={() =>
                        (<div className="post123">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <Post state={this.state}/>}
                        </div>
                        )}/>
            <Route path='/material/' render={() =>
                        (<div className="post123">
                                {!this.state.currentUser ? <Redirect to="/login" /> : <Forum state={this.state}/>}
                        </div>
                        )}/>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

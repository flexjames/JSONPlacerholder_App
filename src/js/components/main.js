import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";

import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
 
export default class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>JSONPlaceholder App</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Leanne</NavLink></li>
                    <li><NavLink to="/stuff">Clementine</NavLink></li>
                    <li><NavLink to="/contact">Chelsey</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/stuff" component={Stuff}/>
                    <Route path="/contact" component={Contact}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
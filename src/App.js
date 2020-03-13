import React, {Component, Fragment} from 'react';

// styles
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages


// router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {return (<div>Home</div>)}
function User() {return (<div>User</div>)}
function Post() {return (<div>Post</div>)}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeMenu: 'home',
        menus: [
          {key:"home", label:"Home", link:"/"},
          {key:"user", label:"User", link:"/user"},
          {key:"post", label:"Post", link:"/post"}
        ]
    };
  }

  render() {
    const Menus = ({ menus }) => (
      <ul>
        {menus.map(menu =>
          <li key={menu.key} style={{'paddingTop': '8px'}}>
            <Link 
              to={menu.link}
              onClick={() => {
                this.setState({activeMenu: menu.key}
              )}}
              className={'nav btn btn-' + (this.state.activeMenu===menu.key? 'success' : 'default')}
              >{menu.label}</Link>
          </li>
        )}
      </ul>
    )

    return (
      <div className="App">
        <Router>
          <div style={{'padding': '25px 50px'}}>
            <h4>Please Select One Menu:</h4>
            <Menus menus={this.state.menus} />

            <hr />
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/post" component={Post} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

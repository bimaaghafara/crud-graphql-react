import React, {Component} from 'react';

// styles
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import { User } from './modules/user/user';
import { Post } from './modules/post/post';


// router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {return (<div>Home</div>)}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeMenu: '',
        menus: [
          {key:"home", label:"Home", link:"/"},
          {key:"user", label:"User", link:"/user"},
          {key:"post", label:"Post", link:"/post"}
        ]
    };
  }

  setActiveMenu() {
    setTimeout(() => {
      let activeMenu = window.location.pathname.split('/')[1];
      if (activeMenu == "") {
        activeMenu = "home"
      }
      if (this.state.activeMenu != activeMenu) {
        this.setState({activeMenu: activeMenu})
      }
    })
  }

  componentDidUpdate() {
    this.setActiveMenu();
  }

  componentDidMount() {
    this.setActiveMenu();
  }

  render() {
    const Menus = ({ menus }) => (
      <ul>
        {menus.map(menu =>
          <li key={menu.key} style={{'padding': '4px', 'display': 'inline-block'}}>
            <Link 
              to={menu.link}
              onClick={() => this.setActiveMenu()}
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
            <Route path="/user" component={User} />
            <Route path="/post" component={Post} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

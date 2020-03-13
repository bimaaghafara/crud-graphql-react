import React, {Component} from 'react';

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
        activeMenu: 'home'
    };
  }

  render() {

    const Menu = ({ menu }) => (
      <li style={{'paddingTop': '8px'}}>
        <Link 
          to={menu.link}
          onClick={() => {
            this.setState({activeMenu: menu.key}
          )}}
          className={'nav btn btn-' + (this.state.activeMenu===menu.key? 'success' : 'default')}
          >{menu.label}</Link>
      </li>
    );

    return (
      <div className="App">
        <Router>
          <div style={{'padding': '25px 50px'}}>
            <h4>Please Select One Menu:</h4>
            <ul>
              <Menu menu={{key:"home", label:"Home", link:"/"}}/>
              <Menu menu={{key:"user", label:"User", link:"/user"}}/>
              <Menu menu={{key:"post", label:"Post", link:"/post"}}/>
            </ul>
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

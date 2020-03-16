import React, {Component} from 'react';

// styles
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import { User } from './modules/user/user';
import { Post } from './modules/post/post';

// components
import { CustomMenus } from './shared/components/bg-menu/bg-menu';

// router
import { BrowserRouter as Router, Route } from "react-router-dom";

function Home() {return (<div>Home</div>)}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {key:"home", label:"Home", link:"/"},
        {key:"user", label:"User", link:"/user"},
        {key:"post", label:"Post", link:"/post"}
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div style={{'padding': '25px 50px'}}>
            <h4>Please Select One Menu:</h4>
            {/* <BgMenus menus={this.state.menus} /> */}
            <CustomMenus />
            {/* <hr /> */}
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

import React, { Component, Fragment } from 'react';

// pages
import { PostForm } from './post-form/post-form';
import { PostList } from './post-list/post-list';

// router
import { Route, Link } from "react-router-dom";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
      menus: [
        {key:"list", label:"List Post", link:`${this.props.match.url}`},
        {key:"add", label:"Add Post", link:`${this.props.match.url}/add`}
      ],
      routes: [
        {exact: true, path:`${this.props.match.url}`, render: () => (
          <PostList actionType='list'/>
        )},
        {exact: false, path:`${this.props.match.url}/add`, render: () => (
          <PostForm actionType='add'/>
        )},
        {exact: false, path:`${this.props.match.url}/view/:id`, render: () => (
          <PostForm actionType='view'/>
        )},
        {exact: false, path:`${this.props.match.url}/edit/:id`, render: () => (
          <PostForm actionType='edit'/>
        )}
      ]
    };
  }

  setActiveMenu() {
    setTimeout(() => {
      const path = window.location.pathname.split('/')[2];
      let activeMenu;
      if (!path) {
        activeMenu = "list"
      } else if (path == "add") {
        activeMenu = "add"
      } else if (path == "view" || path == "edit") {
        activeMenu = ""
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
              onClick={() => {this.setActiveMenu()}}
              className={'nav btn btn-' + (this.state.activeMenu===menu.key? 'success' : 'default')}
              >{menu.label}</Link>
          </li>
        )}
      </ul>
    )

    const Routes = ({ routes }) => (
      <Fragment>
        {routes.map(route =>
          <Route key={route.path} exact={route.exact} path={route.path} render={route.render}/>
        )}
      </Fragment>
    )

    return (
      <div className="Page-Post">
        <div>
          <h4>Post Menu</h4>
          <Menus menus={this.state.menus} />

          <hr></hr>

          <Routes routes={this.state.routes} />
        </div>
      </div>
    )
  }
}

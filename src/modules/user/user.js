import React, { Component, Fragment } from 'react';

// pages
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';

// router
import { Route, Link } from "react-router-dom";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "",
      menus: [
        {key:"list", label:"List User", link:`${this.props.match.url}`},
        {key:"add", label:"Add User", link:`${this.props.match.url}/add`}
      ],
      routes: [
        {exact: true, path:`${this.props.match.url}`, render: () => (
          <UserList actionType='list'/>
        )},
        {exact: false, path:`${this.props.match.url}/add`, render: () => (
          <UserForm actionType='add'/>
        )},
        {exact: false, path:`${this.props.match.url}/view/:id`, render: () => (
          <UserForm actionType='view'/>
        )},
        {exact: false, path:`${this.props.match.url}/edit/:id`, render: () => (
          <UserForm actionType='edit'/>
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
      <div className="Page-User">
        <div>
          {/* <h4>User Menu</h4>
          <Menus menus={this.state.menus} />

          <hr></hr> */}

          <Routes routes={this.state.routes} />
        </div>
      </div>
    )
  }
}

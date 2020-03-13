import React, { Component } from 'react';

// pages
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';

// router
import { Route, Link } from "react-router-dom";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
      menus: [
        {key:"add", label:"Add User", link:`${this.props.match.url}/add`},
        {key:"list", label:"List User", link:`${this.props.match.url}`}
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
      <div className="Page-User">
        <div>
          <h4>User Menu</h4>
          <Menus menus={this.state.menus} />

          <hr></hr>

          <Route
            exact path={`${this.props.match.url}`} 
            render={(props) => (
              <UserList actionType='list' parentProps={props}/>
            )}
          />
          <Route
            path={`${this.props.match.url}/add`}
            render={(props) => (
              <UserForm actionType='add' parentProps={props}/>
            )}
          />
          <Route
            path={`${this.props.match.url}/view/:id`}
            render={(props) => (
              <UserForm actionType='view' id={props.match.params.id} parentProps={props}/>
            )}
          />
          <Route
            path={`${this.props.match.url}/edit/:id`}
            render={(props) => (
              <UserForm  actionType='edit' id={props.match.params.id} parentProps={props}/>
            )}
          />
        </div>
      </div>
    )
  }
}

import React, {Component} from 'react';

// router
import { Link } from "react-router-dom";

export class BgMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
    }
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
    const {menus} = this.props;
    return (
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
  }
}
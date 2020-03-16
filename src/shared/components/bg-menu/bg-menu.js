import React, {Component, Fragment} from 'react';

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

export class CustomMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: {
        level1: null,
        level2: null
      },
      menus: {
        level1: [
          {
            key:"home", label:"Home", link:"/",
            children: []
          },
          {
            key:"user", label:"User", link:"/user",
            children: [
              {key:"list", label:"List User", link:'/user'},
              {key:"add", label:"Add User", link:'/user/add'}
            ]
          },
          {
            key:"post", label:"Post", link:"/post",
            children: [
              {key:"list", label:"List Post", link:'/post'},
              {key:"add", label:"Add Post", link:'/post/add'}
            ]
          }
        ],
        level2 : []
      }
    }
  }

  setActiveMenu() {
    // setTimeout(() => {
    //   let activeMenu = window.location.pathname.split('/')[1];
    //   if (activeMenu == "") {
    //     activeMenu = "home"
    //   }
    //   if (this.state.activeMenu != activeMenu) {
    //     this.setState({activeMenu: activeMenu})
    //   }
    // })
  }

  componentDidUpdate() {
    this.setActiveMenu();
  }

  componentDidMount() {
    this.setActiveMenu();
  }

  render() {
    const {menus, activeMenu} = this.state;
    const RenderMenu = ({level, childrenLevel}) => (
      <ul>
        {menus[level].map(menu =>
          <li key={menu.key} style={{'padding': '4px', 'display': 'inline-block'}}>
            <Link 
              to={menu.link}
              onClick={() => this.setState({
                menus: {...menus, [childrenLevel]: menu.children},
                activeMenu: {...activeMenu, [level]: menu.key, [childrenLevel]: null}
              })}
              className={'nav btn btn-' + (this.state.activeMenu[level]===menu.key? 'success' : 'default')}
              >{menu.label}</Link>
          </li>
        )}
      </ul>
    )

    return (
      <Fragment>
        <RenderMenu level={'level1'} childrenLevel={'level2'}/>
        <RenderMenu level={'level2'} childrenLevel={'level3'} />
      </Fragment>
      // <ul>
      //   {menus.level1.map(menu =>
      //     <li key={menu.key} style={{'padding': '4px', 'display': 'inline-block'}}>
      //       <Link 
      //         to={menu.link}
      //         onClick={() => this.setState({
      //           menus: {
      //             ...menus,
      //             level2: menu.children
      //           }
      //         })}
      //         className={'nav btn btn-' + (this.state.activeMenu.level1===menu.key? 'success' : 'default')}
      //         >{menu.label}</Link>
      //     </li>
      //   )}
      // </ul>
    )
  }
}
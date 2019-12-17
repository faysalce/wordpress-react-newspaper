import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMenu } from "../../actions";
import LoaderList from "../../components/home/loaderList";

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.actions.fetchMenu(this.props.name).then( () => this.setState({ loading: false}));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name === nextProps.menu.name;
  }
  renderSubMenu(menutems) {
    return (
      <ul role="menu" className="dropdown-menu">
        {menutems.map(item => {
          return (
            <li
              key={item.ID}
              className={item.url == window.location.pathname ? "active" : ""}
            >
              <Link  onClick={()=>this.props.menuToggle()} to={Menu.getRelativeUrl(item.url)}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  renderMenu(menu) {
    if (this.props.name === menu.name) {  
      return menu.items.map(item => {
        return (
          <li
            key={item.ID}
            className={
              (item.url == window.location.pathname) &
              (item.children.length > 0)
                ? "dropdown active"
                : item.children.length > 0
                ? "dropdown"
                : ""
            }
          >
            <Link
              className={item.children.length > 0 ? "dropdown-toggle" : ""}
              data-toggle={item.children.length > 0 ? "dropdown" : ""} 
              to={Menu.getRelativeUrl(item.url)}
              onClick={()=>this.props.menuToggle()}
            >
              {item.title}{" "}
              {item.children.length > 0 ? <span className="caret"></span> : ""}{" "}
            </Link>

            {item.children.length > 0 ? this.renderSubMenu(item.children) : ""}
          </li>
        );
      });
    }
  }

  static getRelativeUrl(url) {
    if (url === window.location.origin) {
      return "/";
    }

    return url.substr(window.location.origin.length);
  }

  getClasses(location = "") {
    switch (location) {
      case "main_menu":
        return "nav navbar-nav";
      case "footer_menu":
        return "nav justify-content-center";
      default:
        return "";
    }
  }

  render() {
    console.log("MENU", this.props);
    return (
      <ul className={this.getClasses(this.props.menu.name)}>
        {this.state.loading?'':this.renderMenu(this.props.menu)}
      </ul>
    );
  }
}

function mapStateToProps({ menu }) {
  return { menu };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchMenu }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

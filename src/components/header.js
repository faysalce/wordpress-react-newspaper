import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../containers/parts/menu";
import Search from "./search";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Headline from "../components/home/scroll";
import { fetchPostsHead, ROUTER } from "../actions/index";
class Header extends Component {
    _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

  }
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  componentDidMount() {
    this._isMounted = true;

    this.props.fetchPostsHead(1);
    this.setState({ isOpen: false});
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillReceiveProps(nextProps) {
    // if (JSON.stringify(this.props.headline) !== JSON.stringify(nextProps.headline)) {
    //     this.props.fetchPostsHead(1);
    // }else{
    //     return false
    // }
    // console.log(nextProps);
  }

  render() {
    return (
      <header className="header">
        <div className="header-metabar static">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="day-times">
                <span>{RT_API.header_date}</span>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 hidden-xs">
              <ul className="list-inline text-center header-socials">
                <li>
                  <a href="">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>

                <li>
                  <a href="">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a href="">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>

                <li>
                  <a href="">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-xs-12 col-sm-4">
              <div className="search-holder">
                <Search />
              </div>
            </div>
          </div>
        </div>

        <div className="header-brandbar mb-20">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <Link className="header-brand" to="/">
                {" "}
                <img
                  className="img-responsive"
                  src={RT_API.template_directory_uri + "/images/logo.png"}
                  alt="..."
                />
              </Link>
            </div>

            <div className="col-xs-12 col-sm-4 hidden-xs">
              <div className="ad-spaces">Ad Space</div>
            </div>

            <div className="col-xs-12 col-sm-4 hidden-xs">
              <div className="ad-spaces">Ad Space</div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-inverse">
          <div className="container-no">
            <div className="navbar-header" onClick={()=>this.toggleOpen()}>
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-expanded="false"
                
              >
                <span className="sr-only">Toggle navigation</span>

                <span className="icon-bar"></span>

                <span className="icon-bar"></span>

                <span className="icon-bar"></span>
              </button>

              <a className="navbar-name" href="#" style={{color:"#fff"}}>
              {this.state.isOpen?"মেনু বন্ধ করুন":"মেনু দেখুন"}
              

              </a>
            </div>

            <div className={this.state.isOpen?"collapse navbar-collapse in":"collapse navbar-collapse"} id="navbarCollapse">
              <Menu name="main_menu" menuToggle={this.toggleOpen} />
            </div>
          </div>
        </nav>

        <Headline />
      </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsHead, dispatch }),
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Header);

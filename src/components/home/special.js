import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeSpecial, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class Special extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.fetchPostsHomeSpecial().then( () => this.setState({ loading: false}));
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(special) {
    if (special.length) {
      return special.map(post => {
        return (
          <li key={"sp" + post.id}>
            <Link to={this.extractPath(post.link)}>
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  ></span>
                </Link>
          </li>
        );
      });
    }
  }


  render() {
    return (
      <ul className="sidebar-post-lists mb-0">
        {" "}
        {this.state.loading?<LoaderList />:this.renderPosts(this.props.special)}
      </ul>
    );
  }
}

function mapStateToProps({ special }) {
  return { special };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsHomeSpecial, dispatch }),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Special);

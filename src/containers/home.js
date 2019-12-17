import React, { Component, Fragment } from "react";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchPosts, ROUTER } from "../actions/index";

import Header from "../components/header";
import HomeBody from "../components/home/homeBody";
import Footer from "../components/footer";

class Home extends Component {
  componentWillMount() {
    this.props.fetchPosts(this.props.match.params.pageNum || 1);
    this.props.dispatch({
      type: ROUTER,
      payload: this.props.match
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.pageNum !== nextProps.match.params.pageNum ||
      this.props.location.pathname !== nextProps.location.pathname
    ) {
      this.props.fetchPosts(nextProps.match.params.pageNum || 1);
      this.props.dispatch({
        type: ROUTER,
        payload: nextProps.match
      });
    }
  }

  componentDidUpdate() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
  }

  render() {
    return (
      <Fragment>
        <Header />
        <HomeBody />
        <Footer />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ fetchPosts, dispatch }), dispatch);
}

export default connect(null, mapDispatchToProps)(Home);

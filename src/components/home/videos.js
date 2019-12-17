import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import VideoLoader from "./videoLoader";

class Videos extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.fetchPostsHomeCat(6, this.props.catID).then( () => this.setState({ loading: false}));
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(country) {
    console.log("this is country");
    console.log(country);
    //return false;
    if (country) {
      if (country.length) {
        return country.map(post => {
          return (
            <div
              key={this.props.catID + post.id}
              className="col-xs-6 col-sm-6 col-md-6 padding-5"
            >
              <div className="post post-teaser post-teaser-feat post-video">
                <Link to={this.extractPath(post.link)} className="post-thumb">
                  <div
                    className="post-thumb-image"
                    style={{
                      backgroundImage:
                        "url('" + post.featured_image_url.thumbnail + "')"
                    }}
                  ></div>
                </Link>

                <div className="post-denote">
                  <h4 className="post-title text-center">
                    <Link to={this.extractPath(post.link)}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered
                        }}
                      ></span>
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          );
        });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-12 ">
          <Link to={"/category/"+this.props.cat_slug}> <h3 className="category-heading">
              <span>ভিডিও</span>
            </h3></Link>
          </div>
          
        </div>
        <div className="row">
          {this.state.loading?<VideoLoader />:this.renderPosts(this.props.homeCat[this.props.catID])}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ homeCat }) {
  return { homeCat };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsHomeCat, dispatch }),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);

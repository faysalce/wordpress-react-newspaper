import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeFeatured, ROUTER } from "../../actions";
import FeaturedLoader from "./featuredLoader";

class Featured extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.fetchPostsHomeFeatured(this.props.catID).then( () => this.setState({ loading: false}));
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(featured) {
    if (featured.length) {
      return featured.map(post => {
        return (

           
          <div  key={'hf'+post.id} className="col-sm-6 col-md-4 home-featured">
            <div className="post post-teaser post-teaser-feat">
              <Link to={this.extractPath(post.link)} className="post-thumb">
                <div
                  className="post-thumb-image"
                  style={{
                    backgroundImage:
                      "url('" + post.featured_image_url.medium + "')"
                  }}
                ></div>
              </Link>

              <div className="post-denote">
                <h4 className="post-title home-featured-title">
                  <Link to={this.extractPath(post.link)}>
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
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

  getClasses() {
    return this.isSingle() ? "" : "card-columns";
  }

  render() {
    return <Fragment>{this.state.loading?<FeaturedLoader />:this.renderPosts(this.props.featured)}</Fragment>;
  }
}

function mapStateToProps({ featured }) {
  return { featured };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsHomeFeatured, dispatch }),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class OneThumbOthersSmall extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.fetchPostsHomeCat(this.props.pageNum, this.props.catID).then( () => this.setState({ loading: false}));
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }
  renderPostsParent(country) {
    if (country) {
      if (country.length) {
        return country.map(post => {
          return (
            <div className="post" key={this.props.catID + post.id}>
              <Link to={this.extractPath(post.link)} className="post-thumb">
                <img
                 src={post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl']}
                  alt={post.title.rendered}
                />
              </Link>

              <div className="post-denote">
                <h4 className="post-title text-center" >
                  <Link to={this.extractPath(post.link)}>
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    ></span>
                  </Link>
                </h4>
              </div>
            </div>
          );
        });
      }
    }
  }
  renderPosts(country) {
    if (country) {
      if (country.length) {
        return country.map(post => {
          return (
            <li key={this.props.catID + post.id}>
              <Link to={this.extractPath(post.link)} className="post-thumb">
                <img
                  src={post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl']}
                  alt={post.title.rendered}
                />
              </Link>

              <div className="post-denote">
                <h4 className="post-title">
                  <Link to={this.extractPath(post.link)}>
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    ></span>
                  </Link>
                </h4>
              </div>
            </li>
          );
        });
      }
    }
  }

  render() {
    return (
        <div className="category-post">
          <Link to={"/category/"+this.props.cat_slug}><h3 className="category-heading">
            <span>{this.props.cat_title}</span>
          </h3></Link>

          {this.state.loading?<LoaderList />:this.props.homeCat[this.props.catID]
            ? this.props.homeCat[this.props.catID].length > 0
              ? this.renderPostsParent(
                  this.props.homeCat[this.props.catID].slice(0, 1)
                )
              : ""
            : ""}

          <ul className="sidebar-post-lists category-post-lists-style-2 home-cat-thumb-list">
            {this.state.loading?<LoaderList />:this.props.homeCat[this.props.catID]
              ? this.props.homeCat[this.props.catID].length > 0
                ? this.renderPosts(
                    this.props.homeCat[this.props.catID].slice(1)
                  )
                : ""
              : ""}
          </ul>
        </div>
      
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneThumbOthersSmall);

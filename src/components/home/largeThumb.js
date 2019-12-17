import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class LargeThumb extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}

  componentDidMount() {
    this.props.fetchPostsHomeCat(4, this.props.catID).then( () => this.setState({ loading: false}));
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(country) {
    if (country) {
      if (country.length) {
        return country.map(post => {
          let photolink=post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl'] ;
          return (
            <div key={this.props.catID + post.id} className="col-sm-3" style={{padding: "10px",
              boxShadow: "grey 0px 0px 5px 0px"
          }
          }>
              <div className="post post-teaser post-teaser-feat">
                <Link to={this.extractPath(post.link)} className="post-thumb">
                  <div
                    className="post-thumb-image"
                    style={{
                     
                      backgroundImage:
                        "url('" + photolink+ "')"
                    }}
                  ></div>
                </Link>

                <div className="post-denote">
                  <h4 className="post-title">
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
        <Link to={"/category/"+this.props.cat_slug}><h3 className="category-heading">
            <span>{this.props.cat_title}</span>
          </h3>
          </Link>
        </div>

        <div className="row">
          {this.state.loading?<LoaderList />:this.renderPosts(this.props.homeCat[this.props.catID])}
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

export default connect(mapStateToProps, mapDispatchToProps)(LargeThumb);

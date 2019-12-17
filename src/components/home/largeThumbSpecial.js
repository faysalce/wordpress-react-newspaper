import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeSpecalNews, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class LargeThumbSpecial extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}

  componentDidMount() {
    this.props.fetchPostsHomeSpecalNews().then( () => this.setState({ loading: false}));
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
            <div key={post.id} className="col-sm-3" style={{padding: "10px",
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
          <h3 className="category-heading">
            <span>{this.props.cat_title}</span>
          </h3>
        </div>

        <div className="row">
          {this.state.loading?<LoaderList />:this.renderPosts(this.props.specialNews)}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ specialNews }) {
  return { specialNews };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsHomeSpecalNews, dispatch }),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LargeThumbSpecial);

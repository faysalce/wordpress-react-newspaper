import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";

import Article from "./main/article";
import Empty from "./main/empty";
import PageNav from "../containers/parts/page-nav";
import CatLoader from "./catLoader";

class Main extends Component {

  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  isSingle() {
    return 1 === this.props.posts.length;
  }

  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(posts) {
    if (posts) {
      if (posts.length) {
        return posts.map(post => {
          let photolink=post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl'] ;

          return (
            <div
              key={post.id}
              className="col-sm-3 col-xs-12"
              style={{
                marginBottom: "10px",
                boxShadow: "grey 0px 1px 5px 0px",
                padding: "10px"
              }}
            >
              <div className="post post-teaser post-teaser-feat">
                <Link
                  to={this.extractPath(post.link)}
                  className="post-thumb category"
                >
                  <div
                    className="post-thumb-image"
                    style={{
                      backgroundImage:
                        "url('" + photolink + "')"
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

  getClasses() {
    return this.isSingle() ? "" : "card-columns";
  }

  render() {
    return (
      <main className="main-content">
        <div className="content" style={{ paddingTop: "0px" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <h3
                  className="category-page-head"
                  style={{
                    textAlign: "center",
                    padding: "15px",
                    boxShadow: "grey 0px 0px 3px 0px",
                    marginBottom: "32px"
                  }}
                >
                  <span>
                    {this.props.cat
                      ? this.props.cat.length > 0
                        ? this.props.cat[0].name
                        : ""
                      : ""}
                  </span>
                </h3>
              </div>

              <div className="row">
                <div className="postwrp">
                  {this.props.posts.length > 0 ? (
                    this.renderPosts(this.props.posts)
                  ) : (
                    <CatLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
          <PageNav shouldRender={0 < this.props.posts.length} />
        </div>
      </main>
    );
  }
}

function mapStateToProps({ posts, cat }) {
  return { posts, cat };
}

export default connect(mapStateToProps)(Main);

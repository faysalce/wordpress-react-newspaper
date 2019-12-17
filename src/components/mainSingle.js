import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ArticleSingle from "./main/articleSingle";
import RelatedPost from "./relatedPost";
import PostFooter from '../containers/parts/post-footer';

class MainSingle extends Component {
  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  isSingle() {
    return true;
  }

  renderPosts(post) {
    return (
      <ArticleSingle key={post.id} post={post} isSingle={this.isSingle()} />
    );
  }

  render() {
    return (
      <main className="main-content">
        <div className="content">
          <div className="row">
            <div
              className="col-md-12"
              style={{ boxShadow: "grey 1px 1px 25px -3px" , padding:"0px"}}
            >
              {this.props.single ? (
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={1}
                >
                  {this.renderPosts(this.props.single)}
                </ReactCSSTransitionGroup>
              ) : (
                ""
              )}
              
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps({ single }) {
  return { single };
}

export default connect(mapStateToProps)(MainSingle);

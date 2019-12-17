import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";

class Headline extends Component {
 
  isSingle() {
    return 1 === this.props.headline.length;
  }
  extractPath(link) {
    const url = document.createElement("a");
    url.href = link;

    return link.replace(`${url.protocol}//${url.host}`, "");
  }

  renderPosts(headline) {
    if (headline.length) {
      return headline.map(post => {
        return (
            <span>
          <Link to={this.extractPath(post.link)}>
            <span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></span>  
          </Link> ||  </span>
        );
      });
    }
  }

  getClasses() {
    return this.isSingle() ? "" : "card-columns";
  }

  render() {
    return (
      <div className="clearfix breaking-news">
        <div className="pull-left">
          <span className="title">শিরোনাম: </span>
        </div>

        <div className="news-scroller">
          <p className="news-scroller-lists marquee">
            {this.renderPosts(this.props.headline)}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ headline }) {
  return { headline };
}

export default connect(mapStateToProps)(Headline);

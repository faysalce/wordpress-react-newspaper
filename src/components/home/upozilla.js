import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class Upozilla extends Component {
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
  strip(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    let string = doc.body.textContent;
    if (string.length > 25) {
      string = string.substring(0, 24) + "...";
    }
    return string || "";
  }
  renderPosts(country) {
    if (country) {
      if (country.length) {
        return country.map(post => {
          return (
            <div className="post post-full" key={this.props.catID + post.id}>
              <div className="row flex-vcenter">
                <div className="col-sm-5">
                  <Link to={this.extractPath(post.link)} className="post-thumb">
                    <img
                      src={post.featured_image_src.homepage_excl}
                      alt={post.title.rendered}
                    />
                  </Link>
                </div>

                <div className="col-sm-7">
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
{/* 
                    <div className="note">
                      <p>{this.strip(post.excerpt.rendered)}</p>
                    </div> */}
                  </div>
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
        <h3 className="category-heading">
          <span>{this.props.cat_title}</span>
        </h3>

        {this.state.loading?<LoaderList />:this.renderPosts(this.props.homeCat[this.props.catID])}
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

export default connect(mapStateToProps, mapDispatchToProps)(Upozilla);

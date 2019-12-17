import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props
      .fetchPostsHomeCat(12, this.props.catID)
      .then(() => this.setState({ loading: false }));
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
          return (
            <div
              key={this.props.catID + post.id}
              className="col-sm-4 col-xs-6 col-md-2 padding-5 country"
            >
              <div className="post post-featured">
                <Link to={this.extractPath(post.link)} className="post-thumb">
                  <img
                    src={post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl']}
                    alt={post.title.rendered}
                  />
                </Link>

                <div className="post-denote">
                  <h4 className="post-title country-title">
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
        <div className="col-sm-12">
          <Link to="/category/satkhira-sodor"><h3 className="category-heading">
            <span>দৈনিক সাতক্ষীরা</span>
          </h3></Link>
        </div>
        {this.state.loading ? (
          <LoaderList />
        ) : this.props.homeCat[this.props.catID] ? (
          this.props.homeCat[this.props.catID].length > 0 ? (
            <Equalizer  byRow={true}>
              {this.renderPosts(this.props.homeCat[this.props.catID])}
            </Equalizer>
          ) : (
            ""
          )
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Country);

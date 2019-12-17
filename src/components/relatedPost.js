import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsRelated, ROUTER } from "../actions";
import LoaderList from "../components/home/loaderList";


class RelatedPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
    };
   
}
  componentDidMount() {
    this.props.fetchPostsRelated(6, this.props.post_id).then( () => this.setState({ loading: false}));
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
          let photolink=post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl'] ;

          return (
            <div
              key={this.props.catID + post.id}
              className="col-xs-12 col-sm-6 col-md-4 padding-5"
            >
              <div className="post post-teaser post-teaser-feat">
                <Link to={this.extractPath(post.link)} className="post-thumb">
                  <div
                    className="post-thumb-image"
                    style={{
                      backgroundImage:
                        "url('" + photolink + "')"
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
          {this.state.loading?<LoaderList />:this.renderPosts(this.props.related)}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ related }) {
  return { related };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({ fetchPostsRelated, dispatch }),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedPost);

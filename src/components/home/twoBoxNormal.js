import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Equalizer from "react-equalizer";

import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";

class TwoBoxNormal extends Component {
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

  renderPosts(country) {
    console.log("this is country");
    console.log(country);
    //return false;
    if (country) {
      if (country.length) {
        return country.map(post => {
          return (
            <div  key={this.props.catID+post.id} className="col-sm-6 col-xs-6 col-md-6 padding-5 country">
            <div className="post post-featured">
            <Link to={this.extractPath(post.link)} className="post-thumb">
                <img   src={post.featured_image_src.homepage_excl?post.featured_image_src.homepage_excl:post.featured_image_src['homepage-excl']} alt={post.title.rendered} />
                </Link>

              <div className="post-denote">
                <h4 className="post-title country-title">
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
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-12 ">
          <Link to={"/category/"+this.props.cat_slug}> <h3 className="category-heading">
              <span>{this.props.cat_title}</span>
            </h3></Link>
          </div>
        </div>
        <div className="row">
          {this.state.loading?<LoaderList />:
         <Equalizer  byRow={true}> {this.renderPosts(this.props.homeCat[this.props.catID])}</Equalizer> 
          
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(TwoBoxNormal);

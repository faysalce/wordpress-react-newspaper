import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect, dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsHomeCat, ROUTER } from "../../actions";
import LoaderList from "./loaderList";
class CatThumPhotoList extends Component {
  
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
                <h4 className="post-title" style={{fontSize:"14px",textAlign:"left"}}>
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
      <Fragment>
       <Link to={"/category/"+this.props.cat_slug}> <h3 className="category-heading">
          <span>{this.props.cat_title}</span>
        </h3>
        </Link>

        <ul className="sidebar-post-lists home-cat-thumb-list">

     
          {this.state.loading?<LoaderList />:this.renderPosts(this.props.homeCat[this.props.catID])}
       
        </ul>

        

        
      </Fragment>
    );
  }
}

function mapStateToProps({ homeCat }) {
  return { homeCat };
}

const mapDispatchToState = (dispatch, ownProps) => {
  return {
      fetchPostsHomeCat: (user, password) => dispatch(fetchPostsHomeCat(user, password)),
     
  };
};

export default connect(mapStateToProps, mapDispatchToState)(CatThumPhotoList);

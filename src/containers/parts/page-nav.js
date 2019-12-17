import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PageNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: parseInt(this.props.routerMatch.params.pageNum) || 1
    };
  }
  componentDidMount() {
    this.setState({
      page: parseInt(this.props.routerMatch.params.pageNum) || 1
    });
  }
  getPrevPage() {
    const pageNum = parseInt(this.props.routerMatch.params.pageNum) || 1;
    return pageNum > 2
      ? `${this.getSlug()}/page/${pageNum - 1}/`
      : `${this.getSlug()}/`;
  }

  getSlug() {
    if (
      ("undefined" !== typeof this.props.routerMatch.params.slug ||
        "undefined" !== typeof this.props.routerMatch.params.term) &&
      "undefined" !== typeof this.props.routerMatch.url
    ) {
      let tax = "category";
      let urlParts = this.props.routerMatch.url.split("/");
      if (urlParts.length) {
        urlParts = urlParts.filter(part => {
          return "" !== part && this.props.routerMatch.params.slug !== part;
        });
        if (urlParts.length) {
          tax = urlParts[0];
        }
      }
      let slug =
        this.props.routerMatch.params.slug ||
        this.props.routerMatch.params.term;
      return `/${tax}/${slug}`;
    } else {
      return "";
    }
  }

  getNextPage() {
    const pageNum = parseInt(this.props.routerMatch.params.pageNum) || 1;
    //let totalpage=parseInt(this.props.pageinfo)/10;

    return `${this.getSlug()}/page/${pageNum + 1}/`;
  }

  getPages = () => {
    let totalpage = parseInt(this.props.pageinfo.total_page);
    var i;
    let table = [];

    for (i = 1; i <= totalpage; i++) {
      table.push(
        <div className="nav-item" style={{display:"inline", margin:"2px"}}>
          <Link 
            to={i > 1 ? `${this.getSlug()}/page/${i}/` : `${this.getSlug()}/`}
           
            className= {this.props.routerMatch.params.pageNum?this.props.routerMatch.params.pageNum==i?"nav-link btn btn-primary active":"nav-link btn btn-primary":1==i?"nav-link btn btn-primary active":"nav-link btn btn-primary"}
            style={{ marginBottom:"5px",backgroundColor:"lightgray",borderColor:"black",color:"black"}}
          >
            {" "}
            {i}{" "}
          </Link>
        </div>
      );
    }
    return table;
  };

  // getPages() {
  //     let totalpage=parseInt(this.props.pageinfo.total_page);
  //     var i;
  //     for (i = 1; i <= totalpage; i++) {
  //        // return (i > 1) ? `${this.getSlug()}/page/${i}/` :  `${this.getSlug()}/`;

  //         return (<div className="nav-item">

  //                         <Link to={(i > 1) ? `${this.getSlug()}/page/${i}/` :  `${this.getSlug()}/`} className="nav-link btn btn-primary"> {i} </Link>
  //                 </div>
  //         )
  //     }

  //    // return `${this.getSlug()}/page/${pageNum + 1}/`;
  // }

  render() {
    if (this.props.shouldRender) {
      return (
        <div
          className="nav justify-content-center text-center"
          style={{
            
            margin: "15px 0px"
          }}
        >
          <div className="nav-item"  style={{display:"inline",margin:"2px"}}>
            {1 < this.props.routerMatch.params.pageNum ? (
              <Link
              style={{ marginBottom:"5px",backgroundColor:"lightgray",borderColor:"black",color:"black"}}
                to={this.getPrevPage()}
                className="nav-link btn btn-primary"
              >
                {" "}
                &lt;&lt; পূর্ববর্তী পাতা{" "}
              </Link>
            ) : (
              ""
            )}
          </div>
          &nbsp;{this.getPages()}
          {this.props.pageinfo.total_page >1 && this.props.pageinfo.total_page !==
          this.props.routerMatch.params.pageNum ? (
            <div className="nav-item"  style={{display:"inline",margin:"5px"}}>
              <Link
            style={{ marginBottom:"5px",backgroundColor:"lightgray",borderColor:"black",color:"black"}}
                to={this.getNextPage()}
                className="nav-link btn btn-primary"
              >
                পরবর্তী পাতা &gt;&gt;{" "}
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return <span />;
    }
  }
}

function mapStateToProps({ routerMatch, pageinfo }) {
  return { routerMatch, pageinfo };
}

export default connect(mapStateToProps)(PageNav);

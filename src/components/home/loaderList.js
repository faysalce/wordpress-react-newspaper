import React, { Component } from "react";

class LoaderList extends Component {
 
  render() {
    return (
        <div className="ph-item">
        <div className="ph-col-12">
            <div className="ph-picture"></div>
            <div className="ph-row">
                <div className="ph-col-6 big"></div>
                <div className="ph-col-4 empty big"></div>
                <div className="ph-col-2 big"></div>
                <div className="ph-col-4"></div>
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-12"></div>
            </div>
        </div>
    </div>
    
    );
  }
}

export default LoaderList;

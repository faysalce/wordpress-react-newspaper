import React, { Component } from "react";

import Menu from "../containers/parts/menu";

export default class Footer extends Component {
  getYear() {
    var date = new Date();
    return date.getFullYear();
  }

  render() {
    return (
      <footer className="footer" style={{boxShadow:"grey 0px 0px 3px 0px"}} >
        <div className="row">
          <div className="col-sm-4">
            <div className="footer-brand">
              <img
                className="img-responsive"
                src={RT_API.template_directory_uri + "/images/logo.png"}
                alt="..."
              />
            </div>
          </div>

          <div className="col-sm-8">
            <div className="editor-info">
              <h3 style={{margin: 0, padding: 0,}}>
                {" "}
                সম্পাদক :{" "}
                <a href="https://www.facebook.com/azadsat" target="_blank">
                  লায়লা পারভীন সেঁজুতি
                </a>
              </h3>
              ডিজাইন ও ডেভলপ :
              <a href="https://facebook.com/faysalsatkhira" target="_blank">
                {" "}
                শেখ মোস্তাফিজুর রহমান ফয়সাল
              </a>
              <br />
              টেলিফোন : ০৪৭১-৬৪৫৬৭ (অফিস) , মোবাইল ০১৭৪১-০১২৩২৬
              <br />
              ই-মেইল : patradootsatkhira@gmail.com
            </div>
          </div>

          <div className="col-sm-12">
            <div className="footer-copyinfo">
              &copy; {this.getYear()} Daily Patradoot
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

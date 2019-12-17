import React from "react";
import Featured from "./featured";
import Special from "./special";
import Country from "./country";
import Videos from "./videos";
import CatThumPhotoList from "./catThumPhotoList";
import Upozilla from "./upozilla";
import OneThumbOthersSmall from "./oneThumbOthersSmall";
import LargeThumb from "./largeThumb";
import LargeThumbSpecial from "./largeThumbSpecial";

import TwoBoxFeatured from "./twoBoxFeatured";
import TwoBoxNormal from "./twoBoxNormal";
function HomeBody() {
  return (
    <main className="main-content">
      <div className="content">
        <div className="row padding-bottom-25">
          <div className="col-sm-8 col-md-9">
            <div className="row">
              <Featured catID="" />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="updated-posts">
              <h3 className="updated-posts-heading">
                <span>সর্বশেষ ১০০ সংবাদ </span>
              </h3>

              <div
                className="updated-post update-post-home"
                style={{ overflow: "scroll" }}
              >
                <Special />
              </div>
            </div>
          </div>
        </div>
        <div className="row padding-bottom-25">
          <div className="col-sm-12 col-md-12">
            <LargeThumbSpecial catID="7" pageNum="4" cat_title="বিশেষ সংবাদ" />
          </div>
        </div>

        <div
          className="row padding-bottom-25"
          style={{ boxShadow: "0px 12px 14px -2px lightgrey" }}
        >
          <div className="col-sm-12 col-md-12">
            <Country catID="28" pageNum="12" />
          </div>
        </div>

        <div className="row padding-bottom-25" style={{ marginTop: "25px" }}>
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <CatThumPhotoList
                  catID="39"
                  cat_slug="nationsl-news"
                  cat_title="সারাদেশের খবর"
                  pageNum="7"
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <CatThumPhotoList
                  catID="40"
                  cat_slug="international-news"
                  cat_title="	আন্তর্জাতিক খবর"
                  pageNum="7"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <Videos catID="1358" cat_slug="videos" />
          </div>
        </div>
        <div className="row padding-bottom-25">
          <div className="col-sm-12 col-md-12">
            <LargeThumb
              catID="36"
              cat_slug="sports"
              pageNum="4"
              cat_title="খেলার খবর"
            />
          </div>
        </div>

        <div
          className="row padding-bottom-25"
          style={{ boxShadow: "0px 12px 14px -2px lightgrey" }}
        >
          <div className="col-sm-12 col-md-5">
            <TwoBoxNormal
              catID="34"
              cat_title="কলারোয়া"
              cat_slug="kolaroa"
              pageNum="4"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <CatThumPhotoList
              cat_title="শ্যামনগর"
              catID="32"
              cat_slug="samnogor"
              pageNum="6"
            />
          </div>
          <div className="col-sm-12 col-md-3">
            <OneThumbOthersSmall
              catID="1340"
              cat_title="সুন্দরবন"
              cat_slug="sundarban"
              pageNum="4"
            />
          </div>
        </div>

        <div className="row" style={{marginTop:"25px"}}>
          <div className="col-sm-12 col-md-3">
            <OneThumbOthersSmall catID="29"  cat_slug="debhata" cat_title="দেবহাটা" pageNum="5" />
          </div>
          <div className="col-sm-12 col-md-4">
            <CatThumPhotoList
              cat_title="কালীগঞ্জের"
              catID="30"
              cat_slug="kaliganz"
              pageNum="6"
            />
          </div>
          <div className="col-sm-12 col-md-5">
            <TwoBoxFeatured catID="1357" cat_slug="entertainment" cat_title="বিনোদন" pageNum="6" />
          </div>
        </div>

        <div
          className="row padding-bottom-25"
          style={{ boxShadow: "0px 12px 14px -2px lightgrey" }}
        >
          <div className="col-sm-12 col-md-5">
            <TwoBoxNormal
              catID="31"
              cat_title="আশাশুনি"
              cat_slug="asasuni"
              pageNum="4"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <CatThumPhotoList
              cat_title="তালা"
              catID="33"
              cat_slug="tala"
              pageNum="6"
            />
          </div>
          <div className="col-sm-12 col-md-3">
            <OneThumbOthersSmall
              catID="48"
              cat_title="শিল্প সাহিত্য ও সংস্কৃতি"
              cat_slug="cultural"
              pageNum="4"
            />
          </div>
        </div>
        <div className="row padding-bottom-25">
          <div className="col-sm-12 col-md-12">
            <LargeThumb
              catID="1370"
              cat_slug="travel"
              pageNum="4"
              cat_title="ভ্রমন"
            />
          </div>
        </div>




      </div>
    </main>
  );
}

export default HomeBody;

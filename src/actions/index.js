import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";
export const CATCH_ERROR = "CATCH_ERROR";
export const PAGE_INFO = "PAGE_INFO";

export const FETCH_HOME_CAT_POST = "FETCH_HOME_CAT_POST";

export const FETCH_POSTS_HEADLINE = "FETCH_POSTS_HEADLINE";
export const FETCH_POSTS_HOME_FEATURED = "FETCH_POSTS_HOME_FEATURED";
export const FETCH_POSTS_HOME_SPECIAL = "FETCH_POSTS_HOME_SPECIAL";
export const FETCH_POSTS_HOME_SPECIAL_NEWS = "FETCH_POSTS_HOME_SPECIAL_NEWS";

export const FETCH_POST = "FETCH_POST";
export const FETCH_RELATED_POST = "FETCH_RELATED_POST";

export const SEARCH_POSTS = "SEARCH_POSTS";
export const CATEGORY_POSTS = "CATEGORY_POSTS";
export const FETCH_CAT_INFO = "FETCH_CAT_INFO";
export const FETCH_TAG_INFO = "FETCH_TAG_INFO";
export const FETCH_MENU = "FETCH_MENU";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const ROUTER = "ROUTER";

const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;
const HOME_CAT_POST_ENDPOINT = `${RT_API.root}react-theme/v1/home-cat-post/`;
const RELATED_POST_ENDPOINT = `${RT_API.root}react-theme/v1/related-post/`;


const HOME_ALL_CAT_POST_ENDPOINT = `${RT_API.root}react-theme/v1/all-category-post/`;

export function fetchPosts(pageNum = 1, post_type = "posts") {
  return function(dispatch) {
    return axios
      .get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}`)
      .then(function(response) {
        dispatch({
          type: FETCH_POSTS,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
  };
}

export function fetchPostsHead(pageNum = 1, post_type = "posts") {
  return function(dispatch) {
    return axios
      .get(`${WP_API_ENDPOINT}/${post_type}?per_page=10&page=${pageNum}`)
      .then(function(response) {
        dispatch({
          type: FETCH_POSTS_HEADLINE,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
  };
}

export function fetchPostsHomeFeatured(pageNum = 1, post_type = "posts") {
  return function(dispatch) {
    return axios
      .get(
        `${WP_API_ENDPOINT}/posts?per_page=6&meta_key=main_slider&meta_value=1&page=1`
      )
      .then(function(response) {
        dispatch({
          type: FETCH_POSTS_HOME_FEATURED,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
  };
}

export function fetchPostsHomeSpecalNews(pageNum = 1, post_type = "posts") {
  return function(dispatch) {
    return axios
      .get(`${WP_API_ENDPOINT}/posts?per_page=4&meta_key=exclusive_news&meta_value=1&page=1`)
      .then(function(response) {
        dispatch({
          type: FETCH_POSTS_HOME_SPECIAL_NEWS,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data.response.data })
      });
  };
}

export function fetchPostsHomeSpecial(pageNum = 1, post_type = "posts") {
  return function(dispatch) {
    return axios
      .get(`${WP_API_ENDPOINT}/posts?per_page=50`)
      .then(function(response) {
        dispatch({
          type: FETCH_POSTS_HOME_SPECIAL,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data.response.data })
      });
  };
}


export function fetchPostsHomeCat(pageNum = 1, taxId = 0) {
  return function(dispatch) {
    const url = `${HOME_CAT_POST_ENDPOINT}/?cat=${taxId}&number=${pageNum}`;

    return axios.get(url).then(function(response) {
      dispatch({
        type: FETCH_HOME_CAT_POST,
        payload: response.data
      });
    }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
  };
}
export function fetchPostsRelated(pageNum = 1, post_id = 0) {
  return function(dispatch) {
    const url = `${RELATED_POST_ENDPOINT}/?post_id=${post_id}&number=${pageNum}`;

    return axios.get(url).then(function(response) {
      dispatch({
        type: FETCH_RELATED_POST,
        payload: response.data
      });
    }).catch(function (error) {
      dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
    });
  };
}



export function fetchPostsFromTax(
  tax = "categories",
  taxId = 0,
  pageNum = 1,
  post_type = "posts"
) {
  return function(dispatch) {
    const url = `${WP_API_ENDPOINT}/${post_type}?_embed&${tax}=${taxId}&page=${pageNum}&per_page=20`;

    return axios.get(url).then(function(response) {
      console.log(response);
      dispatch({
        type: CATEGORY_POSTS,
        payload: response.data
      });
      dispatch({
        type: PAGE_INFO,
        payload: {total_post: response.headers['x-wp-total'], total_page:response.headers['x-wp-totalpages']}
      });
    }).catch(function (error) {
      dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
    });
  };
}



export function getTaxIdFromSlug(tax, slug) {
    return function(dispatch) {  
      return axios.get(`${WP_API_ENDPOINT}/${tax}?slug=${slug}`).then(function(response) {
        switch (tax) {
            case "tags":
              dispatch({
                type: FETCH_TAG_INFO,
                payload: response.data
              });
              break;
            case "categories":
              dispatch({
                type: FETCH_CAT_INFO,
                payload: response.data
              });
              break;
          }
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
    };
  }


  export function fetchPost(prettyPermalink) {
    return function(dispatch) {
  
      return axios
      .get(`${PRETTYPERMALINK_ENDPOINT}${prettyPermalink}`).then(function(response) {
        dispatch({
            type: FETCH_POST,
            payload: response.data
          });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
    };
  }



export function fetchTaxInfo(tax, tagIds) {
  return function(dispatch) {
    axios.get(`${WP_API_ENDPOINT}/${tax}/?include=${tagIds}`).then(response => {
      dispatch({
        type: FETCH_TAG_INFO,
        payload: response.data
      });
    }).catch(function (error) {
      dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
    });
  };
}



export function fetchMenu(menu) {
  return function(dispatch) {  
    return  axios.get(`${MENU_ENDPOINT}${menu}`).then(function(response) {
      dispatch({
        type: FETCH_MENU,
        payload: { items: response.data, name: menu }
      });
    }).catch(function (error) {
      dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
    });
  };
}


export function searchSite(term, post_type = "posts") {
  return function(dispatch) {
    axios
      .get(`${WP_API_ENDPOINT}/${post_type}?_embed&search=${term}`)
      .then(response => {
        dispatch({
          type: SEARCH_POSTS,
          payload: response.data
        });
      }).catch(function (error) {
        dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
      });
  };
}

export function fetchComments(postId) {
  return function(dispatch) {
    axios
      .get(
        `${WP_API_ENDPOINT}/comments?post=${postId}&orderby=parent&per_page=100`
      )
      .then(response => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: response.data
        });
      });
  };
}





// export function fetchHomeCatPost(prettyPermalink) {
//     return function(dispatch) {
  
//       return axios
//       .get(
//         `${HOME_ALL_CAT_POST_ENDPOINT}?number=${postId}&orderby=parent&per_page=100`
//       ).then(function(response) {
//         dispatch({
//             type: FETCH_COMMENTS,
//             payload: response.data
//           });
//       }).catch(function (error) {
//         dispatch({ type: 'CATCH_ERROR', payload: error.response.data })
//       });
//     };
//   }

export function createComment(
  params = {
    post: 0,
    parent: 0,
    author_name: "",
    author_email: "",
    content: ""
  }
) {
  return function(dispatch) {
    axios({
      method: "post",
      url: `${WP_API_ENDPOINT}/comments`,
      headers: { "X-WP-Nonce": RT_API.nonce },
      data: params
    }).then(response => {
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data
      });
    });
  };
}

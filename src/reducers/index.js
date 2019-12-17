import {combineReducers} from 'redux';

import posts from './posts-reducer';
import headline from './headline-reducer';
import featured from './home-featured';
import special from './home-special';
import specialNews from './home-special-news';

import homeCat from './home-cat';
import single from './single-post';
import related from './related-posts-reducer';
import menu from './menu-reducer';
import tags from './tag-reducer';
import cat from './cat-reducer';
import comments from './comments-reducer';
import routerMatch from './routerMatch-reducer';
import error from './error';
import pageinfo from './page-info';
export default combineReducers({
    posts,
    headline,
    featured,
    homeCat,
    specialNews,
    special,
    single,
    pageinfo,
    related,
    menu,
    tags,
    cat,
    comments,
    routerMatch,
    error
});

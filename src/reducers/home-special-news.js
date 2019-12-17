import {FETCH_POSTS_HOME_SPECIAL_NEWS} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_HOME_SPECIAL_NEWS:
        
            return action.payload;
    }
    return state;
}

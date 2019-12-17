import {FETCH_POSTS_HOME_FEATURED} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_HOME_FEATURED:
        
            return action.payload;
    }
    return state;
}

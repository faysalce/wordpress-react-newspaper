import {FETCH_POSTS_HOME_SPECIAL} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_HOME_SPECIAL:
        
            return action.payload;
    }
    return state;
}

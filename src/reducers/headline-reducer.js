import {FETCH_POSTS_HEADLINE} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_HEADLINE:
        
            return action.payload;
    }
    return state;
}

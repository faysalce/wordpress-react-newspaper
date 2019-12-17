import {PAGE_INFO} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        
        case PAGE_INFO:
            return action.payload;
    }
    return state;
}

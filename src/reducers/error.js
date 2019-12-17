import {CATCH_ERROR} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        
        case CATCH_ERROR:
            return action.payload;
    }
    return state;
}

import {FETCH_RELATED_POST} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_RELATED_POST:
            return action.payload;
    }
    return state;
}

import {FETCH_HOME_CAT_POST} from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_HOME_CAT_POST:
            return Object.assign({}, state, action.payload)
    }
    return state;
}
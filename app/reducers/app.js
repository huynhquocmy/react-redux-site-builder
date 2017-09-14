import * as types from '../actions/types';

const initialState = {
    loading: false,
    alert: false
};
const app = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        case types.HIDE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });
        case types.TOGGLE_ALERT:
            return Object.assign({}, state, {
                alert: action.toggle || !state.alert
            });
        default:
            return state;
    }
};

export default app;

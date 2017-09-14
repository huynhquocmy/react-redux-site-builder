import * as types from '../actions/types';

const initialState = {
    showSettings: false,
    gradients: [],
    padding: {
        paddingTop: '30px',
        paddingBottom: '30px',
        paddingLeft: '30px',
        paddingRight: '30px'
    }
};
const settings = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SETTINGS:
            return Object.assign({}, state, {
                showSettings: !state.showSettings
            });
        case types.UPDATE_SETTINGS:
            return Object.assign({}, state, {
                gradients: action.gradients,
                padding: action.padding
            });
        default:
            return state;
    }
};

export default settings;

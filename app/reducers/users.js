import * as types from '../actions/types';

const initialState = {
    id: '',
    sections: {
        fullSections: [],
        containSections: [],
        footerSections: []
    },
    settings: {
        gradients: {
            color1: '',
            color2: ''
        },
        padding: {
            paddingTop: '30px',
            paddingBottom: '30px',
            paddingLeft: '30px',
            paddingRight: '30px'
        }
    }
};
const users = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            return Object.assign({}, state, action.user);
        case types.UPDATE_USER:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
};

export default users;

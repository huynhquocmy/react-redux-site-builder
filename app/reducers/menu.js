import * as types from '../actions/types';

const initialState = {
    mode: 'main',
    showMenu: true,
    selectedCategory: {
        items: []
    },
    categories: []
};
const menu = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL:
            return Object.assign({}, state, {
                categories: action.data
            });
        case types.SELECT_CATEGORY:
            return Object.assign({}, state, {
                selectedCategory: action.selectedCategory
            });
        case types.TOGGLE_MENU:
            return Object.assign({}, state, {
                showMenu: action.showMenu
            });
        case types.CHANGE_MODE:
            return Object.assign({}, state, {
                mode: action.mode
            });
        default:
            return state;
    }
};

export default menu;

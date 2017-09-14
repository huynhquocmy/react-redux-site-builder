import * as types from './types';

/*
	CHANGE MENU
*/
export function changeMenu(currentActive) {
    return {
        type: types.CHANGE_MENU,
        currentActive: currentActive
    };
}

/*
	SELECT MENU CATEGORY
*/
export function selectCategory(category) {
    return {
        type: types.SELECT_CATEGORY,
        selectedCategory: category
    };
}

/*
	TOGGLE MENU
*/
export function toggleMenu(showMenu) {
    return {
        type: types.TOGGLE_MENU,
        showMenu: showMenu
    };
}


/*
    CHANCE MODE
*/
export function changeMode(mode) {
    return {
        type: types.CHANGE_MODE,
        mode
    };
}

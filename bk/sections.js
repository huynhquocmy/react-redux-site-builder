import * as types from '../actions/types';
import undoable, { distinctState } from 'redux-undo';

const initialState = [];
const sections = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_SECTION:
            return [
                // ...state, action.section
                ...state.slice(0, action.index), action.section,
                ...state.slice(action.index)
            ];
        case types.REMOVE_SECTION:
            return state.filter( (item) => item.sectionId !== action.section.sectionId);
        case types.SORT_SECTION:
            // backup the current section
            const sec = Object.assign({}, state[action.oldIndex]);
            // remove current section at old position
            const stat = state.filter( (item, i) => i !== action.oldIndex);
            // add current section to new position
            return [
                ...stat.slice(0, action.newIndex), sec,
                ...stat.slice(action.newIndex)
            ];
        case types.REMOVE_ALL_SECTIONS:
            return [];
        default:
            return state;
    }
};

const undoableSections = undoable(sections, {
    filter: distinctState(),
    limit: 10
});

export default undoableSections;

import * as types from '../actions/types';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
    fullSections: [],
    containSections: [],
    footerSections: []
};

const sections = (state = initialState, action) => {
    const secs = Object.assign([], state[action.target]);
    let s;
    let nextState;

    switch (action.type) {
        case types.GET_SECTIONS:
            nextState = Object.assign({}, action.sections);
            break;
        case types.ADD_SECTION:
            s = [
                ...secs.slice(0, action.index), action.section,
                ...secs.slice(action.index)
            ];
            break;
        case types.REMOVE_SECTION:
            nextState = Object.assign({}, state, {
                fullSections: state.fullSections.filter( (item) => item.sectionId !== action.section.sectionId),
                containSections: state.containSections.filter( (item) => item.sectionId !== action.section.sectionId),
                footerSections: state.footerSections.filter( (item) => item.sectionId !== action.section.sectionId)
            });
            break;
        case types.SORT_SECTION:
            // backup the current section
            const sec = Object.assign({}, secs[action.oldIndex]);
            // remove current section at old position
            const stat = secs.filter( (item, i) => i !== action.oldIndex);
            // add current section to new position
            s = [
                ...stat.slice(0, action.newIndex), sec,
                ...stat.slice(action.newIndex)
            ];
            break;
        case types.REMOVE_ALL_SECTIONS:
            nextState = {
                fullSections: [],
                containSections: [],
                footerSections: []
            };
            break;
        default:
            return state;
    }

    if (s) {
        state[action.target] = s;
        nextState = Object.assign({}, state, {
            fullSections: state.fullSections,
            containSections: state.containSections,
            footerSections: state.footerSections
        });
    }

    return Object.assign({}, state, nextState);
};

const undoableSections = undoable(sections, {
    filter: distinctState(),
    limit: 10
});

export default undoableSections;

import * as types from './types';
import fb from '../database/firebase';
import * as constants from '../constants/constants';

/*
	Get sections
*/
export function getSections(id) {
    return dispatch => {
        return fb.ref('users').child(id)
            .once('value', snap => {
                let user = snap.val();

                if (!user) {
                    user = Object.assign({}, constants.USER);
                    user.id = id;
                    fb.ref('/users').child(id).set(user);
                }
                return dispatch({
                    type: types.GET_SECTIONS,
                    sections: user.sections || {
                        'fullSections': [],
                        'containSections': [],
                        'footerSections': []
                    }
                });
            });
    };
}

/*
	Add section
*/
export function addSection(section, index, target) {
    return {
        type: types.ADD_SECTION,
        section,
        index,
        target
    };
}

/*
	Remove section
*/
export function removeSection(section, index) {
    return {
        type: types.REMOVE_SECTION,
        section,
        index
    };
}

/*
	Sort section
*/
export function sortSection(newIndex, oldIndex, target) {
    return {
        type: types.SORT_SECTION,
        newIndex,
        oldIndex,
        target
    };
}

/*
	Remove all
*/
export function removeAllSections() {
    return {
        type: types.REMOVE_ALL_SECTIONS
    };
}

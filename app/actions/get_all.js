import * as types from './types';
import fb from '../database/firebase';

function getAllDone(data) {
    return {
        type: types.GET_ALL,
        data
    };
}

export function getAll() {
    return dispatch => {
        return fb.ref('/data').once('value', snap => {
            const data = snap.val();
            dispatch(getAllDone(data));
        });
    };
}

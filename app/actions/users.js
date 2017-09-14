import * as types from './types';
import fb from '../database/firebase';
import * as constants from '../constants/constants';
/*
    Get user by id
*/
export function getUser(id) {
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
                    type: types.GET_USER,
                    user
                });
            });
    };
}

/*
    update user by id
*/
export function updateUser(user) {
    return dispatch => {
        const updates = {};
        updates['/users/' + user.id] = user;
        fb.ref().update(updates);
        return dispatch({
            type: types.UPDATE_USER,
            user
        });
    };
}

/*
    Create User
*/
export function createUser() {
    const user = Object.assign({}, constants.USER);
    return dispatch => {
        const guestsRef = fb.ref('/users');
        guestsRef.push(user)
        .then((res) => {
            user.id = res.key;
            const updates = {};
            updates['/users/' + user.id] = user;
            fb.ref().update(updates);

            return dispatch({
                type: types.CREATED_USER,
                user: user
            });
        });
    };
}

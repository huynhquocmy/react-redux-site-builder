import * as types from './types';

export function toggleSettings(showSettings) {
    return {
        type: types.TOGGLE_SETTINGS,
        showSettings
    };
}

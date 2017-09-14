import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import menu from './menu';
import sections from './sections';
import settings from './settings';
import users from './users';
import app from './app';

const rootReducer = combineReducers({
    menu,
    users,
    sections,
    app,
    settings,
    routing
});

export default rootReducer;

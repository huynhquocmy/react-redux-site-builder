import { browserHistory } from 'react-router';

const userMiddleware = () => next => action => {
    if (action.type === 'CREATED_USER') {
        browserHistory.push({
            pathname: '/#' + action.user.id
        });
        return;
    }

    next(action);
};

export default userMiddleware;

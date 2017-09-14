import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Alert from './Alert';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.children }
                <Loading />
                <Alert />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;

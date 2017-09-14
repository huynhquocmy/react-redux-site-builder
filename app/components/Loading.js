import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/main.scss';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return {
        app: state.app
    };
};

const mapDispatchToProps = () => {
    return {};
};

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.app.loading) {
            return (
                <div className={styles.loading}>
                    <img src="/app/assets/images/rolling.svg"/>
                    <label>Loading</label>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

Popup.propTypes = {
    app: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popup);

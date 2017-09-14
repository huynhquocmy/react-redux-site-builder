import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/alert.scss';
import PropTypes from 'prop-types';

import { toggleAlert } from '../actions/app';
const mapStateToProps = (state) => {
    return {
        app: state.app
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleAlert: () => dispatch(toggleAlert())
    };
};

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: 'This feature is only available for paid version.<br/>Please contact us for more detail.'
        };
    }

    render() {
        if (this.props.app.alert) {
            return (
                <div className={styles.alert}>
                    <div className={styles.alertMask}></div>
                    <div className={styles.alertContainer}>
                        <div className={styles.alertContent}>
                            <p dangerouslySetInnerHTML={{ __html: this.state.content }}></p>
                            <div className={styles.alertBtns}>
                                <button className="btn btn-popup" onClick={() => this.props.onToggleAlert()}>Ok, got it.</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <div></div>;
    }
}

Alert.propTypes = {
    app: PropTypes.object,
    onToggleAlert: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);

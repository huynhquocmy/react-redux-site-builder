import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/popup.scss';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { createUser } from '../actions/users';

const mapStateToProps = (state) => {
    return {
        user: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: () => dispatch(createUser())
    };
};

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageid: ''
        };
    }

    handleChange(event) {
        const pageid = event.target.value;
        this.setState({
            pageid: pageid
        });
    }

    goTo(uid) {
        if (!uid) {
            return;
        }
        browserHistory.push({
            pathname: '/#' + uid
        });
    }

    render() {
        return (
            <div className={styles.popup}>
                <div className={styles.popupContainer}>
                    <h1>To sharing your page,<br/> you can start as a new alias or load an existing.</h1>
                    <div className={styles.popupContent}>
                        <div className={styles.popupTop}>
                            <label>Alias</label>
                            <input placeholder="Enter an alias here" name="pageid" onChange={($event) => this.handleChange($event)} value={this.state.pageid} type="text"/>
                            <button className="btn btnBlue" onClick={() => this.goTo(this.state.pageid)}>Load</button>
                        </div>
                        <div className={styles.popupLeft}>
                            <button className={styles.bigBtn} onClick={() => this.props.onCreateUser()}>Start as new</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Popup.propTypes = {
    onCreateUser: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popup);

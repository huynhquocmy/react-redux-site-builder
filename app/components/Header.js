import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/header.scss';
import { browserHistory } from 'react-router';
import { toggleAlert } from '../actions/app' ;
import $ from 'jquery';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleAlert: () => dispatch(toggleAlert())
    };
};

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTemplates() {
        browserHistory.push({
            pathname: '/templates'
        });
    }

    backHome() {
        browserHistory.push({
            pathname: '/'
        });
    }

    mouseEvent(type) {
        if (type === 'enter') {
            $('.headerUserActions').addClass('show');
        } else {
            $('.headerUserActions').removeClass('show');
        }
    }

    logout() {
        browserHistory.push({
            pathname: '/login'
        });
    }

    renderButton() {
        const path = window.location.pathname;
        if (path !== '/templates') {
            return (
                <button className={styles.btnNew} onClick={() => this.selectTemplates()}>Create a new project</button>
            );
        }

        return (
            <button className={styles.btnNew} onClick={() => this.backHome()}>Back to Dashboard</button>
        );
    }

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.headerLogo} onClick={() => this.backHome()}>
                    <img src="/app/assets/images/logo.png" />
                </div>
                <div className={styles.headerRight}>
                    {this.renderButton()}
                </div>
                <div className={styles.headerUser} onMouseEnter={() => this.mouseEvent('enter')}>
                    <div className={styles.headerUserName}>Ad</div>
                    <div className={styles.headerUserActions} onMouseLeave={() => this.mouseEvent('leave')}>
                        <div className={styles.headerUserItem} onClick={this.props.onToggleAlert}>Manage Editors</div>
                        <div className={styles.headerUserItem} onClick={this.logout}>Logout</div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object,
    onToggleAlert: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

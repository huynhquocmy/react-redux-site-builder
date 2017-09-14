import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../../actions/get_all';
import styles from '../../styles/dashboard.scss';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Builder from './Builder';
import Header from '../../components/Header';
import { showLoading, hideLoading } from '../../actions/app';
import { browserHistory } from 'react-router';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(getAll()),
        onShowLoading: () => dispatch(showLoading()),
        onHideLoading: () => dispatch(hideLoading())
    };
};

class Project extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            user: ''
        };

        const user = this.getLogin();
        if (!user) {
            browserHistory.push({
                pathname: '/login'
            });
            return;
        }

        this.state.user = user;
        this.props.onShowLoading();
        setTimeout(() => {
            this.props.onHideLoading();
        }, 1500);
    }

    componentDidMount() {
        this.props.onGetAll();
        // window.onbeforeunload = () => { return 'You work will be lost.'; };
    }

    getLogin() {
        const user = localStorage.getItem('user');
        const _user = JSON.parse(user);
        return _user;
    }

    renderContent() {
        if (!this.state.user) {
            return '';
        }

        const activeClass = this.props.menu.showMenu ? 'open' : 'close';
        return (
            <div>
                <Header />
                <div className={[styles.dashboard, activeClass].join(' ')}>
                    <Sidebar className={activeClass} />
                    <Builder params={{uid: this.props.params.projectid}} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

Project.propTypes = {
    menu: PropTypes.object,
    params: PropTypes.object,
    onHideLoading: PropTypes.func,
    onShowLoading: PropTypes.func,
    onGetAll: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);

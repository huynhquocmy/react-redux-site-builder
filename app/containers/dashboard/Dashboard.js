import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../../actions/get_all';
import { showLoading, hideLoading } from '../../actions/app';
// import styles from '../styles/dashboard.scss';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import DashboardContent from './DashboardContent';
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

class Dashboard extends React.Component {

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
    }

    componentDidMount() {
        this.props.onGetAll();
        this.props.onShowLoading();
        setTimeout(() => {
            this.props.onHideLoading();
        }, 600);
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

        return (
            <div>
                <Header />
                <DashboardContent />
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

Dashboard.propTypes = {
    menu: PropTypes.object,
    params: PropTypes.object,
    match: PropTypes.object,
    onGetAll: PropTypes.func,
    onHideLoading: PropTypes.func,
    onShowLoading: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

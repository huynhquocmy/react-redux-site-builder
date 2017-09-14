import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../../actions/get_all';
import styles from '../../styles/dashboard.scss';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(getAll())
    };
};

class DashboardContent extends React.Component {

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
    }

    getLogin() {
        const user = localStorage.getItem('user');
        const _user = JSON.parse(user);
        return _user;
    }

    selectTemplates() {
        browserHistory.push({
            pathname: '/templates'
        });
    }

    renderContent() {
        if (!this.state.user) {
            return '';
        }

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.content}>
                    <div className={styles.noData} onClick={() => this.selectTemplates()}>
                        <div>
                            <i className="fa fa-plus"></i>
                            <h3>You haven't created any project yet. Click here to create a new project.</h3>
                        </div>
                    </div>
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

DashboardContent.propTypes = {
    menu: PropTypes.object,
    params: PropTypes.object,
    match: PropTypes.object,
    onGetAll: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContent);

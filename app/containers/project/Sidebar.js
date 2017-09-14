import React from 'react';
import { connect } from 'react-redux';
import { changeMenu, selectCategory } from '../../actions/menu';
import { browserHistory } from 'react-router';
import SidebarContent from './sidebar/SidebarContent';
import styles from '../../styles/sidebar.scss';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMenu: menu => dispatch(changeMenu(menu)),
        onSelectCategory: category => dispatch(selectCategory(category))
    };
};

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    backHome() {
        browserHistory.push({
            pathname: '/'
        });
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <div  onClick={() => this.backHome()} className={styles.sidebarHeader}>
                    <img src="/app/assets/images/logo.png"/>
                </div>
                <SidebarContent />
            </div>
        );
    }
}

Sidebar.propTypes = {
    menu: PropTypes.object,
    onChangeMenu: PropTypes.func,
    onSelectCategory: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

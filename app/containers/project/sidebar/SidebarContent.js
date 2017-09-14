import React from 'react';
import { connect } from 'react-redux';
import { changeMenu, selectCategory, changeMode } from '../../../actions/menu';
import Menu from '../../../components/Menu';
import List from '../../../components/List';
import SEOPanel from '../../../components/SEOPanel';
import CustomPanel from '../../../components/CustomPanel';
import styles from '../../../styles/sidebar.scss';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMenu: menu => dispatch(changeMenu(menu)),
        onSelectCategory: category => dispatch(selectCategory(category)),
        onChangeMode: (mode) => dispatch(changeMode(mode))
    };
};

class SidebarContent extends React.Component {
    constructor(props) {
        super(props);
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode(mode) {
        this.props.onChangeMode(mode);
    }

    renderMain() {
        return (
            <div className={styles.mainContent}>
                <div onClick={() => this.changeMode('design')} className={styles.sidebar__item}>Design Page</div>
                <div onClick={() => this.changeMode('seo')} className={styles.sidebar__item}>SEO</div>
                <div onClick={() => this.changeMode('custom')} className={styles.sidebar__item}>Custom CSS</div>
            </div>
        );
    }

    renderDesign() {
        return (
            <div className={styles.sidebarContent} onMouseLeave={() => this.props.onSelectCategory()}>
                <Menu
                    menu={this.props.menu}
                    onChangeMenu={this.props.onChangeMenu}
                />
                <List />
            </div>
        );
    }

    renderCustom() {
        return (
            <div className={styles.sidebarContent_large}>
                <div className={styles.arrowBack}>
                    <img onClick={() => this.changeMode('main')} className={styles.icon__back} src="/app/assets/images/back.png"/>
                </div>
                <CustomPanel />
            </div>
        );
    }
    render() {
        if (this.props.menu.mode === 'main') {
            return (
                <div>{this.renderMain()}</div>
            );
        }

        if (this.props.menu.mode === 'seo') {
            return (
                <div className={styles.sidebarContent_large}>
                    <div className={styles.arrowBack}>
                        <img onClick={() => this.changeMode('main')} className={styles.icon__back} src="/app/assets/images/back.png"/>
                    </div>
                    <SEOPanel />
                </div>
            );
        }

        if (this.props.menu.mode === 'custom') {
            return (
                <div>{this.renderCustom()}</div>
            );
        }
        return (
            <div>
                <div className={styles.arrowBack}>
                    <img onClick={() => this.changeMode('main')} className={styles.icon__back} src="/app/assets/images/back.png"/>
                </div>
                {this.renderDesign()}
            </div>
        );
    }
}

SidebarContent.propTypes = {
    menu: PropTypes.object,
    onChangeMenu: PropTypes.func,
    onSelectCategory: PropTypes.func,
    onChangeMode: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarContent);

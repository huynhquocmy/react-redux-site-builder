import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/list.scss';
import PropTypes from 'prop-types';
import * as constants from '../constants/constants';
import { removeSection } from '../actions/sections';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveSection: (section, index) => dispatch(removeSection(section, index))
    };
};

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li data-id={this.props.section.id} data-section={this.props.section.id}>
                <div onClick={() => this.props.onRemoveSection(this.props.section)} className={styles.removeIcon}>
                    <span>Delete</span>
                    <img className={styles.deleteBlack} src="/app/assets/images/delete-black.svg"/>
                    <img className={styles.deleteRed} src="/app/assets/images/delete-red.svg"/>
                </div>
                <div className={styles.mask}></div>
                <img className={styles.sectionImg} src={constants.imgUrl + this.props.section.image} />
            </li>
        );
    }
}

Item.propTypes = {
    menu: PropTypes.object,
    section: PropTypes.object,
    onRemoveSection: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/sidebar.scss';
import { selectCategory } from '../actions/menu';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectCategory: category => dispatch(selectCategory(category))
    };
};

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = [];

        this.props.menu.categories.forEach((p) => {
            const name = p.name;
            items.push(
                <div onMouseEnter={() => this.props.onSelectCategory(p)} className={[styles.sidebar__item].join(' ')} key={p.id}>{name}</div>
            );
        });

        return (
            <div className={styles.menu}> {items} </div>
        );
    }
}

Menu.propTypes = {
    menu: PropTypes.object,
    onSelectCategory: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

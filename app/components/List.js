import React from 'react';
import { connect } from 'react-redux';
import { changeMenu } from '../actions/menu';
import styles from '../styles/list.scss';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Item from './Item';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMenu: menu => dispatch(changeMenu(menu))
    };
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.renderSections = this.renderSections.bind(this);
    }
    componentDidMount() {
        const el = document.getElementById('items');
        Sortable.create(el, {
            group: {
                name: 'items',
                revertClone: true,
                pull: 'clone'
            },
            forceFallback: true,
            fallbackClass: 'sortable-fallback',
            // fallbackTolerance: 50,
            sort: false
        });
    }

    renderSections() {
        const me = this.props.menu.selectedCategory;
        if (me) {
            return me.items.map((s) => {
                return <Item key={s.id} section={s} />;
            });
        }

        return '';
    }
    render() {
        const activeClass = this.props.menu.selectedCategory ? 'active' : 'hide';
        return (
            <div className={[styles.list, activeClass].join(' ')}>
                <ul className={styles.sectionList} id="items">
                    {this.renderSections()}
                </ul>
            </div>
        );
    }
}

List.propTypes = {
    menu: PropTypes.object,
    onChangeMenu: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

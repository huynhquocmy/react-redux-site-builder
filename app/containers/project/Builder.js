import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
// import fileDownload from 'react-file-download';
// Actions
import { toggleMenu } from '../../actions/menu';
import { getSections, addSection, removeSection, sortSection, removeAllSections } from '../../actions/sections';
import { updateUser, getUser } from '../../actions/users' ;
import { toggleAlert } from '../../actions/app' ;
// Styles
import styles from '../../styles/builder.scss';
import mainStyles from '../../styles/main.scss';
// Components
import common from '../../services/common';
import Item from '../../components/Item';
import Settings from '../../components/Settings';
import Publish from '../../components/Publish';
// Libs
import $ from 'jquery';

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        settings: state.users.settings,
        user: state.users,
        sections: state.sections,
        fullSections: state.sections.present.fullSections,
        containSections: state.sections.present.containSections,
        footerSections: state.sections.present.footerSections,
        canUndo: state.sections.past.length > 0,
        canRedo: state.sections.future.length > 0,
        canExport: state.sections.present.fullSections.length > 0 || state.sections.present.containSections.length > 0,
        canClear: state.sections.present.fullSections.length > 0 || state.sections.present.containSections.length > 0
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleMenu: menu => dispatch(toggleMenu(menu)),
        onAddSection: (section, index, target) => dispatch(addSection(section, index, target)),
        onRemoveSection: (section, index, target) => dispatch(removeSection(section, index, target)),
        onSortSection: (newIndex, oldIndex, target) => dispatch(sortSection(newIndex, oldIndex, target)),
        onUpdateUser: (user) => dispatch(updateUser(user)),
        onRemoveAll: () => dispatch(removeAllSections()),
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo()),
        onGetUser: (id) => dispatch(getUser(id)),
        onGetSections: (id) => dispatch(getSections(id)),
        onToggleAlert: () => dispatch(toggleAlert())
    };
};

class Builder extends React.Component {
    constructor(props) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSaveAll = this.onSaveAll.bind(this);
        this.state = {
            url: window.location.href,
            copyText: 'Share',
            saveText: 'Save all',
            publishing: false
        };
    }

    componentDidMount() {
        const full = document.getElementById('builderFull');
        const contain = document.getElementById('builderContain');
        const footer = document.getElementById('builderFooter');
        Sortable.create(full, {
            group: {
                name: 'builderFull',
                put: 'items'
            },
            onAdd: this.onAdd,
            onUpdate: this.onUpdate

        });

        Sortable.create(contain, {
            group: {
                name: 'builderContain',
                put: 'items'
            },
            onAdd: this.onAdd,
            onUpdate: this.onUpdate

        });

        Sortable.create(footer, {
            group: {
                name: 'builderFooter',
                put: 'items'
            },
            onAdd: this.onAdd,
            onUpdate: this.onUpdate

        });

        const uid = this.props.params.uid;

        if (uid) {
            this.props.onGetUser(uid);
            this.props.onGetSections(uid);
        }

        document.addEventListener('keydown', this.handleKeyDown);
    }

    onSaveAll() {
        this.props.user.sections = this.props.sections.present;
        this.props.onUpdateUser(this.props.user);
        this.setState({
            saveText: 'Saved.'
        });
        setTimeout(() => {
            this.setState({saveText: 'Save all'});
        }, 2000);
    }

    onExport() {
        // fileDownload('your content here!', 'index.html');
        this.onSaveAll();
        this.props.onToggleAlert();

        // this.setState({
        //     publishing: true
        // });
    }

    renderSections(sections) {
        const me = sections;
        if (me) {
            return me.map((s) => {
                const id = common.makeid();
                return <Item key={id} section={s} />;
            });
        }

        return '';
    }

    handleKeyDown(event) {
        const charCode = String.fromCharCode(event.which).toLowerCase();

        if ((event.ctrlKey || event.metaKey) && charCode === 'y') {
            if (this.props.canRedo) {
                this.props.onRedo();
            }
        } else if ((event.ctrlKey || event.metaKey) && charCode === 'z') {
            if (this.props.canUndo) {
                this.props.onUndo();
            }
        }
    }

    getTarget(id) {
        if (id === 'builderFull') {
            return 'fullSections';
        }
        if (id === 'builderContain') {
            return 'containSections';
        }

        return 'footerSections';
    }

    onShare() {
        const url = window.location.href;
        this.setState({
            url: url
        });

        const input = document.getElementById('hiddenInput');
        input.select();
        document.execCommand('copy');
        this.props.onToggleAlert();
    }

    onUpdate(evt) {
        const listId = evt.to.getAttribute('id');
        const target = this.getTarget(listId);
        this.props.onSortSection(evt.newIndex, evt.oldIndex, target);
    }

    onAdd(evt) {
        const id = $(evt.item).attr('data-id');
        const sectionId = common.makeid();
        const listId = evt.to.getAttribute('id');
        const target = this.getTarget(listId);
        let section = null;

        this.props.menu.categories.map((c) => {
            c.items.map((s) => {
                if (String(s.id) === String(id)) {
                    section = Object.assign({}, s);
                }
            });
        });

        section.sectionId = sectionId;
        this.props.onAddSection(section, evt.newIndex, target);
        $(evt.item).remove();
    }

    showButton() {
        let el = null;
        if (!this.props.menu.showMenu) {
            el = (<img className={styles.icon__plus} onClick={() => this.props.onToggleMenu(true)} src="/app/assets/images/plus.png"/>);
        }
        return el;
    }

    showRightBtns() {
        const disableUndo = this.props.canUndo ? '' : 'disabled';
        const disableRedo = this.props.canRedo ? '' : 'disabled';
        const disableClearExport = this.props.canClear ? '' : 'disabled';

        return (
            <div className={[styles.rightBtns, 'noselect'].join(' ')}>
                <div onClick={() => this.props.onUndo()} className={[mainStyles.circleBtn, disableUndo].join(' ')}>
                    <span className={mainStyles.dark}>Undo</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/undo-gray.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/undo-dark.svg"/>
                </div>
                <div onClick={() => this.props.onRedo()} className={[mainStyles.circleBtn, disableRedo].join(' ')}>
                    <span className={mainStyles.dark}>Redo</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/redo-gray.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/redo-dark.svg"/>
                </div>
                <Settings />

                <div onClick={() => this.onShare()} className={[mainStyles.circleBtn, disableClearExport].join(' ')}>
                    <span className={mainStyles.green}>{this.state.copyText}</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/share-black.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/share-green.svg"/>
                    <input onChange={this.onShare} type="text" value={this.state.url} id="hiddenInput" />
                </div>

                <div onClick={() => this.onExport()} className={[mainStyles.circleBtn, disableClearExport].join(' ')}>
                    <span className={mainStyles.green}>Export</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/download-black.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/download-green.svg"/>
                </div>

                <div onClick={() => this.props.onRemoveAll()} className={[mainStyles.circleBtn, disableClearExport].join(' ')}>
                    <span className={mainStyles.red}>Clear all</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/delete-black.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/delete-red.svg"/>
                </div>

                <div onClick={() => this.onSaveAll()} className={[mainStyles.circleBtn, disableClearExport].join(' ')}>
                    <span className={mainStyles.green}>{this.state.saveText}</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/save-black.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/save-green.svg"/>
                </div>
            </div>
        );
    }

    renderPlaceHolder(sections, text) {
        if (!sections.length) {
            return (
                <div>
                    <img className={styles.placeImg} onClick={() => this.props.onToggleMenu(true)} src="/app/assets/images/plus.svg"/>
                    <h2 className={styles.textPlaceHolder}>{text}</h2>
                </div>
            );
        }
        return '';
    }

    showSmallArrow() {
        if (this.props.containSections.length === 0 ||
            (!this.props.settings.gradients.color1 && !this.props.settings.gradients.color2)) {
            return '';
        }

        let style = {};
        if (this.props.settings.gradients.color2) {
            style.borderTopColor = this.props.settings.gradients.color2;
        } else if (this.props.settings.gradients.color1) {
            style.borderTopColor = this.props.settings.gradients.color1;
        }
        return (
            <div style={style} className={styles.smallArrow}></div>
        );
    }

    getStyles() {
        const style = {};

        if (this.props.containSections.length) {
            if (this.props.settings.gradients.color1 && this.props.settings.gradients.color2) {
                style.background = 'linear-gradient(' + this.props.settings.gradients.color1 + ',' + this.props.settings.gradients.color2 + ')';
            } else if (this.props.settings.gradients.color1) {
                style.background = this.props.settings.gradients.color1;
            } else if (this.props.settings.gradients.color2) {
                style.background = this.props.settings.gradients.color2;
            }
            style.paddingTop = this.props.settings.padding.paddingTop;
            style.paddingLeft = this.props.settings.padding.paddingLeft;
            style.paddingBottom = this.props.settings.padding.paddingBottom;
            style.paddingRight = this.props.settings.padding.paddingRight;
        }

        return style;
    }

    renderPublish() {
        if (this.state.publishing) {
            return (
                <Publish />
            );
        }
        return '';
    }

    render() {
        const style = this.getStyles();
        return (
            <div className={styles.builder} onKeyDown={this.handleKeyDown}>
                <div className={styles.plus}>
                    {this.showButton()}
                </div>
                {this.showRightBtns()}
                <div className={[styles.builderBox, mainStyles.noselect].join(' ')}>
                    <div className={styles.builderBox__header}>
                        <div></div><div></div><div></div>
                    </div>
                    {this.renderPlaceHolder(this.props.fullSections, 'Full Width Section')}
                    <ul id="builderFull" className={styles.builderBox__content}>
                        {this.renderSections(this.props.fullSections)}
                    </ul>
                </div>
                <div className={[styles.builderBox, mainStyles.noselect, 'noMarginBox'].join(' ')}>
                    {this.renderPlaceHolder(this.props.containSections, 'Contained Width Section')}
                    <ul style={style} id="builderContain" className={styles.builderBox__content}>
                        {this.showSmallArrow()}
                        {this.renderSections(this.props.containSections)}
                    </ul>
                </div>
                <div className={[styles.builderBox, mainStyles.noselect, 'noMarginBox'].join(' ')}>
                    {this.renderPlaceHolder(this.props.footerSections, 'Footer Section')}
                    <ul id="builderFooter" className={styles.builderBox__content}>
                        {this.renderSections(this.props.footerSections)}
                    </ul>
                </div>
            </div>
        );
    }
}

Builder.propTypes = {
    onToggleMenu: PropTypes.func,
    onAddSection: PropTypes.func,
    onRemoveSection: PropTypes.func,
    onSortSection: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpdateUser: PropTypes.func,
    onUndo: PropTypes.func,
    onRedo: PropTypes.func,
    onGetUser: PropTypes.func,
    onGetSections: PropTypes.func,
    onToggleAlert: PropTypes.func,
    menu: PropTypes.object,
    settings: PropTypes.object,
    user: PropTypes.object,
    sections: PropTypes.object,
    canUndo: PropTypes.bool,
    canRedo: PropTypes.bool,
    canClear: PropTypes.bool,
    fullSections: PropTypes.array,
    containSections: PropTypes.array,
    footerSections: PropTypes.array,
    params: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Builder);

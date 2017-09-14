import React from 'react';
import { connect } from 'react-redux';
// styles
import styles from '../styles/settings.scss';
import mainStyles from '../styles/main.scss';

import PropTypes from 'prop-types';
import { toggleSettings } from '../actions/toggle_settings';
import { updateUser } from '../actions/users';

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        sections: state.sections,
        user: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleSettings: () => dispatch(toggleSettings()),
        updateUser: (user) => dispatch(updateUser(user))
    };
};

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = this.props.user.settings;
    }

    onSave() {
        const user = this.props.user;
        user.settings = Object.assign({}, this.state);
        this.props.updateUser(user);
        this.onToggle();
    }

    onRemove(type, key) {
        const st = Object.assign({}, this.state[type], {
            [key]: ''
        });
        this.setState({
            [type]: st
        });
    }

    onToggle() {
        this.props.onToggleSettings();
        this.setState(this.props.user.settings);
    }

    handleChange(type, key, event) {
        const st = Object.assign({}, this.state[type], {
            [key]: event.target.value
        });
        this.setState({
            [type]: st
        });
    }

    renderColorBox() {
        return (
            <div className={styles.settingBox}>
                <h3>Gradients</h3>
                <div className={styles.colorsBox}>
                    <div className={styles.colorItem}>
                        <label>Color#1</label>
                        <input name="color1" onChange={($event) => this.handleChange('gradients', 'color1', $event)} value={this.state.gradients.color1} type="text" placeholder="#eeeeee"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('gradients', 'color1')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.colorItem}>
                        <label>Color#2</label>
                        <input name="color2" onChange={($event) => this.handleChange('gradients', 'color2', $event)} value={this.state.gradients.color2} type="text" placeholder="#eeeeee"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('gradients', 'color2')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPaddingBox() {
        return (
            <div className={styles.settingBox}>
                <h3>Padding</h3>
                <div className={styles.colorsBox}>
                    <div className={styles.colorItem}>
                        <label>Left</label>
                        <input name="paddingLeft" onChange={($event) => this.handleChange('padding', 'paddingLeft', $event)} value={this.state.padding.paddingLeft} type="text" placeholder="30px"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('padding', 'paddingLeft')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.colorItem}>
                        <label>Right</label>
                        <input name="paddingRight" onChange={($event) => this.handleChange('padding', 'paddingRight', $event)} value={this.state.padding.paddingRight} type="text" placeholder="30px"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('padding', 'paddingRight')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.colorItem}>
                        <label>Top</label>
                        <input name="paddingTop" onChange={($event) => this.handleChange('padding', 'paddingTop', $event)} value={this.state.padding.paddingTop} type="text" placeholder="30px"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('padding', 'paddingTop')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.colorItem}>
                        <label>Bottom</label>
                        <input name="paddingBottom" onChange={($event) => this.handleChange('padding', 'paddingBottom', $event)} value={this.state.padding.paddingBottom} type="text" placeholder="30px"/>
                        <div className={styles.colorBtns}>
                            <div onClick={() => this.onRemove('padding', 'paddingBottom')} className={[styles.colorBtn, styles.delete].join(' ')}>
                                <img src="/app/assets/images/cross-out.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showContent() {
        if (this.props.settings.showSettings) {
            return (
                <div className={styles.settingsContent}>
                    {this.renderColorBox()}
                    {this.renderPaddingBox()}
                    <div className={[styles.footer, mainStyles.btns].join(' ')}>
                        <button onClick={() => this.onToggle()} className={[mainStyles.btn, mainStyles.btnBlack].join(' ')}>Close</button>
                        <button onClick={() => this.onSave()} className={[mainStyles.btn, mainStyles.btnBlue].join(' ')}>Save</button>
                    </div>
                </div>
            );
        }
        return '';
    }

    render() {
        const disabledSettings = this.props.sections.present.containSections.length !== 0 ? '' : 'disabled';
        return (
            <div className={[styles.settings, disabledSettings].join(' ')}>
                <div onClick={() => this.onToggle()} className={[mainStyles.circleBtn, ''].join(' ')}>
                    <span className={mainStyles.dark}>Settings</span>
                    <img className={mainStyles.circleInactive} src="/app/assets/images/gear-gray.svg"/>
                    <img className={mainStyles.circleActive} src="/app/assets/images/gear-dark.svg"/>
                </div>
                {this.showContent()}
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object,
    sections: PropTypes.object,
    user: PropTypes.object,
    onToggleSettings: PropTypes.func,
    updateUser: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

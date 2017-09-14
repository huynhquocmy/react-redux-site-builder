import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/seo-panel.scss';
import { toggleAlert } from '../actions/app' ;
import { changeMode } from '../actions/menu' ;

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleAlert: () => dispatch(toggleAlert()),
        onChangeMode: (mode) => dispatch(changeMode(mode))
    };
};

class CustomPanel extends React.Component {
    constructor(props) {
        super(props);
        window.CodeMirror;
    }

    componentDidMount() {
        this.activeEditor('css');
    }

    activeEditor(mode) {
        window.CodeMirror.fromTextArea(document.getElementById('custom-css'), {
            lineNumbers: true,
            value: '',
            mode: mode,
            matchBrackets: true,
            styleActiveLine: true,
            theme: 'base16-light'
        });
    }

    render() {
        return (
            <div className={styles.seoPanel}>
                <h2>Custom CSS</h2>
                <div className={styles.seoPanelContent}>
                    <p className={styles.warningText}>
                        This area will allow you to inject custom CSS rules into your site.
                    </p>
                    <p className={styles.warningText}>
                        Warning: Adding custom CSS to your site can break your design. <br/>
                        Please use caution when using this feature. Our support team will be limited in their ability to help you with design related issues if you have custom CSS.
                    </p>
                    <div className={styles.customContent}>
                        <textarea id="custom-css"></textarea>
                    </div>
                    <div className={styles.customFileBtn}>
                        <button onClick={() => this.props.onToggleAlert()} className="btn btn-large">MANAGE CUSTOM FILES</button>
                    </div>
                </div>
                <div className={styles.seoPanelFooter}>
                    <button onClick={() => this.props.onChangeMode('main')} className="btn btnGreen">Save changes</button>
                </div>
            </div>
        );
    }
}

CustomPanel.propTypes = {
    section: PropTypes.object,
    onToggleAlert: PropTypes.func,
    onChangeMode: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomPanel);

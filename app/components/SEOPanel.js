import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/seo-panel.scss';
import { changeMode } from '../actions/menu' ;

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMode: (mode) => dispatch(changeMode(mode))
    };
};

class SEOPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.seoPanel}>
                <h2>Page SEO</h2>
                <div className={styles.seoPanelContent}>
                    <div className={styles.seoPanelArea}>
                        <div className={styles.seoPanelItem}>
                            <label>Page Title</label>
                            <input type="text" placeholder="Your page title" />
                        </div>
                        <div className={styles.seoPanelItem}>
                            <label>Favicon Icon</label>
                            <input type="text" placeholder="Url to your favicon file" />
                        </div>
                    </div>

                    <div className={styles.seoPanelArea}>
                        <h4>SEO</h4>
                        <div className={styles.seoPanelItem}>
                            <label>Meta Og Title</label>
                            <input type="text" placeholder="Title for SEO" />
                        </div>
                        <div className={styles.seoPanelItem}>
                            <label>Meta Og Url</label>
                            <input type="text" placeholder="Your site url" />
                        </div>

                        <div className={styles.seoPanelItem}>
                            <label>Meta Og Image</label>
                            <div className={styles.imagePlace}>
                                <i>+</i>
                                <span>Upload</span>
                            </div>
                        </div>
                        <div className={styles.seoPanelItem}>
                            <label>Meta Og Description</label>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.seoPanelFooter}>
                    <button onClick={() => this.props.onChangeMode('main')} className="btn btnGreen">Save changes</button>
                </div>
            </div>
        );
    }
}

SEOPanel.propTypes = {
    section: PropTypes.object,
    onChangeMode: PropTypes.func
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SEOPanel);


import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/publish.scss';
import Section from './Section';

const mapStateToProps = (state) => {
    return {
        user: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.getSections = this.getSections.bind(this);
    }

    getSections(type) {
        const sections = [];
        const data = this.props.user.sections[type];
        data.forEach((s) => {
            sections.push(
                <Section section={s} key={s.id}/>
            );
        });
        return sections;
    }

    getStyles() {
        const settings = this.props.user.settings;
        const style = {};

        if (settings.gradients.color1 && settings.gradients.color2) {
            style.background = 'linear-gradient(' + settings.gradients.color1 + ',' + settings.gradients.color2 + ')';
        } else if (settings.gradients.color1) {
            style.background = settings.gradients.color1;
        } else if (settings.gradients.color2) {
            style.background = settings.gradients.color2;
        }
        style.paddingTop = settings.padding.paddingTop;
        style.paddingLeft = settings.padding.paddingLeft;
        style.paddingBottom = settings.padding.paddingBottom;
        style.paddingRight = settings.padding.paddingRight;
        return style;
    }

    render() {
        let style = this.getStyles();

        return (
            <div className={styles['f-container']}>
                <div className={styles['f-area']}>
                    {this.getSections('fullSections')}
                </div>
                <div style={style} className={[styles['f-area'], styles['f-area-contain']].join(' ')}>
                    {this.getSections('containSections')}
                </div>
                <div className={styles['f-area']}>
                    {this.getSections('footerSections')}
                </div>
            </div>
        );
    }
}

Publish.propTypes = {
    user: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Publish);

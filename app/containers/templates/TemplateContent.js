import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../../actions/get_all';
import styles from '../../styles/templates.scss';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(getAll())
    };
};

class TemplateContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.onGetAll();
    }

    selectTemplate(id) {
        browserHistory.push({
            pathname: '/project/' + id
        });
    }

    renderContent() {
        return (
            <div className={styles.templatesContainer}>
                <div className={styles.templatesTop}>
                    <h4>Pick a template and start your project</h4>
                    <h2>Templates</h2>
                </div>
                <div className={styles.templatesList}>
                    <div className={styles.template} onClick={() => this.selectTemplate('-Kqb5NODHHFoncPhThHi')}>
                        <img src="/app/templates/templates/template-1.png"/>
                    </div>
                    <div className={styles.template} onClick={() => this.selectTemplate('-Kq_vDMbLc-MJqKDgJDY')}>
                        <img src="/app/templates/templates/template-2.png"/>
                    </div>
                    <div className={styles.template} onClick={() => this.selectTemplate('-Kqb5NODHHFoncPhThHi')}>
                        <img src="/app/templates/templates/template-3.png"/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

TemplateContent.propTypes = {
    menu: PropTypes.object,
    params: PropTypes.object,
    onGetAll: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateContent);

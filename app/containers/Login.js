import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../actions/get_all';
import styles from '../styles/login.scss';
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

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChanged = this.handleChanged.bind(this);
        this.state = {
            errorMessage: ''
        };
    }

    componentWillMount() {
        localStorage.removeItem('user');
        this.setState({
            email: '',
            password: ''
        });
    }

    handleChanged(evt) {
        const nextState = {};
        nextState[evt.target.name] = evt.target.value;
        this.setState(nextState);
    }

    showErrorMessage() {
        if (this.state.errorMessage) {
            return (
                <div className="errorMessage">{this.state.errorMessage}</div>
            );
        }
        return '';
    }

    login() {
        if (this.state.email === 'admin@testing.com' && this.state.password === '123456') {
            localStorage.setItem('user', JSON.stringify(this.state));
            browserHistory.push({
                pathname: '/'
            });
        } else {
            this.setState({
                'errorMessage': 'Incorrect email or password.'
            });
        }
    }

    recover(status) {
        this.setState({recover: status});
    }

    loginForm() {
        if (this.state.recover) {
            return '';
        }
        const disabled = (this.state.email && this.state.password) ? '' : 'disabled';
        return (
            <div className={styles.loginForm}>
                <h3>Login to OCBC Builder</h3>
                <div className={styles.loginContent}>
                    <div className={styles.loginItem}>
                        <input value={this.state.email} onChange={this.handleChanged} name="email" type="text" placeholder="Email Address" />
                        <i className="fa fa-envelope-o"></i>
                    </div>
                    <div className={styles.loginItem}>
                        <input value={this.state.passowrd} onChange={this.handleChanged} name="password" type="password" placeholder="Password" />
                        <i className="fa fa-key"></i>
                    </div>
                    {this.showErrorMessage()}
                    <div className={styles.loginBtn}>
                        <button onClick={() => this.login()} className={['btn', disabled].join(' ')}>Log in</button>
                    </div>
                </div>
            </div>
        );
    }

    recoverForm() {
        if (this.state.recover) {
            const disabled = this.state.email ? '' : 'disabled';
            return (
                <div className={styles.loginForm}>
                    <h3>Recover Account</h3>
                    <div className={styles.loginContent}>
                        <div className={styles.loginItem}>
                            <input value={this.state.email} onChange={this.handleChanged} name="email" type="text" placeholder="Email Address" />
                            <i className="fa fa-envelope-o"></i>
                        </div>
                        <div className={styles.loginBtn}>
                            <button onClick={() => this.recover()} className={['btn', disabled].join(' ')}>Send recovery email</button>
                        </div>
                    </div>
                </div>
            );
        }
        return '';
    }

    bottomLinks() {
        if (!this.state.recover) {
            return (
                <div className={styles.bottomLinks}>
                    <div onClick={() => this.recover(true)} className={styles.bottomLink}>Recover Account</div>
                </div>
            );
        }

        return (
            <div className={styles.bottomLinks}>
                <div onClick={() => this.recover(false)} className={styles.bottomLink}>Already have an account? Login</div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.login}>
                <div className={styles.logo}>
                    <img src="/app/assets/images/logo.png" />
                </div>
                {this.loginForm()}
                {this.recoverForm()}
                {this.bottomLinks()}
            </div>
        );
    }
}

Login.propTypes = {
    menu: PropTypes.object,
    params: PropTypes.object,
    match: PropTypes.object,
    onGetAll: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

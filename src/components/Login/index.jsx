import React from 'react';

import ErrorMessage from '../ErrorMessage';
import { login } from '../../actions';

import './style.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.state = {
            name: '',
            password : '',
            error: false };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className = "formPage-wrapper">
                <div className = "form-wrapper">
                    <div className="form-header">
                        <h2 className="form-heading">Login</h2>
                    </div>
                    <form className = "form1" onSubmit={this.handleSubmit}>
                        <div className="field-wrapper" >
                            <input className="field-input" type="text" id="name"  placeholder="john.doe" value={this.state.name} onChange={this.handleEmailChange} />
                            <label className="field-label" htmlFor="username" >Username</label>
                        </div>
                        <div className="field-wrapper" >
                            <input className="field-input" type="password" id="password"  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={this.state.password} onChange={this.handlePasswordChange} />
                            <label className="field-label" htmlFor="password" >Password</label>
                        </div>
                        <div className="submit-btn-wrapper">
                            <button className="submit-btn" type="submit">Login</button>
                        </div>
                    </form>
                    {this.state.error && <ErrorMessage />}
                </div>
            </div>
        );
    }

    handleEmailChange(event) {
        this.setState({name: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var email = this.state.name;
        var pass = this.state.password;
        var Credentials = {};
        Credentials.email = email;
        Credentials.pwd = pass;

        login(Credentials).then((res) => {
            console.log(res)
            if(res) {
                this.history.push('/app');
            }
            else {
                this.setState({error: !res});
            }
        })
    }
}

export default Login;
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../components/Login';

class UnauthorizedLayout extends React.Component {
    render() {
        return (
            <div className="unauthorizedLayout">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        )
    }
}

export default UnauthorizedLayout;
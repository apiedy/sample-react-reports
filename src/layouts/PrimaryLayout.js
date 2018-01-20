import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar';
import DashHome from '../components/DashHome';
import About from '../components/About';
import ReportStyle1 from '../components/ReportStyle1';
import ReportStyle2 from '../components/ReportStyle2';
import Header from '../components/Header';

import { getLoggedUser } from '../actions'
import './style.css';


class PrimaryLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    componentWillMount() {
        getLoggedUser();
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        })
    }

    handleMouseDown(e) {
        this.toggleMenu();
        // e.stopPropagation();
    }
    
    render() {
        const layout =
        <div className="primaryLayout">
            <Sidebar handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible} />
            <Col className= "contentLayout" >
                <Header handleMouseDown={this.handleMouseDown} />
                <Switch>
                    <Route path={`${this.props.match.path}`} exact component={DashHome} />
                    <Route path={`${this.props.match.path}/about`} component={About} />
                    {/* <Route path={`${match.path}/report1`} component={ReportPage} /> sublayout and further links and routing */}
                    <Route path={`${this.props.match.path}/report1`} component={ReportStyle1} />
                    <Route path={`${this.props.match.path}/report2`} component={ReportStyle2} />
                    <Redirect to={`${this.props.match.url}`} />
                </Switch>
            </Col>
        </div>
        return (
            this.props.logged ? layout : <Redirect to="/auth/login" />
        )
    }
}

const stateToProps = ({ loggedUserState }) => ({
    pending: loggedUserState.pending,
    logged: loggedUserState.logged
})

export default connect(stateToProps)(PrimaryLayout);
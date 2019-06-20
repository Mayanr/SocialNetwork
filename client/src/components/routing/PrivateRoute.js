import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    // if it's not authenticated and not loading (? =then) redirect
    <Route 
    {...rest} render={props => 
        !isAuthenticated && !loading ? (
            <Redirect to="/login"/>): 
        (
            <Component {...props}/> 
        ) 
    }/>
)

PrivateRoute.prototype = {
    auth: PropTypes.object.isRequired
}

const mpStateToProps = state => ({
    auth: state.auth
})

export default connect(mpStateToProps)(PrivateRoute)
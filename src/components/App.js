import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom"; //HashRouter

// components
// import Layout from "./Layout";
import IdealTimerContainer from '../components/IdealTimerContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
// pages
// import Error from "../pages/error";
// import Login from "../pages/login";
// import ResetPassword from "../pages/resetPassword";


// context
import { useUserState } from "../context/UserContext";
// //redux 

import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Provider } from "react-redux";
import store from '../redux/store';
const Layout = lazy(() => import('./Layout'));
const Error = lazy(() => import('../pages/error'));
const Login = lazy(() => import('../pages/login'));
const ResetPassword = lazy(() => import('../pages/resetPassword'));
// const IDMeCallback = lazy(() => import('../pages/idmeCallback'));

export default function App() {
    // global
 
    sessionStorage.setItem('server_api_url', "https://cadarch-server-v1.herokuapp.com/api/");

    var { isAuthenticated } = useUserState();

    console.log(`isAuthunticated ${isAuthenticated}`);

    return (
        <Provider store={store}>
            <HashRouter>
                <IdealTimerContainer></IdealTimerContainer>
                <Suspense fallback={<Box style={{ display: 'block', width: '100%', textAlign: "center", paddingTop: "10%" }}><CircularProgress /></Box>}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
                        <PrivateRoute path="/app" component={Layout} />
                        <PublicRoute path="/login" component={Login} />
                        <PublicRoute path="/resetpassword" component={ResetPassword} />
                        {/* <Route path="/IDMeCallback" component={IDMeCallback} /> */}
                        <Route component={Error} />
                    </Switch>
                </Suspense>
            </HashRouter>
        </Provider>
    );
    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }
}

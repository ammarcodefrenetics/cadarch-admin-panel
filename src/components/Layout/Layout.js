import React, { lazy, Suspense } from "react";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";
import classnames from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// context
import { useLayoutState } from "../../context/LayoutContext";


const Dashboard = lazy(() => import('../../pages/dashboard'));
// const CostEstimator = lazy(() => import('../../pages/costEstimator'));
const CostEstimator = lazy(() => import('../../pages/costEstimator/CostEstimator'));
const Renovation = lazy(() => import('../../pages/renovation/Renovation'));
const Architecture = lazy(() => import('../../pages/architecture/Architecture'));
const Construction = lazy(() => import('../../pages/construction/Construction'));
const Question = lazy(() => import('../../pages/question/Question'));
const News = lazy(() => import('../../pages/news/News'));
const Plots = lazy(() => import('../../pages/plots/Plot'));
const Users = lazy(() => import('../../pages/usersList/UsersList'));
const ChangeUserPassword = lazy(() => import('../../pages/changePassword/ChangeUserPassword'));
const Profile = lazy(() => import('../../pages/profile/Profile'));
const Support = lazy(() => import('../../pages/support/Support'));
const BasePrice = lazy(() => import('../../pages/baseprice/BasePrice'));


function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history} isSidebarOpened={layoutState.isSidebarOpened} />
                <Sidebar />
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.Toolbar} />
                    <Suspense fallback={<Box style={{ display: 'block', width: '100%', textAlign: "center", paddingTop: "10%" }}><CircularProgress /></Box>}>
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/costestimator" component={CostEstimator} />
                            <Route path="/app/renovation" component={Renovation} />
                            <Route path="/app/architecture" component={Architecture} />
                            <Route path="/app/construction" component={Construction} />
                            <Route path="/app/questions" component={Question} />
                            <Route path="/app/news" component={News} />
                            <Route path="/app/users" component={Users} />
                            <Route path="/app/plots" component={Plots} />
                            <Route path="/app/updateprofile" component={Profile} />
                            <Route path="/app/support" component={Support} />
                            <Route path="/app/baseprice" component={BasePrice} />
                            <Route path="/app/changePassword" component={ChangeUserPassword} />
                        </Switch>
                    </Suspense>
                </div>
            </>
        </div>
    );

}

export default withRouter(Layout);

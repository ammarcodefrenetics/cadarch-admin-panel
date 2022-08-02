import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
    Home as HomeIcon,
    ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

// Icons
import Dashboard from "../../images/icons/dashboard-icon.png";
import CostEstimator from "../../images/icons/estimator.png";
import Renovation from "../../images/icons/renovation.png";
import Architecture from "../../images/icons/architecture.png";
import Construction from "../../images/icons/construction.png";
import News from "../../images/icons/news.png";
import Questions from "../../images/icons/questions.png";
import Plots from "../../images/icons/plots.png";
import Profile from "../../images/icons/profile.png";

function Sidebar({ location }) {
    var classes = useStyles();
    var theme = useTheme();

    const newStructure = [
        {
            id: parseInt(1),
            label: 'Dashboard',
            link: "/app/" + 'Dashboard'.toLowerCase(),
            icon: <img src={Dashboard} alt='icon' />
        },
        {
            id: parseInt(2),
            label: 'Cost Estimator',
            link: "/app/" + 'CostEstimator'.toLowerCase(),
            icon: <img src={CostEstimator} alt='icon' />
        },
        {
            id: parseInt(3),
            label: 'Renovation',
            link: "/app/" + 'Renovation'.toLowerCase(),
            icon: <img src={Renovation} alt='icon' />
        },
        {
            id: parseInt(4),
            label: 'Architecture',
            link: "/app/" + 'Architecture'.toLowerCase(),
            icon: <img src={Architecture} alt='icon' />
        },
        {
            id: parseInt(5),
            label: 'Construction',
            link: "/app/" + 'Construction'.toLowerCase(),
            icon: <img src={Construction} alt='icon' />
        },
        {
            id: parseInt(6),
            label: 'Questions',
            link: "/app/" + 'Questions'.toLowerCase(),
            icon: <img src={Questions} alt='icon' />
        },
        {
            id: parseInt(7),
            label: 'Plots',
            link: "/app/" + 'Plots'.toLowerCase(),
            icon: <img src={Plots} alt='icon' />
        },
        {
            id: parseInt(8),
            label: 'News',
            link: "/app/" + 'News'.toLowerCase(),
            icon: <img src={News} alt='icon' />
        },
        {
            id: parseInt(9),
            label: 'Users',
            link: "/app/" + 'Users'.toLowerCase(),
            icon: <img src={Profile} alt='icon' />
        },
        {
            id: parseInt(10),
            label: 'Base Price',
            link: "/app/" + 'Baseprice'.toLowerCase(),
            icon: <img src={Profile} alt='icon' />
        },
        {
            id: parseInt(11),
            label: 'Support',
            link: "/app/" + 'Support'.toLowerCase(),
            icon: <img src={CostEstimator} alt='icon' />
        }

    ];

    // global
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(function () {

        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {newStructure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            //setPermanent(false);
            if (isSidebarOpened) {
                toggleSidebar(layoutDispatch);
            }
        } else if (!isSmallScreen && !isPermanent) {
            // setPermanent(true);

        }

    }
}

export default withRouter(Sidebar);

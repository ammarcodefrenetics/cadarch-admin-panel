import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Divider,
    Grid,
    Tooltip,
    Button,
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import {
    Menu as MenuIcon,
    MenuOpen as MenuOpenIcon,
    PersonOutline as AccountIcon,
    Send as SendIcon,
    ChatBubbleOutline as MessageOutline,
    LocationOnOutlined as LocationOnOutlinedIcon,
    KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon,
    LockOpen as ChangePasswordIcon,
    ExitToApp as SignOuticon,
    KeyboardArrowDown as ArrowDownIcon
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers";
import Notification from "../Notification/Notification";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

// context
import { useUserDispatch, signOut, changePassword, useUserState } from "../../context/UserContext";
import AppLogo from "../../images/app_logo.svg";
import ProfilePic from "../../images/profile-pic.jpg";
import BellIcon from "../../images/icons/Notification.png";
import TaskIcon from "../../images/icons/task-old.png";
import LogoutIcon from "../../images/icons/logout.png";
import TaskListIcon from "../../images/icons/task-list-icon.png";
import NotificationListIcon from "../../images/icons/notification-list-icon.png";
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import { baseUrlForFiles } from "../../Configuration/baseUrlForFiles";
//Redux
import { connect } from 'react-redux';

const messages = [
    {
        id: 0,
        name: "Pending Encounter to Sign",
        message: "2 Pending encounters",
    },
    {
        id: 1,
        name: "Pending Documents to Sign",
        message: "5 Documents",
    },
    {
        id: 2,
        name: "Test Results to Sign",
        message: "10 Test Results",
    },

];
const location = [
    {
        id: 0,
        color: "#11284b",
        type: "locationIcon",
        message: "East Mantee Health and Wellness Center"
    },
    {
        id: 1,
        color: "#11284b",
        type: "locationIcon",
        message: "Family Wellness Center ...",
    },
];
const notifications = [
    {
        id: 0,
        name: "Appointment Reminder",
        appointmentTime: "10:00 am",
        time: "30mins",
        dateTime: "2 mins ago",
        patientName: "Ashton Cox - General Checkup",
    },
    {
        id: 1,
        name: "Appointment Reminder",
        appointmentTime: "11:00 am",
        time: "30mins",
        dateTime: "10 mins ago",
        patientName: "Airi Satou -Chiropractic",
    },
    {
        id: 2,
        name: "Appointment Reminder",
        appointmentTime: "12:00 am",
        time: "30mins",
        dateTime: "20 mins ago",
        patientName: "Sarah Smith - Cosmetology",
    },

];

function Header(props) {

    var userdata = JSON.parse(sessionStorage.getItem('user_info'));


    // var locationlist = JSON.parse(user).userLocations;
    var locationlist = [{ id: 1, text1: "Location 1" }];

    var classes = useStyles();
    var layoutState = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [mailMenu, setMailMenu] = useState(null);
    var [notificationsMenu, setNotificationsMenu] = useState(null);
    var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
    var [locationMenu, setLocationMenu] = useState(null);
    var [profileMenu, setProfileMenu] = useState(null);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>

                <Typography variant="h6" weight="medium" className={classes.logotype}>
                    <Link to="/"> <img src={AppLogo} alt="CADARCH logo" className={classes.logotypeImage} /></Link>
                </Typography>

                <IconButton color="inherit" size="small" onClick={() => toggleSidebar(layoutDispatch)}
                    className={classNames(
                        classes.headerMenuButtonSandwich,
                        classes.headerMenuButtonCollapse,
                    )}
                >
                    {props.isSidebarOpened === true ?
                        <MenuOpenIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        /> :
                        <MenuIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    }
                </IconButton>

                <div className={classes.grow} >
                    <Grid container spacing={1}>
                        <Grid item sm={12} md={6}>
                            {props.progressBarState ? <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> : ''}
                        </Grid>
                        <Grid item sm={3} md={3} className={classes.centerLine}></Grid>
                        <Grid item sm={3} md={3}>
                            <Button className={classes.userBox}
                                onClick={e => setProfileMenu(e.currentTarget)}
                            >
                                <img
                                    src={userdata != null && userdata.profilePhoto != null ? baseUrlForFiles+userdata.profilePhoto.replace(/\\/g, "/").replace('public/', '/') : ProfilePic}
                                    alt="User DP"
                                    className={classes.userDp}
                                    onError={(e) => (e.target.onerror = null, e.target.src = ProfilePic)}
                                />
                                <div className={classes.userProfile}>
                                    <div className={classes.user}>
                                        <span className={classes.userName}>
                                            {userdata != null ? userdata.firstName+" "+userdata.lastName : "Melvin B. Price Static"}
                                        </span>
                                        <span
                                            className={classes.userDetails}
                                        >
                                            Admin
                                            {/* {userdata.isProvider ? userdata.specializationName : userdata.roleName} */}

                                        </span>
                                    </div>
                                </div>
                                <ArrowDownIcon />
                            </Button>
                        </Grid>
                    </Grid>


                </div>

                {/* <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    aria-controls="mail-menu"
                    onClick={e => {
                        setNotificationsMenu(e.currentTarget);
                        setIsNotificationsUnread(false);
                    }}
                    className={classes.headerMenuButton}
                >
                    <Badge
                        badgeContent={isNotificationsUnread ? notifications.length : null}
                        color="warning"
                    >
                        <Tooltip title="Notifications">
                            <img src={BellIcon} alt="Notification" className={classes.notIcon} />
                        </Tooltip>
                    </Badge>
                </IconButton> */}

                <Menu
                    id="location-menu"
                    open={Boolean(locationMenu)}
                    anchorEl={locationMenu}
                    onClose={() => setLocationMenu(null)}
                    className={classes.headerMenu}
                    classes={{ paper: classes.locationMenuOptions }}
                    disableAutoFocusItem
                >
                    {locationlist.map((location, i) => (
                        <div key={i} className={classes.locationMenuOptions}>
                            <LocationOnOutlinedIcon className={classes.MenulocationIcon} />
                            <MenuItem
                                key={location.id}
                                onClick={() => setLocationMenu(null)}
                                className={classes.headerMenuItem}
                            >
                                {/*<Notification {...locationlist} typographyVariant="inherit" /> */}
                                {location.text1}
                            </MenuItem>
                        </div>
                    ))}
                </Menu>

                <Menu
                    id="notifications-menu"
                    open={Boolean(notificationsMenu)}
                    anchorEl={notificationsMenu}
                    onClose={() => setNotificationsMenu(null)}
                    MenuListProps={{ className: classes.headerMenuList }}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.taskMenu}>
                        <Typography weight="bold" className={classes.taskListTitle}>
                            Notifications
                            <span
                                className={classes.messageLength}
                            >{messages.length}</span>
                        </Typography>
                    </div>
                    {notifications.map(notification => (
                        <MenuItem
                            key={notification.id}
                            onClick={() => setNotificationsMenu(null)}
                            className={classes.headerMenuItem}
                        >

                            <div className={classes.messageNotificationSide}>
                                <span className={classes.iconBg}>
                                    <img src={NotificationListIcon} alt="Notification Icon" className={classes.notIcon} />
                                </span>
                            </div>
                            <div
                                className={classNames(
                                    classes.messageNotificationSide,
                                    classes.messageNotificationBodySide,
                                )}
                            >
                                <Typography size="sm" weight="medium" className={classes.textColor} gutterBottom >
                                    {notification.name}
                                </Typography>
                                <Typography size="sm" color="text" colorBrightness="primary">{notification.patientName}</Typography>
                                <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>

                                    <Typography size="sm" color="text" colorBrightness="secondary">
                                        {notification.appointmentTime} -  {notification.time}
                                    </Typography>
                                    <Typography size="sm" color="text" colorBrightness="secondary">
                                        {notification.dateTime}
                                    </Typography>
                                </div>
                            </div>
                            {/* <div>
                                <Typography size="sm" color="text" colorBrightness="secondary">
                                    {notification.dateTime}
                                </Typography>
                            </div> */}
                        </MenuItem>
                    ))}
                </Menu>

                <Menu
                    id="profile-menu"
                    open={Boolean(profileMenu)}
                    anchorEl={profileMenu}
                    onClose={() => setProfileMenu(null)}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            {userdata != null ? userdata.fullName : "Melvin B. Price Static"}
                        </Typography>
                    </div>
                    <Divider />

                    <MenuItem className={classes.profileMenuItem}>
                        <AccountIcon className={classes.profileMenuIcon} />
                        <Link onClick={() => setProfileMenu(null)} className={classes.profileMenuItem} to="/app/updateprofile">Profile</Link>
                    </MenuItem>

                    <MenuItem className={classes.profileMenuItem}>
                        <ChangePasswordIcon className={classes.profileMenuIcon} /> <Link className={classes.profileMenuItem} to="/app/changePassword" onClick={() => setProfileMenu(null)}> Change Password</Link>
                    </MenuItem>

                    {/* <MenuItem className={classes.profileMenuItem}>
                        <MessageOutline className={classes.profileMenuIcon} />
                        <Link className={classes.profileMenuItem} to="/app/messages">Messages</Link>
                    </MenuItem> */}

                    <Divider />

                    <MenuItem
                        className={classes.profileMenuItem}
                        onClick={() => signOut(userDispatch, props.history)}
                    >
                        <SignOuticon className={classes.profileMenuIcon} /> Sign Out
                    </MenuItem>

                </Menu>
            </Toolbar>
        </AppBar>
    );
}
const mapStateToProps = state => {
    return { progressBarState: state };
};
export default connect(mapStateToProps,
    // { selectState }
)(Header);
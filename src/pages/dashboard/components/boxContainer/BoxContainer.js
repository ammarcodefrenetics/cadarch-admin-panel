import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import { Button, Typography, Paper } from '@material-ui/core';
import CircleRightIcon from '../../../../images/icons/dashboardCircleRightIcon.png';
import { Link } from "react-router-dom";

// styles
import useStyles from "./styles";

function BoxContainer({ children, ...props }) {
    var classes = useStyles();
    return (
        <>
            {/* Box Container components */}
            <Paper className={classes.paper} {...props}>
                {children}
            </Paper>
        </>
    );
}
function IconAvatars(props) {
    var classes = useStyles();
    return (
        <div className={classes.containerBox}>
            {/* Icon Circle Box components */}
            <div  className={`${classes.iconCircleBox} ${classes.largBox}`} style={{boxShadow: '0 0 15px -5px'}} >
                {props.imgUrl ?
                    <img style={{width:100}} src={props.imgUrl} alt="dashbord icon" />
                    :
                    <FolderIcon />
                }

            </div>
            <Typography className={`${classes.iconTitle} ${classes.largIconTitle} ${classes.fontStyle}`} variant="h3">
                {props.title}
                {props.value ?
                    <>&nbsp;:&nbsp;{props.value}</>
                    : null}
            </Typography>
        </div>
    );
}
function IconAvatarsSmall(props) {
    var classes = useStyles();
    return (
        <div className={classes.smallContainerBox}>
            {/* Icon Circle Box Small components */}
            <div className={`${classes.iconCircleBox} ${classes.smallBox}`} style={{ backgroundColor: props.bgColor }}>
                {props.imgUrl ?
                    <img src={props.imgUrl} alt="dashbord icon" />
                    :
                    <FolderIcon />
                }
            </div>
            <Typography className={`${classes.iconTitle} ${classes.smallIconTitle} ${classes.fontStyle}`} variant="h3" style={{ maxWidth: props.width, flexBasis: props.width }}>
                {props.title}
                {props.value ?
                    <>&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: props.textColor, fontSize: "48px" }}>{props.value}</span></>
                    : null}
            </Typography>
        </div>
    );
}
function FooterButton(props) {
    var classes = useStyles();
    return (
        <div className={classes.footerArea}>
            {/* Footer Button Area components */}
            <Link to={props.linkUrl ? props.linkUrl : "/"} style={{ display: "block", textDecoration: "none" }}>
                <Button className={`${classes.footerBtn}  ${classes.fontStyle}`} endIcon={<img src={CircleRightIcon} alt="link icon" />}> {props.title}</Button>
            </Link>
        </div>
    );
}

export { BoxContainer, IconAvatars, IconAvatarsSmall, FooterButton };


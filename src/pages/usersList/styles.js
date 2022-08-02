import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px -20px",
        height: 30,
        fontSize: 12,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        '&:hover': {
            backgroundColor: "#596270",
        },
        newAddBtnLink: {
            color: "white",
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }

    },
    positionRelative: {
        position: "relative",
    },
}))
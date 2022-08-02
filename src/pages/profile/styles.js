import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles((theme) => ({
    inputFile: {
        display: "none",
    },
    uploadImageLabel: {
        position: "relative",
        display: "block",
        maxHeight: 90,
        margin: 20,
    },
    uploadImageIcon: {
        position: "absolute",
        bottom: "7px",
        left: "35px",
        right: "auto",
        fontSize: 24,
        color: "#00b2e3",
    },
    uploadImage: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
    },
    uploadImageBox: {
        width: 90,
        height: 90,
        borderRadius: "50%",
        border: "1px solid #d9dfdf",
        backgroundColor: "#f3f3f3",
    },
})) 
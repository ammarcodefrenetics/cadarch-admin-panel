import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "880px",
        borderRadius: '16px',
    },
    dialogContent: {
        minWidth: "860px",
        padding: "20px 0 20px 20px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // minHeight: "550px",
        marginBottom: "5px",
        // padding: '0 10px 0 0'
    },
    InnerContent: {
        paddingRight: '15px',
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        zIndex: "2",
        top: "5px",
        right: "15px",
        width: "30px",
        height: "30px",
        padding: "3px",
        display: "block",
        fontSize: '28px',
        cursor: "pointer",
        position: "absolute",
        "&:hover": {
            // backgroundColor: "#F4F4F4",
            backgroundColor: 'rgba(15, 20, 25, 0.1)',
            borderRadius: '20px'
        }
    },
    headerContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "50% 50%",
        background: "#f1f1f2",
        padding: "15px 20px",
        borderRadius: "5px",
        marginBottom: "10px"
    },
    headerSubContainer: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "32px",
            alignItems: "center",
            // alignItems: "flex-start",
            "& a": {
                textDecoration: "underline !important"
            }
        },
    },
    headerLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#52575C",
        textAlign: "right",
        maxWidth: "150px",
        padding: "0px 8px",
        minWidth: "170px",
    },
    labelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
        textAlign: "left",
        padding: "0px 8px",
    },
    listHeadingLabel: {
        display: "flex",
        border: "1px solid #E1E1E1",
        // borderBottom: "none",
        minHeight: "35px",
        alignItems: "center",
        borderRadius: "5px 5px 0 0",
        "& div": {
            fontWeight: "bold",
            margin: "0px 0px 20px 0px",
        }
    },
    detailsTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "8px",
        width: "100%",
        borderCollapse: "collapse",
        // borderCollapse: "separate !important",
        // margin: "15px",
        marginTop: "10px",
        minHeight: "75px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            backgroundColor: "#E0E0E0",
            minWidth: "100%",
            height: "35px",
            textAlign: "left",
            "& td": {
                fontWeight: "bold",
            }
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px",
        },
        "& tr": {
            height: "30px",
            borderBottom: "1px solid #E1E1E1",
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#52575C",
            padding: "0 10px 0 10px",
            border: "1px solid #E1E1E1",
        }
    },
}));
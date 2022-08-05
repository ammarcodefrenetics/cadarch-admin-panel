import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "880px",
        // maxWidth: '80vw',
        // maxHeight: '92vh',
        borderRadius: '16px',
        // overflow: 'hidden',
    },
    dialogContent: {
        minWidth: "860px",
        // maxWidth: '860px',
        // maxHeight: '90vh',
        padding: "20px 0 5px 20px",
    },
    scrollbars: {
        minWidth: "100%",
        minHeight: "500px",
        maxHeight: "95vh !important",
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
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    customLableInput: {
        lineHeight: "20px",
        paddingRight: 5,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    header: {
        flex: "0 1 auto",
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
    btnSpan: {
        display: "flex",
        width: "100%",
    },
    attachmentBtn: {
        position: "absolute",
        padding: "5px",
        right: "3px",
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: '4px !important',
        "& .MuiInputBase-input": {
            padding: "0 30px 0 12px",
            minHeight: "35.63px",
            fontSize: "14px",
            color: "#4A4A4A",
            textOverflow: 'ellipsis',
            '&:focus': {
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
        "& input::-webkit-outer-spin-button": {
            appearance: "none",
            margin: 0
        },
        "& input::-webkit-inner-spin-button": {
            appearance: "none",
            margin: 0
        },
        "& input[type=number]": {
            appearance: "textfield"
        },
        "& .MuiInputAdornment-root": {
            margin: '0 !important'
        }
    },
    gridArea: {
        margin: '10px 0'
    },
    icdCodeTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: "15px",
        minHeight: "75px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            backgroundColor: "#E0E0E0",
            minWidth: "100%",
            height: "35px",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px"
        },
        "& tr": {
            height: "30px"
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#52575C",
            padding: "0 10px 0 10px",
            "& .MuiInputBase-root": {
                marginBottom: "0px"
            },
            "& input": {

            }
        },
        "& img": {
            width: "18px",
            height: "18px",
            margin: "0 0 0 5px",
            cursor: "pointer"
        }
    },
    addIcon: {
        cursor: "pointer",
        margin: "7px 0 0 8px",
        color: "#00B4E5",
        "& svg": {
            color: "#00B4E5",
        }
    },
    viewIcon: {
        cursor: "pointer",
        margin: "12px 5px 0 8px",
        color: "#00B4E5",
        height: "18px",
        width: "22px",
    },
    addOption: {
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 600,
        color: "#00B4E5",
        cursor: "pointer",
        "& svg": {
            color: '#00B4E5',
            cursor: 'pointer',
            margin: '0px 4px -6px 0px',
            fontSize:'28px'
        }
    },
    map: { height: "180px" },
    optionDetails:{
        overflow:'hidden',
            '&:hover': {
              overflow:'scroll'
             },
    },
  
}));
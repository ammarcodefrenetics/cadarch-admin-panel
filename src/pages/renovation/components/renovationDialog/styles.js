import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "850px",
        borderRadius: '16px',
    },
    dialogContent: {
        minWidth: "500px",
        padding: "20px 0 5px 20px",
    },
    scrollbars: {
        minWidth: "100%",
        minHeight: "265px",
        maxHeight: "95vh",
        height: 'auto'
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
        marginBottom: "5px",
        // padding: '0 10px 0 0'
    },
    InnerContent: {
        paddingRight: '20px',
    },
    footer: {
        // flex: "0 1 40px",
        flex: '0 1 40px',
        position: 'fixed',
        width: '97%',
        bottom: '5px',
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
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
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: '4px !important',
        "& .MuiInputBase-input": {
            padding: "0px 12px",
            minHeight: "35.63px",
            fontSize: "14px",
            color: "#4A4A4A",
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
    imageList: {
        margin: '5px 0 5px 0px',
        listStyle: 'none',
        display: 'flex',
        padding: 0,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        "& li": {
            // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            // transition: '0.3s',
            // borderRadius: '5px',
            width: 220,
            height: 220,
            margin: '0 10px 10px 0px',
            borderRadius: '12px',
            // background: 'linear-gradient(315deg, #cacaca, #f0f0f0)',
            // boxShadow: '-20px -20px 40px #5a5a5a,20px 20px 40px #ffffff',
            "& img": {
                height: 200,
                width: 200,
                borderRadius: '5px',
                "&:hover": {
                    transform: "scale(1.1)"
                }

            }
        }
    },
    audioFile: {
        width: '100%',
        height: '35.63px'
    }
}));
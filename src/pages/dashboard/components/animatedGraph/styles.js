import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    noGraph: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)",
        fontSize: '25px',
        margin:0,
        '@media (max-width: 780px)' : {
            fontSize: '18px'
          },
        '@media (max-width: 480px)' : {
            fontSize: '12px'
        }
    }

}));

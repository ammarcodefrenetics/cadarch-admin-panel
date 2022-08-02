import React, { useState, useEffect } from "react";

import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Fade,
    Card,
    InputBase,
    InputAdornment,
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";
import EmailIcon from "../../images/icons/email-icon.png";
import PasswordIcon from "../../images/icons/password-icon.png";

// context
import { useUserDispatch, loginUser, forgotPassowrd } from "../../context/UserContext";

function Login(props) {
    var classes = useStyles();
    // global
    var userDispatch = useUserDispatch();
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(false);
    var [isSuccess, setIsSuccess] = useState(false);
    var [returnMessage, setReturnMessage] = useState("");
    var [activeTabId, setActiveTabId] = useState(0);
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
    var [forgetPasswordValue, setForgetPasswordValue] = useState("");
    var [validateEmail, setValidateEmail] = useState(false);
    var [resetButtonDisalbed, setResetButtonDisalbed] = useState(false);

    useEffect(() => {

        if (loginValue > 0 && passwordValue.length > 0) { }
        // let interval = setInterval(() => {
        //     if (emailField.current) {
        //       setEmail(emailField.current.value)
        //       //do the same for all autofilled fields
        //       clearInterval(interval)
        //     }
        //   }, 100) 
    }, [loginValue, passwordValue]);

    const onBlurEmail = (event) => {
        let emailadd = event.target.value;

        if (emailadd && !/^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/i.test(emailadd)) {
            setValidateEmail(true);
        }
        else
            setValidateEmail(false);
    };

    const onTabChange = (value) => {

        setActiveTabId(value);
        setValidateEmail(false);
        setResetButtonDisalbed(false);
        setError(false);
        setIsSuccess(false);
        setReturnMessage("");
        setForgetPasswordValue("");
    };

    const onTabChangeBack = (value) => {
        setActiveTabId(value);
        setValidateEmail(false);
        setResetButtonDisalbed(false);
        setError(false);
        setIsSuccess(false);
        setReturnMessage("");
        setLoginValue("");
        setPasswordValue("");
    }
    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(
            userDispatch,
            loginValue,
            passwordValue,
            props.history,
            setIsLoading,
            setError,
            setReturnMessage
        )
    }

    return (

        <Card className={classes.loginContainer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                xm={12} sm={12} md={7} lg={7} xl={7}
                item
            >
                <Grid item xs={10} sm={10} md={9} lg={7} xl={7} className={classes.formContainer}
                    container
                    direction="row"
                    justify="center"
                    align="center">
                    <div className={classes.form}>
                        <img src={logo} alt="logo" className={classes.logotypeImage} />
                        {activeTabId === 0 && (
                            <form onSubmit={handleLogin}>
                                <Grid className={classes.inBox}
                                    container
                                    direction="row"
                                    align="left"
                                >
                                    <Typography variant="h1" className={classes.loginTitle}>
                                        Login
                                    </Typography>
                                    
                                    <InputBase
                                        id="EmailAddress"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={EmailIcon} alt="icon" className={classes.emailIcon} />
                                            </InputAdornment>
                                        }
                                        value={loginValue}
                                        className={classes.textField}
                                        onChange={e => setLoginValue(e.target.value)}
                                        margin="none"
                                        placeholder="Email Address"
                                        type="email"
                                        onBlur={onBlurEmail}
                                        fullWidth
                                        required
                                    />
                                    {validateEmail ? (
                                        <Fade in={validateEmail}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                Invalid email address
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <InputBase
                                        id="Password"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        value={passwordValue}
                                        className={classes.textPassword}
                                        onChange={e => setPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="Password"
                                        type="password"
                                        fullWidth
                                        required
                                        autoComplete={"off"}
                                    />
                                    {error ? (
                                        <Fade in={error}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                {returnMessage}
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <Grid container
                                        direction="row"
                                        justify="flex-end">
                                        <Button
                                            color="primary"
                                            className={classes.forgetButton}
                                            onClick={() => onTabChange(1)}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </Grid>
                                    <div className={classes.formButtons}>

                                        {isLoading ? (
                                            <CircularProgress size={26} className={classes.loginLoader} />
                                        ) : (
                                            <Button
                                                disabled={
                                                    loginValue.length === 0 || passwordValue.length === 0 || validateEmail == true
                                                }
                                                type="submit"
                                                // onClick={() =>
                                                //     loginUser(
                                                //         userDispatch,
                                                //         loginValue,
                                                //         passwordValue,
                                                //         props.history,
                                                //         setIsLoading,
                                                //         setError,
                                                //         setReturnMessage
                                                //     )
                                                // }
                                                autoFocus
                                                className={classes.loginBtn}
                                                size="large"
                                            >
                                                Sign in
                                            </Button>
                                        )}

                                    </div>
                                </Grid>
                            </form>
                        )}

                        {activeTabId === 1 && (
                            <React.Fragment>
                                <Grid className={classes.inBox}
                                    container
                                    direction="row"
                                    align="left"
                                >
                                    <Typography variant="h1" className={classes.loginTitle}>
                                        Forgot your CADARCH Password ?
                                    </Typography>
                                    <Typography className={classes.subTitle01}>
                                        We will send you a password reset via email.
                                    </Typography>
                                    <InputBase
                                        id="resetEmail"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={EmailIcon} alt="icon" className={classes.emailIcon} />
                                            </InputAdornment>
                                        }
                                        value={forgetPasswordValue}
                                        className={classes.textField}
                                        onChange={e => setForgetPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="Email Address"
                                        type="email"
                                        onBlur={onBlurEmail}
                                        required
                                        fullWidth
                                    />

                                    {validateEmail ? (
                                        <Fade in={validateEmail}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                Invalid email address
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <Typography className={classes.subTitle02}>
                                        If you do not have access to your email, please contact your system administrator to have your password reset.
                                    </Typography>

                                    {error ? (
                                        <Fade in={error}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                Email Not Found
                                            </Typography>
                                        </Fade>) : ("")
                                    }

                                    {isSuccess ? (
                                        <Fade in={isSuccess}>
                                            <Typography color="primary" className={classes.errorMessage}>
                                                {returnMessage}
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <Grid container
                                        direction="row"
                                        justify="flex-end">
                                        <Button
                                            color="primary"
                                            className={classes.forgetButton}
                                            onClick={() => onTabChangeBack(0)}
                                        >
                                            Back to login
                                        </Button>
                                    </Grid>
                                    <div className={classes.formButtons}>

                                        {isLoading ? (
                                            <CircularProgress size={26} className={classes.loginLoader} />
                                        ) : (
                                            <Button
                                                disabled={
                                                    (forgetPasswordValue.length === 0 || resetButtonDisalbed == true || validateEmail == true)
                                                }
                                                className={classes.loginBtn}
                                                size="large"
                                                onClick={() =>
                                                    forgotPassowrd(
                                                        forgetPasswordValue,
                                                        props.history,
                                                        setIsLoading,
                                                        setError,
                                                        setIsSuccess,
                                                        setReturnMessage,
                                                        setResetButtonDisalbed
                                                    )}
                                            >
                                                Reset Password
                                            </Button>
                                        )}

                                    </div>
                                </Grid>
                            </React.Fragment>
                        )}
                        <>
                        </>
                    </div>
                    <>
                    </>
                    <Typography className={classes.footerContent}>
                        {/*  Please note this application may only be accessed by
                        authorized users. Each user can only view data associated with their specific account. By logging in,
                        you are accepting our Terms of Services. To find out how we protect your information, view our privacy policy.
                        <span className={classes.copyright}>© 2022 Cadarch.</span>*/}
                        <br />
                    </Typography>
                </Grid>


            </Grid>
        </Card>


    );
}

export default withRouter(Login);

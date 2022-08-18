import React, { useState, useEffect } from "react";

import {
    Grid,
    CircularProgress,
    Paper,
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
import phoneIcon from '../../images/icons/phone.png'
// context
import { useUserDispatch, loginUser, forgotPassowrd, verifyOtp } from "../../context/UserContext";
import { InputBaseField } from "../../components/InputField/InputField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import OtpInput from "react-otp-input";
import ChangeUserPassword from "../changePassword/ChangeUserPassword";
import VisibilityIcon from '../../images/icons/visibility.png';
import VisibilityOffIcon from '../../images/icons/visibility-off.png';



function Login(props) {
    var classes = useStyles();

    // global
    var userDispatch = useUserDispatch();
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(false);
    let [isSuccess, setIsSuccess] = useState(false);
    let [returnMessage, setReturnMessage] = useState("");
    let [activeTabId, setActiveTabId] = useState(0);
    let [loginValue, setLoginValue] = useState("");
    let [passwordValue, setPasswordValue] = useState("");
    let [forgetPasswordValue, setForgetPasswordValue] = useState("");
    let [validateEmail, setValidateEmail] = useState(false);
    let [validatePhoneNumber, setValidatePhoneNumber] = useState(false);
    let [phoneNumber, setPhoneNumber] = useState('');
    let [resetButtonDisalbed, setResetButtonDisalbed] = useState(false);
    const [showPassword , setShowPassword] = useState(false)
    const [pass, setPass] = useState('')
    const [confPass, setConfPass] = useState('')
    const [otp, setOtp] = useState('')
    const [validatePass, setValidatePass] = useState(false);
    const [validateConfPass, setValidateConfPass] = useState(false);

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
    const onBlurPhoneNumber = (e) => {
        let phoneNumber = e.target.value
        if (!phoneNumber || !phoneNumber.length === 10 || !/^-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(phoneNumber)) {
            setValidatePhoneNumber(true);
        }
        else {
            setValidatePhoneNumber(false);
        };
    }


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
                                                <img style={{width:15}} src={EmailIcon} alt="icon" className={classes.emailIcon} />
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
                                                <img style={{width:15}} src={PasswordIcon} alt="icon" className={classes.passwordIcon} />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                                <InputAdornment position="end">

                                                    <span style={{cursor:'pointer'}} onMouseDown={(event) => event.preventDefault()} onClick={() => {
                                                        setShowPassword(!showPassword)
                                                    }}>
                                                        {showPassword ? <img style={{width:25}} className={classes.passwordIcon} src={VisibilityOffIcon} alt='vis' /> : <img style={{width:25}} src={VisibilityIcon} alt='vis' />}
                                                    </span>

                                                </InputAdornment>
                                            }
                                        value={passwordValue}
                                        className={classes.textPassword}
                                        onChange={e => setPasswordValue(e.target.value)}
                                        margin="none"
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
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
                                        We will send you OTP via sms.
                                    </Typography>
                                    <InputBaseField
                                        id="resetEmail"
                                        startAdornment={
                                            <InputAdornment style={{ cursor: 'not-allowed' , padding:5 }} position="start">
                                                <p>+92</p>
                                            </InputAdornment>
                                        }
                                        value={phoneNumber}
                                        className={classes.textField}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        margin="none"
                                        placeholder="3xxxxxxxxx"
                                        type="text"
                                        onBlur={onBlurPhoneNumber}
                                        required
                                        MaxLength="10"
                                        fullWidth
                                    />

                                    {validatePhoneNumber ? (
                                        <Fade in={validatePhoneNumber}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                Invalid phone number
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    <Typography className={classes.subTitle02}>
                                        If you do not have access to your phone, please contact your system administrator to have your password reset.
                                    </Typography>

                                    {error ? (
                                        <Fade in={error}>
                                            <Typography color="secondary" className={classes.errorMessage}>
                                                {returnMessage}
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
                                                    !validatePhoneNumber && phoneNumber.length !== 10 ? true : false
                                                }
                                                className={classes.loginBtn}
                                                size="large"
                                                onClick={() => {
                                                    if (!validatePhoneNumber) {
                                                        forgotPassowrd(
                                                            '+92' + phoneNumber,
                                                            props.history,
                                                            setIsLoading,
                                                            setError,
                                                            setIsSuccess,
                                                            setReturnMessage,
                                                            setResetButtonDisalbed,
                                                            setActiveTabId
                                                        )
                                                    }
                                                    else return
                                                }
                                                }
                                            >
                                                Reset Password
                                            </Button>
                                        )}

                                    </div>
                                </Grid>
                            </React.Fragment>
                        )}
                        {activeTabId === 2 && (
                            <React.Fragment>
                                <Grid className={classes.inBox}
                                    container
                                    direction="row"
                                    align="left"
                                >
                                    {/* <Typography variant="h2" align="center" className={classes.loginTitle}>
                                        OTP Verification
                                    </Typography> */}
                                    <Grid item container justify="center" style={{ marginTop: 40 }}>
                                        <Grid item container alignItems="center" direction="column">
                                            <Grid item>
                                                <Avatar className={classes.avatar}>
                                                    <LockOutlinedIcon />
                                                </Avatar>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="h1" variant="h5">
                                                    Verification Code
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} textAlign="center" style={{ marginTop: 40 }}>
                                        <Paper elevation={0}>
                                            <Typography variant="h6">
                                                Please enter the verification code sent to your mobile
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        container
                                        justify="center"
                                        alignItems="center"
                                        direction="column"
                                    >
                                        <Grid item spacing={3} justify="center" style={{ marginTop: 30 }}>
                                            <OtpInput
                                                value={otp}
                                                onChange={(e) => setOtp(e)}
                                                separator={
                                                    <span>
                                                        <strong>.</strong>
                                                    </span>
                                                }
                                                inputStyle={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    margin: "0 1rem",
                                                    fontSize: "2rem",
                                                    borderRadius: 4,
                                                    border: "1px solid rgba(0,0,0,0.3)"
                                                }}
                                            />
                                            {error ? (
                                                <Fade style={{marginTop:5}} in={error}>
                                                    <Typography color="secondary" className={classes.errorMessage}>
                                                        {returnMessage}
                                                    </Typography>
                                                </Fade>) : ("")
                                            }
                                        </Grid>

                                        <div className={classes.formButtons}>
                                            {isLoading ? (
                                                <CircularProgress size={26} className={classes.loginLoader} />
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        if (otp.length === 4) {
                                                            console.log(phoneNumber, " before calling verify otp")
                                                            verifyOtp(
                                                                otp,
                                                                "+92" + phoneNumber,
                                                                setActiveTabId,
                                                                setIsLoading,
                                                                setError,
                                                                setIsSuccess,
                                                                setReturnMessage,
                                                                setResetButtonDisalbed,
                                                                setActiveTabId
                                                            )
                                                        }
                                                        else return
                                                    }}
                                                    type="submit"
                                                    className={classes.loginBtn}
                                                    size="large"
                                                    fullWidth
                                                    disabled={otp.len !== 4 && isLoading ? true : false}
                                                    style={{ marginTop: 30, width: '100%' }}
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                        </div>

                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )
                        }

                        {activeTabId === 3 && (
                            <ChangeUserPassword isForgot={true} phoneNumber={"+92"+phoneNumber} />
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

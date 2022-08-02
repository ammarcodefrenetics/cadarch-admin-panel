import React from "react";
import { APICall } from '../Services/APICall';
import { GetDataAPI } from '../Services/APIService';
import { GetUserInfo } from "../Services/GetUserInfo";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();


const initialState = {
    currentUser: null,
    isAuthenticated: !!sessionStorage.getItem("auth_token")
};

function useUserState() {
    var context = React.useContext(UserStateContext);

    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true
            };
        case "SIGN_OUT_SUCCESS":
            return {
                ...state,
                isAuthenticated: false
            };
        case "SET_LOGIN_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "SET_LOGOUT_USER":
            return {
                ...state,
                currentUser: null
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function UserProvider({ children }) {

    var [state, dispatch] = React.useReducer(userReducer, initialState);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

async function loginUser(dispatch, emailaddress, password, history, setIsLoading, setError, setReturnMessage) {

    const setUser = user => ({
        type: 'SET_LOGIN_USER',
        payload: user
    });

    setError(false);
    setIsLoading(true);

    if (!!emailaddress && !!password) {

        let data = {
            email: emailaddress,
            password: password,
        };

        var response = await APICall('POST', 'users/login', data);

        if (response.responseCode === 1 && response.responseStatus === 'success') {

            setError(null)
            setIsLoading(false)
            let baseUrl = sessionStorage.getItem('server_api_url');
            sessionStorage.clear();
            sessionStorage.setItem('server_api_url', baseUrl);
            sessionStorage.setItem('auth_token', response.data.token);
            sessionStorage.setItem('user_info', JSON.stringify(response.data));
            // sessionStorage.removeItem("login_attempts");

            //For login
            dispatch({ type: 'LOGIN_SUCCESS' })
            //For Data
            dispatch(setUser(response.data));

            history.push('/app/dashboard')
        }
        else {
            setError(true);
            setIsLoading(false);
            setReturnMessage(response.responseMessage);
        }

    }
    else {
        setError(true);
        setIsLoading(false);
        setReturnMessage(response.responseMessage);
    }
}

async function forgotPassowrd(emailaddress, history, setIsLoading, setError, setIsSuccess, setReturnMessage, setResetButtonDisalbed) {
    setError(false);
    setIsLoading(true);

    if (!!emailaddress) {
        let data = {
            EmailAddress: emailaddress
        };
        setResetButtonDisalbed(true);
        var response = await APICall('POST', 'auth/forgotPassword', data);
        if (response.success) {
            setError(null)
            setIsLoading(false)
            setIsSuccess(true)
            setReturnMessage(response.responseMessage);
        }
        else {
            setError(true);
            setIsLoading(false);
            setReturnMessage(response.responseMessage);
        }

    }
    else {
        setError(true);
        setIsLoading(false);
    }
}

async function validateToken(token, setIsAuthToken, setError, setIsValidToken) {
    setError(false)
    setIsAuthToken(true);
    if (!!token) {
        let data = {
            Token: token
        };

        var response = await APICall('POST', 'auth/validateResetToken', data);
        if (response.success) {
            setIsAuthToken(true);
            setIsValidToken(true);
        }
        else {
            setIsValidToken(false);
            setIsAuthToken(true);
        }

    } else {
        setError(true)
        setIsValidToken(false);
        setIsAuthToken(true);
    }
}

async function resetPassword(dispatch, token, newPassword, confirmPassword, history, setIsLoading, setError, setIsSuccess, setReturnMessage) {
    setError(false);
    setIsLoading(true);
    if (!!token && !!newPassword && !!confirmPassword) {
        if (newPassword == confirmPassword) {
            let data = {
                Token: token,
                Password: newPassword,
                ConfirmPassword: confirmPassword
            };

            var response = await APICall('POST', 'auth/resetPassword', data);
            if (response.success) {
                setError(null)
                setIsLoading(false)
                setIsSuccess(true);
                //alert(response.message);
                setReturnMessage(response.responseMessage)
                //alert("Password Reset Successfully.")
                // history.push('/app/login')
            }
            else {
                setError(true);
                setIsLoading(false);
            }
        }
        else {
            setIsSuccess(false);
            setIsLoading(false);
            setReturnMessage("Passwords can't match")
        }

    } else {
        setIsSuccess(true)
        setIsLoading(false);
    }
}

async function changePassword(dispatch, oldPassword, newPassword, confirmPassword, history, setIsLoading, setError, setIsSuccess, setReturnMessage) {

    let user = sessionStorage.getItem('user_info');

    if (user != null) {
        let userdata = JSON.parse(user).user;
        let email = userdata.emailAddress;

        if (!!email && !!oldPassword && !!newPassword && !!confirmPassword) {

            if (newPassword == confirmPassword) {
                let data = {
                    EmailAddress: email,
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword
                };

                var response = await APICall('POST', 'auth/changePassword', data);
                if (response.success) {

                    setError(false);
                    setIsLoading(false);
                    setIsSuccess(true);
                    setReturnMessage(response.responseMessage);
                    // alert(response.message);
                    // history.push('/app/dashboard');
                }
                else {
                    setError(true);
                    setIsLoading(false);
                    setIsSuccess(false);
                    setReturnMessage(response.responseMessage);
                }
            }
            else {
                setIsSuccess(false);
                setIsLoading(false);
                setReturnMessage("Passwords can't match")
            }

        } else {
            setError(true)
            setIsLoading(false)
            setIsSuccess(true)
        }
    }
    else {
        setError(true)
        setIsLoading(false)
    }

}

async function iDMeCallbackToken(token, setIsAuthToken, setError, setIsValidToken) {
    setError(false)
    setIsAuthToken(true);
    if (!!token) {
        let data = {
            Token: token
        };

        var response = await APICall('POST', 'auth/validateResetToken', data);
        if (response.success) {
            setIsAuthToken(true);
            setIsValidToken(true);
        }
        else {
            setIsValidToken(false);
            setIsAuthToken(true);
        }

    } else {
        setError(true)
        setIsValidToken(false);
        setIsAuthToken(true);
    }
}

function signOut(dispatch, history) {
    sessionStorage.clear();
    dispatch({ type: "SET_LOGOUT_USER" });
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, loginUser, forgotPassowrd, validateToken, resetPassword, changePassword, iDMeCallbackToken, signOut };

import React from "react";
import { APICall } from '../Services/APICall';
import { GetDataAPI } from '../Services/APIService';
import { GetUserInfo } from "../Services/GetUserInfo";
import { PostDataAPI } from "../Services/PostDataAPI";
import { UpdateDataAPI } from "../Services/UpdateDataAPI";
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
            sessionStorage.setItem('user_info', JSON.stringify(response.data.user));
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

async function forgotPassowrd(phoneNumber, history, setIsLoading, setError, setIsSuccess, setReturnMessage, setResetButtonDisalbed,setActiveTabId) {
    setError(false);
    setIsLoading(true);

    if (!!phoneNumber) {
      
        setResetButtonDisalbed(true);
        var response = await PostDataAPI('users/forgotPassword', {model:{cellPhone:phoneNumber}});
        console.log(response , "response")
        if (response.responseCode === 1 && response.responseStatus === 'success') {
            setActiveTabId(2)
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

async function verifyOtp(otp,phoneNumber, setActiveTabId, setIsLoading, setError, setIsSuccess, setReturnMessage) {
    setError(false);
    setIsLoading(true);
    if (!!otp && !!phoneNumber) {
            const response = await PostDataAPI('users/verifyotp', {model:{cellPhone:phoneNumber , otp:otp}});
            console.log(response , " otp")
            if (response.responseCode === 1 && response.responseStatus === 'success') {
                setActiveTabId(3)
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
            setIsSuccess(false);
            setIsLoading(false);
            setReturnMessage("Passwords can't match")
        }
}

async function changePassword(userDispatch,oldPassword, newPassword, confirmPassword, history, setIsLoading, setError, setIsSuccess, setReturnMessage,phoneNumber,isForgot) {
   console.log('got it here' , isForgot , phoneNumber)
    let user = sessionStorage.getItem('user_info');
    if (!isForgot ? user != null : true) {
        console.log('old' ,oldPassword , "new" , newPassword , "confirm new" , confirmPassword)
        let userdata = JSON.parse(user);


        if ( !isForgot ? !!oldPassword && !!newPassword && !!confirmPassword : !!newPassword && !!confirmPassword) {

            if (newPassword === confirmPassword) {
                console.log('got in update pass')
                let data = {
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword
                };
                let data2 = {
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword,
                    cellPhone:phoneNumber
                }
                var response = await UpdateDataAPI(!isForgot ? 'users/changepassword' : 'users/resetpassword' , {model: !isForgot ? data :data2},!isForgot?userdata._id:null);
                console.log(response ,"resposne")
                if (response.responseCode === 1 && response.responseStatus === 'success' ) {
                    setError(false);
                    setIsLoading(false);
                    setIsSuccess(true);
                    signOut(userDispatch, history)
                    alert(response.responseMessage);
                   
                    
                }
                else {
                    setError(true);
                    setIsLoading(false);
                    setIsSuccess(false);
                    // setReturnMessage(response.responseMessage);
                    alert(response.responseMessage);
                }
            }
            else {
                setIsSuccess(false);
                setIsLoading(false);
                // setReturnMessage("Passwords can't match")
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
function resetPassword(){
    console.log('hello')
}

export { UserProvider, useUserState, useUserDispatch, loginUser, forgotPassowrd, validateToken,resetPassword, verifyOtp, changePassword, iDMeCallbackToken, signOut };

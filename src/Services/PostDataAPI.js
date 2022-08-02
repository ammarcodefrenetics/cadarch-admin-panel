
//import * as configData from "../Configuration/config.json";
import { GetUserInfo } from "./GetUserInfo";
// import {PROGRESS_BAR_STATE} from '../redux/actions/' 
import axios from 'axios';

//ReduxPart

import store from '../redux/store';
import { selectProgressBarState } from '../redux/actions/progressBarAction';


export function PostDataAPI(methodName, apiData, type) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    // let baseUrl = "https://03a6-206-84-134-21.ap.ngrok.io/api/";
    let token = sessionStorage.getItem('auth_token');


    const headers = {
        'Content-Type': type && type == "form" ? 'multipart/form-data;charset=utf-8' : 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.post(baseUrl + methodName, apiData, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}
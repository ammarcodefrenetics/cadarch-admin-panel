
//import * as configData from "../Configuration/config.json";
import { GetUserInfo } from "./GetUserInfo";
import axios from 'axios';
//ReduxPart

import store from '../redux/store';
import { selectProgressBarState } from '../redux/actions/progressBarAction';

export function DeleteDataAPI(methodName, apiData, params, type) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.delete(baseUrl + methodName, apiData, params, {
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
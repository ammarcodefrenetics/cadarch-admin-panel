//import * as configData from "../Configuration/config.json";
const axios = require('axios').default;

//let baseUrl = configData.default.ApiUrl;
let token = sessionStorage.getItem('auth_token');

const headerData = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + token
}

const sendGetRequest = async (baseUrl, methodName, apiParams) => {
    try {

        let url = baseUrl + methodName;
        if (apiParams != null && apiParams != '')
            url += "?" + apiParams
        const resp = await axios.get(url, {
            headers: headerData
        })
        return resp.data;

    } catch (err) {
        // Handle Error Here
        console.log(`API request failed! : ${err}`);
        return err;
    }
};

const sendPostRequest = async (baseUrl, methodName, apiData) => {
    try {
        const response = await axios.post(baseUrl + methodName, apiData,
            {
                headers: headerData
            }
        );
        return response.data;
    }
    catch (err) {
        console.log(`API request failed! : ${err}`);
        return err;
    }
};

export async function APICall(type, methodName, apiData) {

    let baseUrl = sessionStorage.getItem('server_api_url');


    switch (type) {
        case "GET":
            return await sendGetRequest(baseUrl, methodName, apiData);
            break;
        case "POST":
            return await sendPostRequest(baseUrl, methodName, apiData);
            break;
        case "PUT":
            // code block
            break;
        case "DELETE":
            // code block
            break;
        default:
    }

}



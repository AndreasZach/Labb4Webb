import * as cookieManager from "../Helpers/CookieManager";

const setHeaders = (needAuth = false) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if(needAuth)
        headers['X-XSRF-TOKEN'] = cookieManager.getCookie('XSRF-REQUEST-TOKEN');
    return headers;
};

export default setHeaders;
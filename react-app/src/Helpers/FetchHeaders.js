const setHeaders = () => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if(localStorage.getItem("userData"))
        headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`;
    return headers;
};

export default setHeaders;
const setHeaders = () => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if(localStorage.getItem("token"))
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return headers;
};

export default setHeaders;
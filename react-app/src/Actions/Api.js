import setHeaders from "../Helpers/FetchHeaders";

const baseUrl = "http://localhost:53319/api";

export const login = async user => fetch(baseUrl + "/account/login", {
    headers: setHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});

export const logout = async () => fetch(baseUrl + "/account/logout", {
    headers: setHeaders(),
    method: 'post',
    credentials: 'include'
});

export const register = async user => fetch(baseUrl + "/account/register", {
    headers: setHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});


export const getAll = async (route, needAuth) => fetch(baseUrl + route, {
    headers: setHeaders(),
    method: 'get',
    credentials: 'include'
});

export const getById = async (id, route) => fetch(baseUrl + route + id, {
    headers: setHeaders(),
    method: 'get',
    credentials: 'include'
});

export const post = async (model, route) => fetch(baseUrl + route, {
    headers: setHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(model)
});

export const put = async (id, model, route) => fetch(baseUrl + route + id, {
    headers: setHeaders(),
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(model)
});

export const Delete = async (id, route) => fetch(baseUrl + route + id, {
    headers: setHeaders(),
    method: 'delete',
    credentials: 'include'
});

export const checkStatus = (status) => {
    if(status === 200 || status === 201){
        return true;
    }else{
        throw new Error("Failed communicating with database with error-code: " + status)
    }
};

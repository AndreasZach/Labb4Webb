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

export const handleError = (status) => {
    if(status == 401)
        alert("You must be logged in to access this page.");
    else if(status == 403)
        alert("You do not have the required role to access this page.");
    else
        alert("An error occured while communicating with the database. (Error code: " + status);
};

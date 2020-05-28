import SetHeaders from "../Helpers/FetchHeaders";

const baseUrl = "http://localhost:53319/api";
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//var xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
// Get a proper url.
export const login = async user => fetch(baseUrl + "/account/login", {
    headers: SetHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});

export const logout = async (xsrfToken = getCookie('XSRF-REQUEST-TOKEN')) => fetch(baseUrl + "/account/logout", {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrfToken
    },
    method: 'post',
    credentials: 'include'
});

export const register = async user => fetch(baseUrl + "/account/register", {
    headers: SetHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});


export const getAll = async (route, needAuth) => fetch(baseUrl + route, {
    headers: SetHeaders(needAuth),
    method: 'get',
    credentials: 'include'
});

export const getById = async (id, route, needAuth) => fetch(baseUrl + route + id, {
    headers: SetHeaders(needAuth),
    method: 'get',
    credentials: 'include'
});

export const post = async (model, route, needAuth) => fetch(baseUrl + route, {
    headers: SetHeaders(needAuth),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(model)
});

export const put = async (id, model, route, needAuth) => fetch(baseUrl + route + id, {
    headers: SetHeaders(needAuth),
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(model)
});

export const Delete = async (id, route, needAuth) => fetch(baseUrl + route + id, {
    headers: SetHeaders(needAuth),
    method: 'delete',
    credentials: 'include'
});

import React from "react";
import * as api from "./Api";
import { Redirect } from "react-router-dom";

const ACTION_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER"
}

const accountAction = async (type, onSuccess, value = {userName: "", password: ""}) => {
    try {
        let response;
        switch (type) {
            case ACTION_TYPES.LOGIN:
                response = await api.login(value);
                break;
            case ACTION_TYPES.LOGOUT:
                response = await api.logout();
                break;
            case ACTION_TYPES.REGISTER:
                response = await api.register(value);
                break;
            default:
                break;
        }
        // add any necessary checks here
        if(() => api.checkStatus(response.status)){
            let result = await response.json();
            if(type === ACTION_TYPES.LOGIN || type === ACTION_TYPES.REGISTER)
                localStorage.setItem("token", result.token);
            if(type === ACTION_TYPES.LOGOUT)
                localStorage.setItem("token", result.token);
            onSuccess(result);
        }
    }catch (error) {
        alert(error);
        return <Redirect to="/" />
    }
}

export default { accountAction, ACTION_TYPES };
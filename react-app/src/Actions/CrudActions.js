import React from "react";
import * as api from "./Api";
import { Redirect } from "react-router-dom";

export const ACTION_TYPES = {
    GET_ALL: "GET_ALL",
    GET_ID: "GET_ID",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const crudActions = async (route, type, onSuccess , id = 0 , model = null) => {
    try {
        let response;
        switch (type) {
            case ACTION_TYPES.GET_ALL:
                response = await api.getAll(route);
                break;
            case ACTION_TYPES.GET_ID:
                response = await api.getById(id, route);
                break;
            case ACTION_TYPES.POST:
                response = await api.post(model, route);
                break;
            case ACTION_TYPES.PUT:
                response = await api.put(id, model, route);
                break;
            case ACTION_TYPES.DELETE:
                response = await api.Delete(id, route);
                break;
            default:
                break;
        }
        let result;
        if(() => api.checkStatus(response.status)){
            result =  await response.json();
            if(onSuccess)
                onSuccess(result);
            else
                return result
        }
    } catch (error) {
        alert(error);
        return <Redirect to="/" />
    }
}


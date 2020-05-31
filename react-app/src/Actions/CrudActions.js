import * as api from "./Api";

export const ACTION_TYPES = {
    GET_ALL: "GET_ALL",
    GET_ID: "GET_ID",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const crudActions = async (route, type, onSuccess , id , model = null) => {
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
        if(response.status === 200 || response.status === 201){
            result = await response.json();
            if(onSuccess)
                onSuccess(result);
            else
                return result;
        }//else
         //   throw new Error(response.status);
    } catch (error) {
        api.handleError(error);
    }
}


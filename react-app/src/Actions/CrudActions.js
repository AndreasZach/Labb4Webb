import * as api from "./Api";

export const ACTION_TYPES = {
    GET_ALL: "GET_ALL",
    GET_ID: "GET_ID",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const crudActions = async (route, type, onSuccess, id , model) => {
    try {
        let response;
        switch (type) {
            case ACTION_TYPES.GET_ALL:
                response = await api.getAll(route, false);
                break;
            case ACTION_TYPES.GET_ID:
                response = await api.getById(id, route, false);
                break;
            case ACTION_TYPES.POST:
                response = await api.post(model, route, true);
                break;
            case ACTION_TYPES.PUT:
                response = await api.put(id, model, route, true);
                break;
            case ACTION_TYPES.DELETE:
                response = await api.Delete(id, route, true);
                break;
            default:
                break;
        }
        // add any necessary checks here
        if(type === ACTION_TYPES.GET_ALL){
            
            let result = await response.json();
            onSuccess(result);
            
        }else{
            console.log(await response.text());
            onSuccess();
            // Add logic for empty responses
        }
    } catch (error) {
     console.log(error); // add proper error-handling here
    }
}


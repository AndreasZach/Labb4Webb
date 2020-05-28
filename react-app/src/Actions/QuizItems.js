import * as api from "./Api";

const route = "/quizitems"

export const ACTION_TYPES = {
    GET_ALL: "GET_ALL",
    GET_ID: "GET_ID",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const quizItemAction = async (type, onSuccess, id, model = null) => {
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
        let result = await response.json();
        result.forEach(x => x.answerOptions.sort(() => Math.random() - 0.5));
        onSuccess(result);
    } catch (error) {
     console.log(error); // add proper error-handling here
    }
}
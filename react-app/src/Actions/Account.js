import * as api from "./Api";

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
        let result = await response.json();
        onSuccess(result);
    } catch (error) {
     console.log(error); // add proper error-handling here
    }
}

export default {accountAction, ACTION_TYPES};
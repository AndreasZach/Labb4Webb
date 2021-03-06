import * as api from "./Api";

const ACTION_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER"
}

const accountAction = async (type, onSuccess, value) => {
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
        if(response.status === 200 || response.status === 201){
            let result = await response.json();
            if(result.error){
                alert(result.error)
                return;
            }
            localStorage.setItem("userData", JSON.stringify(result));
            onSuccess();
        }
        else
            throw new Error(response.status);
    }catch (error) {
        api.handleError(error);
    }
}

export default { accountAction, ACTION_TYPES };
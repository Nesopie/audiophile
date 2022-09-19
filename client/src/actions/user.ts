import { Dispatch } from "redux";
import { ActionType } from "../reducers/types";

export const getUser = () => {
    return function (dispatch: Dispatch) {
        dispatch({ type: ActionType.getState });
    };
};

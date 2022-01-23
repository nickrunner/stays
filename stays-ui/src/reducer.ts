import { ActionType, StaysState } from "./GlobalTypes";

const Reducer = (state: StaysState, action: ActionType): any => {
    switch(action.type){
        case "GET_SELF":
            return {
                ...state,
                self: action.payload
            }
        case "RESIZE":
            return {
                ...state,
                mobile: action.payload
            }
        default:
            return state;
    }
}

export default Reducer
import { ActionType, StaysState } from "./GlobalTypes";
import { User } from "./models/User";

const Reducer = (state: StaysState, action: ActionType): any => {
    switch(action.type){
        case "GET_SELF":
            const user: User = action.payload;
            const signedIn = (user !== undefined);
            console.log("Get Self: ", {user});
            console.log("signed in ? "+signedIn);
            state.isSignedIn = signedIn;
            state.self = user;
            return {
                ...state,
                self: user,
                isSignedIn: signedIn
            }
        case "RESIZE":
            return {
                ...state,
                mobile: action.payload
            }
        case "SAVE_STAY_INFO":
            return {
                ...state,
                stayInfo: action.payload
            };
        default:
            return state;
    }
}

export default Reducer
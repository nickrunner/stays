import { Dispatch } from "react"
import { User } from "./models/User"

export interface StaysState {
    self: User | undefined,
    mobile: boolean,
    persistenceType: string
}

export type ActionType = {
    type: string;
    payload?: any;
}

export type StaysContextType = {
    globalState: StaysState,
    dispatch: Dispatch<ActionType>
}
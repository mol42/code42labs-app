export type GlobalState = {
    firstName: string
}

const initialState: GlobalState = {
    firstName: "tayfun"
}

export default function (oldState: GlobalState = initialState, action: any) {
    return oldState;
}
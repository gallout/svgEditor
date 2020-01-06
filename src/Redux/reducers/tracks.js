const initialState = [
    'smell like spirit','enter sandman'
]

export default function tracks(state = [], action) {
    if(action.type == "ADD_TRACK")
    return [
        ...state,
        action.payload
    ]
    else if(action.type =="DELETE_TRACK") return state

    return state
}
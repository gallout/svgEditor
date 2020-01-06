const initialState =  [
    'smell like spirit','enter sandman'
]

export default function playlists(state = initialState, action) {
    if(action.type == "ADD_PLAYLIST")
    return [
        ...state,
        action.payload
    ]
    else if(action.type =="DELETE_PLAYLIST") return state

    return state
}
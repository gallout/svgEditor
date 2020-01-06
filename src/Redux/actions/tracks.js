var mockApiData = [
    {
        id: 1,
        name: 'Mister Sandman'
    },
    {
        id: 2,
        name: 'Mister Sandman'
    },
    {
        id: 3,
        name: 'Mister Sandman'
    },
    {
        id: 4,
        name: 'Mister Sandman'
    },
]

export const getTracks = () => dispatch => {
    setTimeout(() => {
        console.log('i got tracks');
        dispatch({type:'FETCH_TRACKS_SUCCESS', payload: []})
    }, 2000)
}
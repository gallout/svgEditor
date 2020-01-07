var mockApiData = [
    {
        id: 1,
        name: 'Mister Sandman'
    },
    {
        id: 2,
        name: 'Welcome home'
    },
    {
        id: 3,
        name: 'Master of Puppets'
    },
    {
        id: 4,
        name: 'Fade to black'
    },
]

export const getTracks = () => dispatch => {
    setTimeout(() => {
        console.log('i got tracks');
        dispatch({type:'FETCH_TRACKS_SUCCESS', payload: mockApiData})
    }, 2000)
}
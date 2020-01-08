export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';

// The function, setCurrentIndex, is an 'action creator'
// The return value is an 'action'
// Установка текущего индекса
export const setCurrentIndex = (index) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_INDEX,
        currentIndex: index,
    })
}
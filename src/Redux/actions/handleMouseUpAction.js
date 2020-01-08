export const HANDLE_MOUSE_UP = 'HANDLE_MOUSE_UP'

// The function, submitValue, is an 'action creator'
// The return value is an 'action'

export const handleMouseUpAction = () => dispatch => {
    dispatch({
        type: HANDLE_MOUSE_UP, // action после отпускания объекта

        objMoveId: null,
        rectObject: null,
        circObject: null
    })
}
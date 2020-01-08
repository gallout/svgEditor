export const HANDLE_MOUSE_UP = 'HANDLE_MOUSE_UP'

// The function, handleMouseUpAction, is an 'action creator'
// The return value is an 'action'
// Обнуления свойств у state после отпускания кнопки мыши
export const handleMouseUpAction = () => dispatch => {
    dispatch({
        type: HANDLE_MOUSE_UP, // action после отпускания объекта

        objMoveId: null,
        rectObject: null,
        circObject: null
    })
}
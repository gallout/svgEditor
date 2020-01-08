export const HANDLE_MOUSE_DOWN_OBJ = 'HANDLE_MOUSE_DOWN_OBJ'

// The function, handleMouseDownObjAction, is an 'action creator'
// The return value is an 'action'
// Запоминает состояние объекта при перемещении
export const handleMouseDownObjAction = (obj, e) => dispatch => {
    dispatch({
        type: HANDLE_MOUSE_DOWN_OBJ,

        objMoveId: obj.id,
        clientX: e.clientX,
        clientY: e.clientY
    })
}
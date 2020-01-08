export const HANDLE_MOUSE_DOWN_OBJ = 'HANDLE_MOUSE_DOWN_OBJ'

export const handleMouseDownObjAction = (obj, e) => dispatch => {
    dispatch({
        type: HANDLE_MOUSE_DOWN_OBJ,

        objMoveId: obj.id,
        clientX: e.clientX,
        clientY: e.clientY
    })
}
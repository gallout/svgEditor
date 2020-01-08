export const CLEAR_MOVEID = 'CLEAR_MOVEID';

// The function, clearMoveIdAction, is an 'action creator'
// The return value is an 'action'
// Удаляет Id перемещаемого объекта
export const clearMoveIdAction = () => (dispatch) => {
    dispatch({
        type: CLEAR_MOVEID,
        objMoveId: null,
    })
}
export const CLEAR_MOVEID = 'CLEAR_MOVEID';

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export const clearMoveIdAction = () => (dispatch) => {
    dispatch({
        type: CLEAR_MOVEID,
        objMoveId: null,
    })
}
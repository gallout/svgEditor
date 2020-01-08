export const SET_TOOL = 'SET_TOOL';

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export const setToolAction = (tool) => (dispatch) => {
    dispatch({
        type: SET_TOOL,
        tool: tool,
    })
}
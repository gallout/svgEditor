export const SET_TOOL = 'SET_TOOL';

// The function, handleMouseUpAction, is an 'action creator'
// The return value is an 'action'
// Запись инструмента, выбранного пользователем
export const setToolAction = (tool) => (dispatch) => {
    dispatch({
        type: SET_TOOL,
        tool: tool,
    })
}
export const CLEAR_OBJECTS = 'CLEAR_OBJECTS';

// The function, clearObjectsAction, is an 'action creator'
// The return value is an 'action'
// Удаляет объекты из store

// Не работает !!!!!
export const clearObjectsAction = (objects) => (dispatch) => {
    dispatch({
        type: CLEAR_OBJECTS,
        objects: []
    })
}
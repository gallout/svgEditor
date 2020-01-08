export const SET_END_SIZE = 'SET_END_SIZE';

// The function, handleMouseUpAction, is an 'action creator'
// The return value is an 'action'
// Поиск объекта в списке объектов по Id и установка конечных значений по x и у
export const setObjectEndSizeValues = (objects, objId, e, xEnd, yEnd) => dispatch => {
    const index = objects.findIndex(o => o.id === objId);

    const obj = {
        ...objects[index],
        xEnd,
        yEnd,
        locked: e.shiftKey
      };

    dispatch({
        type: SET_END_SIZE,
        obj: obj,
        index: index
    });
}
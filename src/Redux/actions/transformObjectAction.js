export const TRANSFORM_OBJECT = 'TRANSFORM_OBJECT';

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export const transformObjectAction = (objects, objMoveId, dragStart, e) => dispatch => {

    const index = objects.findIndex(o => o.id === objMoveId);
    const { x: xDragStart, y: yDragStart } = dragStart;
    const { clientX: xDragEnd, clientY: yDragEnd } = e;
    const xDelta = xDragEnd - xDragStart;
    const yDelta = yDragEnd - yDragStart;
    const obj = objects[index];

    dispatch({
        type: TRANSFORM_OBJECT, 

        objMoveId: objMoveId,
        xDragStart: xDragStart,
        xDragEnd: xDragEnd,
        yDragStart: yDragEnd,
        yDragEnd: yDragEnd,
        xDelta: xDelta,
        yDelta: yDelta,
        obj: obj,
        index: index
    });
}
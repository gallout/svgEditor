import { ADD_RECT } from '../actions/addRectangle';
import { ADD_CIRC } from '../actions/addCircle';
import { SET_TOOL } from '../actions/setToolAction';
import { CLEAR_MOVEID } from '../actions/clearMoveIdAction';
import { TRANSFORM_OBJECT } from '../actions/transformObjectAction';
import { SET_END_SIZE } from '../actions/setObjectEndSizeValues';
import { HANDLE_MOUSE_UP } from '../actions/handleMouseUpAction';
import { HANDLE_MOUSE_DOWN_OBJ } from '../actions/handleMouseDownObjAction';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state

export default function svgEditorReducer(state = null, action) {
    switch (action.type) {
        case ADD_RECT:
            return {
                ...state,
                objects: [...state.objects, action.obj],
                rectObject: action.obj.id
            }
        case ADD_CIRC:
            return {
                ...state,
                objects: [...state.objects, action.obj],
                circObject: action.obj.id
            }
        case SET_TOOL:
            return {
                ...state,
                tool: action.tool
            }
        case CLEAR_MOVEID:
            return {
                ...state,
                objMoveId: action.objMoveId
            }
        case TRANSFORM_OBJECT:
            console.log(action.obj);
            return {
                ...state,
                dragStart: {
                    x: action.xDragEnd,
                    y: action.yDragEnd
                },
                objects: [
                ...state.objects.slice(0, action.index),
                {
                    ...action.obj,
                    xStart: action.obj.xStart + action.xDelta,
                    xEnd: action.obj.xEnd + action.xDelta,
                    yStart: action.obj.yStart + action.yDelta,
                    yEnd: action.obj.yEnd + action.yDelta
                },
                ...state.objects.slice(action.index + 1)
                ]
            }
        case SET_END_SIZE:
            return {
                ...state,
                objects: [
                    ...state.objects.slice(0, action.index), //spread syntax, return new array
                    action.obj,
                    ...state.objects.slice(action.index + 1)
                ]
            }
        case HANDLE_MOUSE_UP:
            return {
                ...state,
                objMoveId: action.objMoveId,
                rectObject: action.rectObject,
                circObject: action.circObject
            }
        case HANDLE_MOUSE_DOWN_OBJ:
            console.log(action);
            return {
                ...state,
                objMoveId: action.objMoveId,
                dragStart: {
                    x: action.clientX,
                    y: action.clientY
                }
            }
        default:
            return state;
    }
}
import { SET_CURRENT_INDEX } from '../actions/imagesSet/setCurrentIndex';
import { ADD_SVG_IMAGE } from '../actions/imagesSet/addSvgImage';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state

export default function svgEditorImagesSetReducer(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.currentIndex
            }
        case ADD_SVG_IMAGE:
            return {
                ...state,
                objects: [...state.objects, action.obj],
                svgObject: action.obj.id
            }

        default:
            return state;
    }
}

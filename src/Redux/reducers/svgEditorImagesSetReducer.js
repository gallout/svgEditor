import { SET_CURRENT_INDEX } from '../actions/imagesSet/setCurrentIndex';

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

        default:
            return state;
    }
}

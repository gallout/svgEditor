import { combineReducers } from 'redux';

import tracks from './tracks'
import playlists from './playlists'
import filterTracks from './filterTracks'
import svgEditorReducer from './svgEditorReducer'

export default combineReducers({ 
    tracks,
    playlists,
    filterTracks,
    svgEditor: svgEditorReducer
})
import React, { Component } from 'react'
import "../App.css";
//import {store} from '../Redux/store'
import { connect } from "react-redux";
import { getTracks } from '../Redux/actions/tracks'

class Home extends Component {
    /*componentDidMount() {
        const list = document.querySelectorAll('.list')[0];
        const addTrackButton = document.querySelectorAll('.addTrack')[0];
        const trackInput = document.querySelectorAll('.trackInput')[0];

        if(document.querySelectorAll('.addTrack')[0] != undefined) {
            addTrackButton.addEventListener('click', () => {
                const trackname = trackInput.value;
                store.dispatch({type:"ADD_TRACK", payload: trackname})
            })
            store.subscribe(() => {
                console.log('subscribe', store.getState())
                list.innerHTML = '';
                trackInput.value = '';

                store.getState().forEach(track => {
                    const li = document.createElement('li');
                    li.textContent = track;
                    list.appendChild(li);
                }); 
            });
        }
    }*/
    addTrack() {
        console.log("addTrack", this.trackInput.value);
        this.props.onAddTrack(this.trackInput.value);
        this.trackInput.value = '';
    }
    findTrack() {
        console.log("searchTrack", this.searchInput.value);
        this.props.onFindTrack(this.searchInput.value);
        this.searchInput.value = '';
    }

    render() {
        console.log(this.props.tracks);
        return (
           <div>
            <div>
                <input type="text" ref={(input) => {this.trackInput = input}} />
                <button onClick={this.addTrack.bind(this)}>addTrack</button> 
            </div>
            <div>
                <input type="text" ref={(input) => {this.searchInput = input}} />
                <button onClick={this.findTrack.bind(this)}>findTrack</button> 
            </div>
            <div>
                <button onClick={this.props.onGetTracks}>GetTracks</button> 
            </div>
            <ul> {this.props.tracks.map((track, index) => 
                <li key={index}>{track.name}</li>
            )}
            </ul>
           </div>
        )
    }
}

export default connect(
    state => ({
      tracks: state.tracks.filter(track => track.name.includes(state.filterTracks) )
    }),
    dispatch => ({
        onAddTrack: (name) => {
            const payload = {
                id: Date.now().toString(),
                name
            }
            dispatch({type: 'ADD_TRACK', payload })
        },
        onFindTrack: (name) => {
            dispatch({type: 'FIND_TRACK', payload: name });
        },
        onGetTracks: () => {
            dispatch(getTracks());
        }
    })
)(Home);
  
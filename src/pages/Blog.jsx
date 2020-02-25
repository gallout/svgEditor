import React, { Component } from 'react'
import Editor from "../components/Editor.jsx";
import "../App.css";

class Blog extends Component {
    render() {
        return (
            <div>  <div className="knpk"> КНПК </div> <Editor /> </div>
        )
    }
}

export default Blog
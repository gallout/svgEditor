import React, { Component } from 'react';
import { connect } from "react-redux";
import ImageModalWindow from './ImageModalWindow';
import { setCurrentIndex } from '../Redux/actions/imagesSet/setCurrentIndex'
import classNames from "classnames";
import brush from '../images/brush.svg'
import { addSvgImage } from '../Redux/actions/imagesSet/addSvgImage'

class ImagesSet extends React.Component {
  constructor(props) {
    super(props);
    //this.closeModal = this.closeModal.bind(this);
    //this.findNext = this.findNext.bind(this);
    //this.findPrev = this.findPrev.bind(this);
    this.svgRef = React.createRef();
    this.renderImageContent = this.renderImageContent.bind(this);
  }

  /*componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.currentIndex !== prevProps.currentIndex) {
      this.objectCloneGet();
    }
  }*/

  render() {
    const { imgUrls } = this.props;
    return (
      <div className="gallery-container">
        <h1>🔥 Мнемосхемы</h1>
        <div className="gallery-grid">
          {imgUrls.map(this.renderImageContent)}
        </div>
        {/* <ImageModalWindow 
                  closeModal={this.closeModal} 
                  findPrev={this.findPrev} 
                  findNext={this.findNext} 
                  hasPrev={this.state.currentIndex > 0} 
                  hasNext={this.state.currentIndex + 1 < imgUrls.length} 
                  obj={imgUrls[this.state.currentIndex]} 
             /> */}
      </div>)
  }

  /*objectCloneGet = () => {
    const { svgEditor } = this.props;
    console.log(svgEditor);

    if (this.props.currentIndex != null) {
      var clonableElem = document.getElementById('svgPicture');
      if (clonableElem) {
        let objectReplica = clonableElem.cloneNode(true);
        objectReplica.style.fillOpacity = "0.5";
        objectReplica.id = "dragImage";
        objectReplica.class = "dragImage";
        objectReplica.style.position = "absolute";
        document.getElementById('svgEditPanel').appendChild(objectReplica.firstElementChild.firstElementChild);
      }
    }
  } */

  // Метод для получения относительного расположения объекта на странице
  getCoords({ clientX, clientY }) {
    const { top, left } = this.svgRef.current.getBoundingClientRect(); // Возвращает объект координат элемента
    return { x: clientX - left, y: clientY - top };
  }

  // Метод создания объекта с уникальным ID
  handleMouseDown(e) {
    const { shiftKey } = e;
    const { x: xStart, y: yStart } = this.getCoords(e);

    var clonableElem = document.getElementById('svgPicture');
    let objectReplica;
    if (clonableElem) {
      objectReplica = clonableElem.cloneNode(true);
      objectReplica.style.fillOpacity = "0.5";
      objectReplica.id = "dragImage";
      objectReplica.class = "dragImage";
      objectReplica.style.position = "absolute";
    }
    this.props.onAddSvgImage(xStart, yStart, shiftKey, objectReplica.firstElementChild.firstElementChild.innerHTML);
  }

  renderImageContent(obj, index) {
    const { tool } = this.props.svgEditor;

    console.log(this.svgRef)
    /*var div = document.createElement('div');
    div.style.height = "100px";
    div.style.width = "100px";
    div.dangerouslySetInnerHTML = {__html: obj.svgPath}*/

    //var b64 = 'data:image/svg+xml;base64,' + window.atob(div.dangerouslySetInnerHTML.__html);
    //var url = 'url("' + b64 + '")';

    //var src = `PHN2ZyBjbGFzcz0ic3ZnSW1hZ2UgIiB3aWR0aD0iODAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA4MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRjAwIiBmaWxsLW9wYWNpdHk9IjAuNCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMi4wMSAzOS45NzZjLjAyLTQuNTk0IDEuNzg2LTkuMTgyIDUuMzAyLTEyLjY4Ny40NzUtLjQ3NS45Ny0uOTE3IDEuNDgzLTEuMzI3djkuNzdMNC41NCAzOS45NzdIMi4wMXptNS4zNzQgMEwyMy44NDIgMjMuNTdjLjY4NyA1LjM1LTEuMDMgMTAuOTUtNS4xNTQgMTUuMDYtLjQ4My40ODItLjk4Ny45My0xLjUwOCAxLjM0Nkg3LjM4NHptLTcuMzg0IDBjLjAxOC01LjEwNyAxLjk4Mi0xMC4yMDggNS44OS0xNC4xMDQgNS4yNjMtNS4yNDcgMTIuNzE4LTYuOTc4IDE5LjQyOC01LjE5MiAxLjc4MyA2LjY1OC4wNyAxNC4wNTMtNS4xMzcgMTkuMjk2SDB6bTEwLjgwNi0xNS40MWMzLjUzNy0yLjExNiA3LjY0NC0yLjkyIDExLjYxNC0yLjQxNUwxMC44MDYgMzMuNzN2LTkuMTY0ek02NS4yNS43NUM1OC41NzgtMS4wMzIgNTEuMTY0LjY5NCA0NS45MyA1LjkzYy01LjIzNiA1LjIzNC02Ljk2MiAxMi42NDgtNS4xOCAxOS4zMiA2LjY3MiAxLjc4MiAxNC4wODYuMDU2IDE5LjMyLTUuMTggNS4yMzYtNS4yMzQgNi45NjItMTIuNjQ4IDUuMTgtMTkuMzJ6TTQzLjYzMiAyMy43ODNjNS4zMzguNjgzIDEwLjkyNS0xLjAyNiAxNS4wMjUtNS4xMjYgNC4xLTQuMSA1LjgxLTkuNjg3IDUuMTI2LTE1LjAyNWwtMjAuMTUgMjAuMTV6bTcuMTg2LTE5LjE1NmMzLjUxOC0yLjExMiA3LjYwMi0yLjkxNSAxMS41NS0yLjQxbC0xMS41NSAxMS41NXYtOS4xNHptLTMuNDc1IDIuNzE2Yy00LjEgNC4xLTUuODEgOS42ODctNS4xMjYgMTUuMDI1bDYuNi02LjZWNi4wMmMtLjUxLjQxLTEgLjg1LTEuNDc0IDEuMzIzek0uMDcgMEMuMDY2IDEuNzY2LjI5IDMuNTMzLjc1IDUuMjVjNi42NzIgMS43ODIgMTQuMDg2LjA1NiAxOS4zMi01LjE4bC4wNzItLjA3SC4wNzJ6bTE3LjA4NyAwQzEzLjI1IDMuMTI1IDguMzQ1IDQuMzg2IDMuNjMyIDMuNzgzTDcuNDE0IDBoOS43NDN6TTIuMDcgMGMtLjAwMi43OS4wNDcgMS41ODIuMTQ3IDIuMzY4TDQuNTg3IDBIMi4wN3oiPjwvcGF0aD48L2c+PC9zdmc+`
    return (
      <div className="imgContainer"
        id="svgPicture"
        key={index}
        onMouseDown={(e) => {
          this.setIndex(e, index);
          this.handleMouseDown(e);
        }}

        dangerouslySetInnerHTML={{ __html: window.atob(obj.svgPath) }}
        className={classNames({ active: tool === "SVG" })}

        ref={this.svgRef}
      >    
      </div>
       /*<img src={brush} />  */
  
      /* <img className="imgShow" id={obj.name} src={obj.src} key={index} ></img> */

      //Добавление картинки

      /*<div className="imgShow" id={obj.name} key={index}> 
        <img src={`data:image/svg+xml;base64,${obj.svgPath}`} />
      </div>*/

    )
  }

  setIndex(e, index) {
    //this.setState ({ currentIndex: index });
    this.props.onSetCurrentIndex(index);
    console.log(this.props);
  }
  /*
  closeModal(e) {
      if (e != undefined) {
        e.preventDefault();
      }
      this.setState ({ currentIndex: null });
  }*/

  /*findPrev(e) {
      if (e != undefined) {
        e.preventDefault();
      }
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex -1
      }));
  }

  findNext(e) {
      if (e != undefined) {
        e.preventDefault();
      }
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
  }*/
}

export default connect(

  state => ({
    currentIndex: state.svgEditor.currentIndex,
    svgEditor: state.svgEditor
  }),
  dispatch => ({
    onSetCurrentIndex: (index) => {
      dispatch(setCurrentIndex(index))
    },
    onAddSvgImage: (xStart, yStart, shiftKey, path) => {
      dispatch(addSvgImage(xStart, yStart, shiftKey, path))
    },
  })
)(ImagesSet);
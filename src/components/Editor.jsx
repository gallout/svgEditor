import React from "react";
import classNames from "classnames";
import taplogo from "../images/tap.svg";
import ImagesSet from "../components/ImagesSet"
import { connect } from "react-redux";
import { addRectangle } from '../Redux/actions/svgEditor/addRectangle'
import { addCircle } from '../Redux/actions/svgEditor/addCircle'
import { setToolAction } from '../Redux/actions/svgEditor/setToolAction'
import { clearMoveIdAction } from '../Redux/actions/svgEditor/clearMoveIdAction'
import { transformObjectAction } from '../Redux/actions/svgEditor/transformObjectAction'
import { setObjectEndSizeValues } from '../Redux/actions/svgEditor/setObjectEndSizeValues'
import { handleMouseUpAction } from '../Redux/actions/svgEditor/handleMouseUpAction'
import { handleMouseDownObjAction } from '../Redux/actions/svgEditor/handleMouseDownObjAction'
import { clearObjectsAction } from '../Redux/actions/svgEditor/clearObjectsAction'

/*let defaultTextArea = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 483.334 483.334" style="enable-background:new 0 0 483.334 483.334;" xml:space="preserve">
<g id="XMLID_1367_">
<g id="XMLID_1365_">
 <polygon style="fill:#FFFFFF;" points="322.223,388.043 380.809,373.397 417.425,344.104 446.718,285.518 432.071,256.225 
   270.96,256.225 270.96,73.144 263.637,65.821 227.02,80.467 190.404,124.407 190.404,292.841 234.344,358.75 		"/>
</g>
<g id="XMLID_1366_">
 <path style="fill:#EDEDED;" d="M270.961,258.347c-21.176,6.302-36.618,25.918-36.618,49.14c0,28.312,22.951,51.263,51.263,51.263
   h124.495l-58.586-58.586H248.99"/>
</g>
<g id="XMLID_1311_">
 <polygon style="fill:#F39200;" points="190.404,146.376 14.647,146.376 0,124.407 190.404,124.407 		"/>
</g>
<g id="XMLID_1279_">
 <path style="fill:#575756;" d="M483.334,344.104H284.859c-19.81,0-35.869-16.059-35.869-35.869v-22.717h197.727L483.334,344.104z"
   />
</g>
<g id="XMLID_1181_">
 <path style="fill:#F9B233;" d="M189.027,358.75h-18.964c-85.834,0-155.416-69.582-155.416-155.416v-56.957h175.758v210.996
   C190.404,358.134,189.788,358.75,189.027,358.75z"/>
</g>
<g id="XMLID_1315_">
 <polygon style="fill:#F39200;" points="14.647,148.105 43.94,146.376 43.94,292.841 14.647,237.522 		"/>
</g>
<g id="XMLID_857_">
 <rect x="388.132" y="307.311" style="fill:#1D1D1B;" width="80.556" height="15"/>
</g>
<g id="XMLID_858_">
 <rect x="373.485" y="278.018" style="fill:#1D1D1B;" width="80.556" height="15"/>
</g>
<g id="XMLID_768_">
 <rect x="219.697" y="109.583" style="fill:#1D1D1B;" width="14.646" height="15"/>
</g>
<path style="fill:#1D1D1B;" d="M292.794,336.332c-20.018,0-36.304-16.286-36.304-36.304c0-20.018,16.286-36.304,36.304-36.304
 h146.601v-15H292.794c-4.975,0-9.782,0.726-14.334,2.053V73.321h21.793v-15h-11.188l9.168-9.168l-10.607-10.605l-9.167,9.167
 V36.528h-15v22.116c-34.941,2.961-64.124,26.416-75.471,58.262H0v15h184.103c-0.412,2.479-0.727,4.99-0.926,7.534H7.147v65.522
 c0,88.934,72.354,161.287,161.288,161.287c16.249,0,29.47-13.22,29.47-29.47v-17.716c23.009,45.336,70.093,76.478,124.318,76.478
 c38.57,0,75.492-16.08,101.795-44.211h59.316v-15h-190.54V336.332z M182.904,336.78c0,7.979-6.491,14.47-14.47,14.47
 c-80.664,0-146.288-65.624-146.288-146.287V154.44h160.758V336.78z M322.223,380.543c-68.549,0-124.318-55.769-124.318-124.318
 v-14.646V153.7v-7.323c0-37.75,28.784-68.904,65.556-72.673v184.272c-13.268,9.283-21.97,24.667-21.97,42.053
 c0,28.289,23.015,51.304,51.304,51.304h109.463C379.984,370.055,351.641,380.543,322.223,380.543z"/>
<g id="XMLID_771_">
 <polygon style="fill:#1D1D1B;" points="51.439,197.639 36.439,197.639 36.439,168.169 73.232,168.169 73.232,183.169 
   51.439,183.169 		"/>
</g>
<polygon style="fill:#1D1D1B;" points="322.399,431.806 322.399,402.689 307.399,402.689 307.399,431.806 285.606,431.806 
 285.606,446.806 337.962,446.806 337.962,431.806 	"/>
</g>
</svg>`; */

class Editor extends React.Component {
  svgRef = React.createRef(); // ссылка на svg-элемент

  // Вызывается после монтирования объекта в DOM-дерево
  componentDidMount() {
    try {
      this.setState(Object.assign(this.props.svgEditor, JSON.parse(localStorage.getItem("canvas")))); // Получение элементов из localStorage
    } catch (err) {
      console.warn("Failed to restore state", err);
    }
  }

  // Вызывается после обновления объекта в DOM-дерево
  componentDidUpdate() {
    localStorage.setItem("canvas", JSON.stringify(this.props.svgEditor)); // Обновление localStorage
  }

  // Метод для получения относительного расположения объекта на странице
  getCoords({ clientX, clientY }) {
    const { top, left } = this.svgRef.current.getBoundingClientRect(); // Возвращает объект координат элемента
    return { x: clientX - left, y: clientY - top };
  }

  // Метод для записи инструмента, выбранного пользователем
  handleSelectTool(tool) {
    this.props.onSelectTool(tool);
  }
  
  // Метод запоминающий состояние объекта при перемещении
  handleMouseDownObj(obj, e) {
    const { tool } = this.props.svgEditor;
    if (tool === "drag") {
      this.props.onHandleMouseDownObj(obj, e);
    }
  }

  // Метод возврата состояния объекта после перемещения
  handleMouseUpObj(obj, e) {
    this.props.onClearMoveId()
  }

  // Метод создания объекта с уникальным ID
  handleMouseDown(e) {
    const { shiftKey } = e;
    const { x: xStart, y: yStart } = this.getCoords(e);

    const {tool} = this.props.svgEditor

    if (tool === "rect") {
        this.props.onAddRectangle(xStart, yStart, shiftKey);
    }

    if (tool === "circ") {
      this.props.onAddCircle(xStart, yStart, shiftKey);
    }
  }

  // Метод для обнуления свойств у state после отпускания кнопки мыши
  handleMouseUp(e) {
    this.props.onHandleMouseUpAction()
  }

  // Метод, срабатываемый при движении мышки
  handleMouseMove(e) {
    const { rectObject, circObject, objMoveId, dragStart } = this.props.svgEditor;
    if (rectObject) {
      this.findObjByIdAndSet_xEnd_And_yEnd(rectObject, e);
    }
  
    if (circObject) {
      this.findObjByIdAndSet_xEnd_And_yEnd(circObject, e);
    }
  
    if (objMoveId && dragStart) {
      this.findObjAndTransformOnPage(objMoveId, dragStart, e);
    }
  }
  
  // Метод поиска объекта в списке объектов по Id и установка конечных значений по x и у
  findObjByIdAndSet_xEnd_And_yEnd(objId, e) {
    const { objects } = this.props.svgEditor
    const { x: xEnd, y: yEnd } = this.getCoords(e);
    this.props.onSetObjectEndSizeValues(objects, objId, e, xEnd, yEnd);
  }

  // Метод перемещения объекта
  findObjAndTransformOnPage(objMoveId, dragStart, e) {
    const { objects } = this.props.svgEditor
    this.props.onTransformObject(objects, objMoveId, dragStart, e);
  }

  // Метод подсчета высоты и ширины рисуемого объекта. Необходим в том случае когда рисуем объект справа налево
  countWidthAndHeight(obj) {
    let x, y, w, h;

    if (obj.xStart < obj.xEnd) {
      x = obj.xStart;
      w = obj.xEnd - obj.xStart;
    } else {
      x = obj.xEnd;
      w = obj.xStart - obj.xEnd;
    }

    if (obj.yStart < obj.yEnd) {
      y = obj.yStart;
      h = obj.yEnd - obj.yStart;
    } else {
      y = obj.yEnd;
      h = obj.yStart - obj.yEnd;
    }
    return [x, y, w, h]
  }

  // Метод для рисования эллипса
  renderCirc(obj) {
    let [x,y,w,h] = this.countWidthAndHeight(obj);

    const r = Math.min(h / 2, w / 2);
    const rx = obj.locked ? r : w / 2;
    const ry = obj.locked ? r : h / 2;

    return (
      <ellipse
        key={obj.id}
        cx={x + rx}
        cy={y + ry}
        rx={rx}
        ry={ry}
        fill={obj.bg}
        stroke={obj.stroke}
        strokeWidth={obj.strokeWidth}
        onMouseDown={this.handleMouseDownObj.bind(this, obj)}
        onMouseUp={this.handleMouseUpObj.bind(this, obj)}
      />
    );
  }

  // Метод для рисования прямоугольника
  renderRect(obj) {
    let [x,y,w,h] = this.countWidthAndHeight(obj);

    const size = Math.min(w, h);

    return (
      <rect
        key={obj.id}
        x={x}
        y={y}
        width={obj.locked ? size : w}
        height={obj.locked ? size : h}
        fill={obj.bg}
        stroke={obj.stroke}
        strokeWidth={obj.strokeWidth}
        onMouseDown={this.handleMouseDownObj.bind(this, obj)}
        onMouseUp={this.handleMouseUpObj.bind(this, obj)}
      />
    );
  }

  // Метод для изменения размеров выбранного объекта
  resizeSvgElem() {
  }

  // Метод для очистки рабочей Svg-области и для очистки LocalStorage от всех объектов
  eraseElems() {
    //this.props.onClearObjects(this.props.svgEditor.objects);
    let svgBlock = this.svgRef.current;
    svgBlock.innerHTML = "";
    localStorage.removeItem("canvas");
  }

  render() {
    const { objects, tool, imgUrls } = this.props.svgEditor;
    return (
      <div className="flexBlock">
      <div className="canvas">
        <div className="toolbar">
          {[
            ["drag", "Переместить"],
            ["rect", "Прямоугольник"],
            ["circ", "Круг"],
          ].map(t => (
            <button
              key={t[0]}
              onClick={this.handleSelectTool.bind(this, t[0])}
              className={classNames({ active: tool === t[0] })}
            >
              {t[1]} 
            </button>
          ))}
        <button
          onClick={() => {
            this.eraseElems(); 
          }} > Очистить
        </button> 
        <button
          onClick={() => {
            this.resizeSvgElem();
          }} > Изменить размер
        </button> 
        </div>

        <svg
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
          className={`tool--${tool}`}
          id="svgEditPanel"
          ref={this.svgRef}
        >
          {objects.map(o => {
            if (o.type === "rect") {
              return this.renderRect(o);
            }

            if (o.type === "circ") {
              return this.renderCirc(o);
            }

            return null;
          })}
        </svg>
      </div>
      <div className="marginBlock">
        <ImagesSet  imgUrls={imgUrls} /> 
      </div>
      </div>
    );
  }
}

export default connect(

  state => ({
    svgEditor: state.svgEditor
  }),
  dispatch => ({
      onAddRectangle: (xStart, yStart, shiftKey) => {
        dispatch(addRectangle(xStart, yStart, shiftKey))
      },

      onAddCircle: (xStart, yStart, shiftKey) => {
        dispatch(addCircle(xStart, yStart, shiftKey))
      },

      onSelectTool: (tool) => {
        dispatch(setToolAction(tool))
      },

      onClearMoveId: () => {
        dispatch(clearMoveIdAction())
      },

      onClearObjects: (objects) => {
        dispatch(clearObjectsAction(objects))
      },

      onTransformObject: (objects, objMoveId, dragStart, e) => {
        dispatch(transformObjectAction(objects, objMoveId, dragStart, e))
      },

      onSetObjectEndSizeValues: (objects, objId, e, xEnd, yEnd) => {
        dispatch(setObjectEndSizeValues(objects, objId, e, xEnd, yEnd))
      },

      onHandleMouseUpAction: () => {
        dispatch(handleMouseUpAction())
      },

      onHandleMouseDownObj: (obj, e) => {
        dispatch(handleMouseDownObjAction(obj, e))
      }

  })
)(Editor);
import React from "react";
import classNames from "classnames";

class Editor extends React.Component {
  svgRef = React.createRef(); // ссылка на svg-элемент

  state = {
    tool: null, // инструмент, выбранный пользователем
    objMoveId: null, // ID объекта, который необходимо передвинуть
    rectObject: null, // ID квадрата
    circObject: null, // ID эллипса
    dragStart: null, // объект с координатами по х и у, с которых необходимо начать перемещение объекта
    objects: [] //список svg-объектов
  };

  // Вызывается после монтирования объекта в DOM-дерево
  componentDidMount() {
    try {
      this.setState(JSON.parse(localStorage.getItem("canvas"))); // Получение элементов из localStorage
    } catch (err) {
      console.warn("Failed to restore state", err);
    }
  }

  // Вызывается после обновления объекта в DOM-дерево
  componentDidUpdate() {
    localStorage.setItem("canvas", JSON.stringify(this.state)); // Обновление localStorage
  }

  // Метод для получения относительного расположения объекта на странице
  getCoords({ clientX, clientY }) {
    const { top, left } = this.svgRef.current.getBoundingClientRect(); // Возвращает объект координат элемента
    return { x: clientX - left, y: clientY - top };
  }

  // Метод для записи инструмента, выбранного пользователем
  handleSelectTool(tool) {
    this.setState({ tool });
  }
  
  // Метод запоминающий состояние объекта при перемещении
  handleMouseDownObj(obj, e) {
    const { tool } = this.state;
    if (tool === "drag") {
      this.setState({
        objMoveId: obj.id,
        dragStart: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }

  // Метод возврата состояния объекта после перемещения
  handleMouseUpObj(obj, e) {
    this.setState({ objMoveId: null });
  }

  // Метод создания объекта с уникальным ID
  handleMouseDown(e) {
    const { shiftKey } = e;
    const { x: xStart, y: yStart } = this.getCoords(e);

    if (this.state.tool === "rect") {
      this.setState(s => {
        const obj = {
          id: Date.now(), // id объекта
          type: "rect", // тип объекта
          bg:
            "rgb(" + [255,255,255] + ")", // цвет объекта
          stroke: "black", // цвет рамки
          strokeWidth: "0.5", // ширина рамки
          xStart, 
          yStart, 
          xEnd: xStart, // изначально равно xStart, затем изменяется после ресайза
          yEnd: yStart, // изначально равно yStart, затем изменяется после ресайза
          locked: shiftKey // необходим для увеличения объекта, если зажат Shift
        };
        return {
          objects: [...s.objects, obj],
          rectObject: obj.id
        };
      });
    }

    if (this.state.tool === "circ") {
      this.setState(s => {
        const obj = {
          id: Date.now(), // id объекта
          type: "circ", // тип объекта
          bg:
            "rgb(" + [255,255,255] + ")", // цвет объекта
          stroke: "black", // цвет рамки
          strokeWidth: "0.5", // ширина рамки
          xStart, 
          yStart, 
          xEnd: xStart, // изначально равно xStart, затем изменяется после ресайза
          yEnd: yStart, // изначально равно yStart, затем изменяется после ресайза
          locked: shiftKey // необходим для увеличения объекта, если зажат Shift
        };
        return {
          objects: [...s.objects, obj],
          circObject: obj.id
        };
      });
    }
  }

  // Метод для обнуления свойств у state после отпускания кнопки мыши
  handleMouseUp(e) {
    this.setState({
      objMoveId: null,
      rectObject: null,
      circObject: null
    });
  }

  // Метод, срабатываемый при движении мышки
  handleMouseMove(e) {
    const { rectObject, circObject, objMoveId, dragStart } = this.state;
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
      const index = this.state.objects.findIndex(o => o.id === objId);
      const { x: xEnd, y: yEnd } = this.getCoords(e);
      const obj = {
        ...this.state.objects[index],
        xEnd,
        yEnd,
        locked: e.shiftKey
      };

      this.setState({
        objects: [
          ...this.state.objects.slice(0, index),
          obj,
          ...this.state.objects.slice(index + 1)
        ]
      });
  }

  // Метод перемещения объекта
  findObjAndTransformOnPage(objMoveId, dragStart, e) {
    const index = this.state.objects.findIndex(o => o.id === objMoveId);
    const { x: xDragStart, y: yDragStart } = dragStart;
    const { clientX: xDragEnd, clientY: yDragEnd } = e;
    const xDelta = xDragEnd - xDragStart;
    const yDelta = yDragEnd - yDragStart;
    const obj = this.state.objects[index];
    this.setState({
      dragStart: {
        x: xDragEnd,
        y: yDragEnd
      },
      objects: [
        ...this.state.objects.slice(0, index),
        {
          ...obj,
          xStart: obj.xStart + xDelta,
          xEnd: obj.xEnd + xDelta,
          yStart: obj.yStart + yDelta,
          yEnd: obj.yEnd + yDelta
        },
        ...this.state.objects.slice(index + 1)
      ]
    });
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
    let svgBlock = this.svgRef.current;
    svgBlock.innerHTML = "";
    localStorage.removeItem("canvas");
  }

  render() {
    const { objects, tool } = this.state;
    return (
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
    );
  }
}

export default Editor;
